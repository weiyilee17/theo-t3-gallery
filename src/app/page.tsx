import { desc } from "drizzle-orm";
import { db } from "~/server/db";
import { images } from "~/server/db/schema";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const imagesData = await db.select().from(images).orderBy(desc(images.id));

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {imagesData.map(({ id, url, name }, index) => (
          <div key={`${id}-${index}`} className="flex w-48 flex-col">
            <img
              src={url}
              alt=""
              className="aspect-video w-full object-cover"
            />
            <div>{name}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
