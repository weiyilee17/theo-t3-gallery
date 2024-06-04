import "server-only";

import { desc, eq } from "drizzle-orm";

import { db } from "./db";
import { images } from "./db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const { getUser } = getKindeServerSession();

export async function getMyImages() {
  const user = await getUser();

  // my email for gmail and github are the same, so the user id are the same.
  // should test with different accounts

  if (!user?.id) {
    throw new Error("Unauthorized");
  }

  const imagesData = await db
    .select()
    .from(images)
    .where(eq(images.userId, user.id))
    .orderBy(desc(images.id));

  return imagesData;
}

export async function getImage(id: number) {
  const user = await getUser();

  if (!user?.id) {
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

  if (image.userId !== user.id) {
    throw new Error("Unauthorized");
  }

  return image;
}
