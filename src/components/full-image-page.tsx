import { getImage } from "~/server/queries";

export default async function FullPageImageView({ id }: { id: number }) {
  const image = await getImage(id);

  return (
    <div className="flex h-full w-full min-w-0 ">
      {/* Not using Image from next because it creates fake elements to prevent layout shift, while the image is uploaded by
      the user, so we don't know these information */}
      <div className="flex flex-shrink items-center justify-center">
        <img src={image.url} alt={image.name} className="object-contain" />
      </div>

      <div className="flex w-48 flex-shrink-0 flex-col border-l">
        <div className="text-xl font-bold">{image.name}</div>
      </div>
    </div>
  );
}
