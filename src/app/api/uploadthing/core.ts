import { auth, clerkClient } from "@clerk/nextjs/server";
import { waitUntil } from "@vercel/functions";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { db } from "~/server/db";
import { images } from "~/server/db/schema";
import { ratelimit } from "~/server/ratelimit";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 10 } })
    // Set permissions and file types for this FileRoute
    .middleware(async () => {
      // This code runs on your server before upload
      const user = await auth();

      // If you throw, the user will not be able to upload
      if (!user.userId) throw new UploadThingError("Unauthorized");

      const { userId } = user;

      const cClient = await clerkClient();

      const fullUserData = await cClient.users.getUser(userId);

      // can-upload can be set on clerk's user menu, private section
      if (fullUserData.privateMetadata?.["can-upload"] !== true) {
        throw new UploadThingError("User does not have upload permissions");
      }

      const { success, pending } = await ratelimit.limit(userId);

      waitUntil(pending);

      if (!success) {
        throw new UploadThingError("Ratelimited");
      }

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      // Even though file.url is deprecated and should use ufsUrl, but inserting ufsUrl into the
      // db would change the imageUrl's hostname from utfs.io to {hash}.ufs.sh
      // without that image remote in next.config.js, the app would crash while loading the
      // main page.

      // Add the new hostName to nextjs.config.js is a way solving it (compatable).
      // Another would be changing the code to ufsUrl, and modify entries in the db since
      // I'm the only user of the app, or just delete all of them since none of them are
      // actually important.

      // TODO: Change url to ufsUrl and choose one of the options above if nextjs version has
      // to be bumped up in the future and uploadthing has to match the upgrade as well.
      //
      // For now, I'll keep these unchanged
      console.log("file url", file.url);

      const { name, url } = file;

      await db.insert(images).values({
        name,
        url,
        // metadata has userId because it was returned in the middleware
        userId: metadata.userId,
      });

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
