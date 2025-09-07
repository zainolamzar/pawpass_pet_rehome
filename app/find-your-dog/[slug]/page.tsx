/* eslint-disable @next/next/no-img-element */
import DogInfo from "@/lib/models/DogInfo";
import { notFound } from "next/navigation";
import { Key } from "react";

export default async function DogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  // Directly fetch from MongoDB
  const dog = await DogInfo.findById(params.slug);

  if (!dog) return notFound();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{dog.breed}</h1>
      <p className="text-gray-600">{dog.description}</p>
      <p>Location: {dog.location}</p>
      <p>Gender: {dog.gender}</p>
      <p>Age: {dog.age}</p>
      <p>Owner: {dog.owner_name}</p>
      <p>Phone: {dog.phone_number}</p>
      <div className="flex gap-2 mt-4 flex-wrap">
        {dog.images.map((url: string | Blob | undefined, idx: Key | null | undefined) => (
          <img
            key={idx}
            src={url}
            alt={dog.breed}
            className="w-40 h-40 object-cover rounded"
          />
        ))}
      </div>
    </div>
  );
}
