/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Cat {
  _id: string;
  breed: string;
  location: string;
  gender: string;
  description: string;
  age: string;
  phone_number: string;
  owner_name: string;
  animal: string;
  isActive: boolean;
  images: string[];
}

export default function CatsPage() {
  const [cats, setCats] = useState<Cat[]>([]);

  useEffect(() => {
    const fetchCats = async () => {
      const res = await fetch("/api/cats");
      const data = await res.json();
      if (data.success) setCats(data.data);
    };
    fetchCats();
  }, []);

  return (
    <div className="p-6 grid gap-6">
      {cats.map((cat) => (
        <Link key={cat._id} href={`/cats/${cat._id}`}>
          <div className="border p-4 rounded cursor-pointer hover:shadow-md transition">
            <h2 className="text-lg font-bold">{cat.breed}</h2>
            <p>Location: {cat.location}</p>
            <p>Gender: {cat.gender}</p>
            <p>Age: {cat.age}</p>
            <p>Owner: {cat.owner_name}</p>
            <p>Phone: {cat.phone_number}</p>
            <p>{cat.description}</p>
            <div className="flex gap-2 mt-2">
              {cat.images.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={cat.breed}
                  className="w-24 h-24 object-cover rounded"
                />
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}