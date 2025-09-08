/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";

interface SubmitPetLoadingProps {
  isVisible: boolean;
}

export default function SubmitPetLoading({ isVisible }: SubmitPetLoadingProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true); // trigger fade-in
    } else {
      setShow(false);
    }
  }, [isVisible]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm animate-fade-in"
      style={{ animationFillMode: "forwards", animationDuration: "0.5s" }}
    >
      <div className="bg-gradient-to-br from-purple-800 via-blue-900 to-teal-800 rounded-3xl p-6 flex flex-col items-center shadow-2xl animate-bounce-slow">
        <img
          src="/assets/dog-walk.gif"
          alt="Submitting..."
          className="w-40 h-40 mb-4 rounded-full shadow-lg"
        />
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white text-center drop-shadow-lg">
          Submitting...
        </h2>
        <p className="mt-2 text-white font-medium text-sm sm:text-base text-center drop-shadow-sm">
          Hang tight! Your friend is on the way 🐶✨
        </p>
      </div>
    </div>
  );
}
