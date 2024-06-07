import "server-only";

import { and, desc, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs/server";

import { db } from "./db";
import { images } from "./db/schema";

// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

// const { getUser } = getKindeServerSession();

export async function getMyImages() {
  // const user = await getUser();
  const user = auth();

  // my email for gmail and github are the same, so the user id are the same.
  // should test with different accounts

  if (!user.userId) {
    throw new Error("Unauthorized");
  }

  const imagesData = await db
    .select()
    .from(images)
    .where(eq(images.userId, user.userId))
    .orderBy(desc(images.id));

  return imagesData;
}

export async function getImage(id: number) {
  const user = auth();

  if (!user.userId) {
    throw new Error("Unauthorized");
  }

  // When using select, even though with limit 1 and early returning when an empty array is being returned, typescript still
  // complains the first element of the return array might be undefined, so image.userId is unsafe. Not sure why
  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });

  if (!image) {
    throw new Error("Image not found");
  }

  if (image.userId !== user.userId) {
    throw new Error("Unauthorized");
  }

  return image;
}

export async function deleteImage(id: number) {
  const user = auth();

  if (!user.userId) {
    throw new Error("Unauthorized");
  }

  await db
    .delete(images)
    .where(and(eq(images.userId, user.userId), eq(images.id, id)));

  // url changes, not needed
  // revalidatePath("/");
  redirect("/");
}
