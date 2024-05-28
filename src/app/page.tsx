import { db } from "~/server/db";
import { posts } from "~/server/db/schema";

export const dynamic = "force-dynamic";

const mockImageURLs = [
  "https://utfs.io/f/bbf968e5-3d64-4dfd-9dac-c7b04272a457-1ez072.png",
  "https://utfs.io/f/85249d85-2c22-4545-8582-78ddba88b3a5-170x77.png",
  "https://utfs.io/f/5170bbd3-d07e-4a12-bbbc-b22f591fb6dd-184ijo.png",
];

const mockImages = mockImageURLs.map((url, index) => ({
  id: index + 1,
  url,
}));

export default async function HomePage() {
  const postsData = await db.select().from(posts);

  console.log(postsData);
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {[...mockImages, ...mockImages, ...mockImages].map(({ id, url }) => (
          <div key={id} className="w-48">
            <img src={url} alt="" />
          </div>
        ))}
      </div>
    </main>
  );
}
