/* eslint-disable @next/next/no-img-element */
import { notFound } from "next/navigation";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function CatDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  // Fetch cat by slug using Prisma
  const cat = await prisma.catInfo.findUnique({
    where: { slug: params.slug },
  });

  if (!cat) return notFound();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{cat.breed}</h1>
      <p className="text-gray-600">{cat.description}</p>
      <p>Location: {cat.location}</p>
      <p>Gender: {cat.gender}</p>
      <p>Age: {cat.age}</p>
      <p>Owner: {cat.ownerName}</p>
      <p>Phone: {cat.phoneNumber}</p>

      {cat.images && cat.images.length > 0 && (
        <div className="flex gap-2 mt-4 flex-wrap">
          {cat.images.map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt={cat.breed}
              className="w-40 h-40 object-cover rounded"
            />
          ))}
        </div>
      )}
    </div>
  );
}
