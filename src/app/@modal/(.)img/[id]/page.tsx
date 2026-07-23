import FullPageImageView from "~/components/full-image-page";
import { Modal } from "./modal";

export default async function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: photoId } = await params;
  const idAsNumber = Number(photoId);

  if (Number.isNaN(idAsNumber)) {
    throw new Error("Invalid photo id");
  }

  return (
    <Modal>
      <FullPageImageView id={idAsNumber} dismiss="back" />
    </Modal>
  );
}
