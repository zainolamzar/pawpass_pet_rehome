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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-0 animate-fade-in"
      style={{ animationFillMode: "forwards", animationDuration: "0.5s" }}
    >
      <div className="flex flex-col items-center">
        <img
          src="/assets/dog-walk.gif"
          alt="Submitting..."
          className="w-40 h-40 mb-4"
        />
        <h2 className="text-2xl font-bold text-white">Submitting...</h2>
      </div>
    </div>
  );
}
