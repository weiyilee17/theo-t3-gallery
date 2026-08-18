import { DeleteImageButton } from "~/components/delete-image-button";
import { getImage } from "~/server/queries";

// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import { CloseModalButton } from "./close-modal-button";

// const { getUser } = getKindeServerSession();

export default async function FullPageImageView({
  id,
  dismiss,
}: {
  id: number;
  dismiss: "back" | "replace";
}) {
  const image = await getImage(id);

  // The purpose of using this is when this is public, non-logged in viewers can still see the uploader's name
  // however, kinde doesn't support such an api

  const cClient = await clerkClient();

  const uploaderInfo = await cClient.users.getUser(image.userId);

  return (
    <div className="flex h-full w-full min-w-0 ">
      {/* Not using Image from next because it creates fake elements to prevent layout shift, while the image is uploaded by
      the user, so we don't know these information */}
      <div className="flex flex-shrink items-center justify-center">
        <img src={image.url} alt={image.name} className="object-contain" />
      </div>

      <div className="flex flex-shrink-0 flex-grow flex-col border-l">
        <div className="flex justify-between">
          <div className="border-b p-2 text-center text-lg">{image.name}</div>
          <CloseModalButton isModalOpen={dismiss === "back"} />
        </div>

        <div className="flex flex-col p-2">
          <span>Uploaded by:</span>
          <span>{uploaderInfo.fullName}</span>
        </div>

        <div className="flex flex-col p-2">
          <span>Created On:</span>
          <span>{new Date(image.createdAt).toLocaleDateString()}</span>
        </div>

        <div className="p-2">
          <DeleteImageButton id={id} dismiss={dismiss} />
        </div>
      </div>
    </div>
  );
}
