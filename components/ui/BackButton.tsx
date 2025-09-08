"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="self-start mb-4 px-4 py-2 rounded-full shadow-md font-bold text-white hover:opacity-90 transition bg-[#D1A980]"
    >
      ⬅ Back
    </button>
  );
}
