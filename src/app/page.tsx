import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getMyImages } from "~/server/queries";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await getMyImages();

  return (
    <div className="flex flex-wrap gap-4">
      {images.map(({ id, url, name }) => (
        <div key={id} className="flex w-48 flex-col">
          <img src={url} alt="" className="aspect-video w-full object-cover" />
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
