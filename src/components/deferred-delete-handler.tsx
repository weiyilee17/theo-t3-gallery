"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { takePendingImageDelete } from "~/lib/pending-image-delete";
import { deleteImageAction } from "~/server/actions";

export function DeferredDeleteHandler() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname !== "/") return;

    const id = takePendingImageDelete();
    if (id === null) return;

    void deleteImageAction(id).then(() => {
      router.refresh();
    });
  }, [pathname, router]);

  return null;
}
