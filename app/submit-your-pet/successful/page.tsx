"use client";

import React from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Lazy-load QR component (no SSR)
const StyledQR = dynamic(() => import("@/components/QRCodeStyling"), { ssr: false });

export default function SubmitPetSuccessful() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-[#E5E0D8]">
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-md sm:max-w-lg w-full flex flex-col gap-6">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-[#748873]">
          Thank you for submitting your pet
        </h1>

        {/* Caption */}
        <p className="text-center text-base sm:text-lg text-[#748873]">
          Our team will review the application
        </p>

        {/* Alert Box */}
        <div className="p-3 sm:p-4 rounded-lg border-l-4 border-[#D1A980] bg-[#E5E0D8] text-[#748873]">
          <p className="font-medium text-sm sm:text-base">
            ⚠ We boycott pet trafficking. All submissions are carefully reviewed to ensure ethical rehoming.
          </p>
        </div>

        {/* QR Section */}
        <div className="flex flex-col items-center gap-2 p-3 sm:p-4 border rounded-xl border-[#D1A980] bg-white shadow-sm">
          <StyledQR url="https://sociabuzz.com/zainolamzar/donate" />
          <p className="text-center text-xs sm:text-sm text-[#748873]">
            Scan this QR to support our cause and help more pets find loving homes.
          </p>
          {/* Alternative link */}
          <a
            href="https://sociabuzz.com/zainolamzar/donate"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold shadow-md hover:opacity-90 transition-opacity text-sm sm:text-base"
            style={{ backgroundColor: "#D1A980", color: "white" }}
          >
            Click here
          </a>
        </div>

        {/* Home Button */}
        <button
          onClick={() => router.push("/")}
          className="mt-4 py-2 sm:py-3 px-4 sm:px-6 rounded-full font-bold shadow-md transition bg-[#D1A980] text-white hover:opacity-90 text-sm sm:text-base"
        >
          🏠 Back to Home
        </button>
      </div>
    </div>
  );
}
