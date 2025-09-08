/* eslint-disable @next/next/no-img-element */
import { notFound } from "next/navigation";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function DogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  // Fetch dog by slug using Prisma
  const dog = await prisma.dogInfo.findUnique({
    where: { slug: params.slug },
  });

  if (!dog) return notFound();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{dog.breed}</h1>
      <p className="text-gray-600">{dog.description}</p>
      <p>Location: {dog.location}</p>
      <p>Gender: {dog.gender}</p>
      <p>Age: {dog.age}</p>
      <p>Owner: {dog.ownerName}</p>
      <p>Phone: {dog.phoneNumber}</p>

      {dog.images && dog.images.length > 0 && (
        <div className="flex gap-2 mt-4 flex-wrap">
          {dog.images.map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt={dog.breed}
              className="w-40 h-40 object-cover rounded"
            />
          ))}
        </div>
      )}
    </div>
  );
}
