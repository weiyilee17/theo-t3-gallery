"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export function CloseModalButton({ isModalOpen }: { isModalOpen: boolean }) {
  const router = useRouter();

  function handleClose() {
    router.back();
  }

  return isModalOpen ? (
    <Button variant="outline" size="icon" onClick={handleClose}>
      <X />
    </Button>
  ) : null;
}
