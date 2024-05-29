import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import { getMyImages } from "~/server/queries";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await getMyImages();

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {images.map(({ id, url, name }) => (
        <div key={id} className="flex w-48 flex-col">
          <Image
            src={url}
            alt={name}
            width={480}
            height={480}
            className="aspect-video object-contain"
          />
          <div>{name}</div>
        </div>
      ))}
    </div>
  );
}

export default async function HomePage() {
  const { isAuthenticated } = getKindeServerSession();

  return (
    <main className="">
      {(await isAuthenticated()) ? (
        <Images />
      ) : (
        <div className="size-full text-center text-2xl">
          Please sign in above
        </div>
      )}
    </main>
  );
}
