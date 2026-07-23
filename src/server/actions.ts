"use server";

import { deleteImage } from "./queries";

export async function deleteImageAction(id: number) {
  await deleteImage(id);
}
