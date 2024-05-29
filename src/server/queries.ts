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
