/* eslint-disable @next/next/no-img-element */
import CatInfo from "@/lib/models/CatInfo";
import { notFound } from "next/navigation";
import { Key } from "react";

export default async function CatDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  // Directly fetch from MongoDB
  const cat = await CatInfo.findById(params.slug);

  if (!cat) return notFound();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{cat.breed}</h1>
      <p className="text-gray-600">{cat.description}</p>
      <p>Location: {cat.location}</p>
      <p>Gender: {cat.gender}</p>
      <p>Age: {cat.age}</p>
      <p>Owner: {cat.owner_name}</p>
      <p>Phone: {cat.phone_number}</p>
      <div className="flex gap-2 mt-4 flex-wrap">
        {cat.images.map((url: string | Blob | undefined, idx: Key | null | undefined) => (
          <img
            key={idx}
            src={url}
            alt={cat.breed}
            className="w-40 h-40 object-cover rounded"
          />
        ))}
      </div>
    </div>
  );
}
