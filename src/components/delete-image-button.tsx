"use client";

import { useRouter } from "next/navigation";

import { queueImageDelete } from "~/lib/pending-image-delete";

import { Button } from "./ui/button";

export function DeleteImageButton({
  id,
  dismiss,
}: {
  id: number;
  dismiss: "back" | "replace";
}) {
  const router = useRouter();

  function handleDelete() {
    queueImageDelete(id);

    if (dismiss === "back") {
      router.back();
    } else {
      router.replace("/");
    }
  }

  return (
    <Button type="button" variant="destructive" onClick={handleDelete}>
      Delete
    </Button>
  );
}
