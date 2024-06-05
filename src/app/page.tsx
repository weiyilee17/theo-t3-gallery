import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { getMyImages } from "~/server/queries";

// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await getMyImages();

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {images.map(({ id, url, name }) => (
        <div key={id} className="flex size-48 flex-col">
          <Link href={`/img/${id}`} passHref>
            <Image
              src={url}
              alt={name}
              width={192}
              height={192}
              className="aspect-video object-contain"
            />
          </Link>
          <div>{name}</div>
        </div>
      ))}
    </div>
  );
}

export default async function HomePage() {
  // const { isAuthenticated } = getKindeServerSession();

  return (
    <main className="">
      <SignedOut>
        <div className="size-full text-center text-2xl">
          Please sign in above
        </div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
      {/* {(await isAuthenticated()) ? (
        <Images />
      ) : (
        <div className="size-full text-center text-2xl">
          Please sign in above
        </div>
      )} */}
    </main>
  );
}
