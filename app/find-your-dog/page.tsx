/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";

interface Dog {
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
  const [dogs, setDogs] = useState<Dog[]>([]);

  useEffect(() => {
    const fetchDogs = async () => {
      const res = await fetch("/api/dogs");
      const data = await res.json();
      if (data.success) setDogs(data.data);
    };
    fetchDogs();
  }, []);

  return (
    <div className="p-6 grid gap-6">
      {dogs.map((dog) => (
        <div key={dog._id} className="border p-4 rounded">
          <h2 className="text-lg font-bold">{dog.breed}</h2>
          <p>Lodogion: {dog.location}</p>
          <p>Gender: {dog.gender}</p>
          <p>Age: {dog.age}</p>
          <p>Owner: {dog.owner_name}</p>
          <p>Phone: {dog.phone_number}</p>
          <p>{dog.description}</p>
          <div className="flex gap-2 mt-2">
            {dog.images.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={dog.breed}
                className="w-24 h-24 object-cover rounded"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
