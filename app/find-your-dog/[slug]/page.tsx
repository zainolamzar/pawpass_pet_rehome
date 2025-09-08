/* eslint-disable @next/next/no-async-client-component */
/* eslint-disable @next/next/no-img-element */
"use client";

import { notFound } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import BackButton from "@/components/ui/BackButton";
import DogActions from "@/components/ui/DogDetailAction";

const prisma = new PrismaClient();

export default async function DogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const dog = await prisma.dogInfo.findUnique({
    where: { slug: params.slug },
  });

  if (!dog) return notFound();

  return (
    <div className="min-h-screen p-4 sm:p-6 flex flex-col items-center bg-[#E5E0D8]">
      {/* Back Button */}
      <BackButton />

      {/* Main Card */}
      <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-3xl w-full flex flex-col md:flex-row gap-6 border-4 border-[#D1A980]">
        {/* Left Section: Images */}
        <div className="flex flex-col gap-3 flex-1">
          {dog.images && dog.images.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {dog.images.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={dog.breed}
                  className="w-full h-48 sm:h-56 object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform"
                />
              ))}
            </div>
          ) : (
            <div className="w-full h-48 sm:h-56 bg-[#E5E0D8] flex items-center justify-center rounded-2xl text-[#748873] font-semibold">
              No Images Available
            </div>
          )}
        </div>

        {/* Right Section: Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex flex-col gap-3">
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#748873] text-center md:text-left">
              {dog.breed} 🐶
            </h1>

            {/* Info Tags */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <span className="px-3 py-1 rounded-full bg-[#D1A980] text-white font-semibold text-sm">
                {dog.gender === "male" ? "♂ Male" : "♀ Female"}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#748873] text-white font-semibold text-sm">
                {dog.age} years old
              </span>
              <span className="px-3 py-1 rounded-full bg-[#D1A980] text-white font-semibold text-sm">
                {dog.location}
              </span>
            </div>

            {/* Description */}
            <p className="mt-4 text-[#748873] text-center md:text-left text-sm sm:text-base line-clamp-6">
              {dog.description}
            </p>

            {/* Owner Info */}
            <div className="mt-4 flex flex-col gap-1 bg-[#E5E0D8] p-3 rounded-xl border-2 border-[#D1A980] shadow-inner">
              <p className="text-[#748873] font-semibold">👤 {dog.ownerName}</p>
              <p className="text-[#748873] font-semibold">📞 {dog.phoneNumber}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4">
            <DogActions
              breed={dog.breed}
              slug={dog.slug}
              phoneNumber={dog.phoneNumber.replace(/\D/g, "")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
