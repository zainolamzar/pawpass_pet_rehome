"use client";

import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";

const qrCode = new QRCodeStyling({
  width: 250,
  height: 250,
  margin: 4,
  type: "canvas",
  data: "https://example.com", // default, will be replaced by prop
  image: "/webicon/android-chrome-512x512.png", // your logo
  dotsOptions: {
    color: "#748873", // primary
    type: "dots",     // dot style
  },
  backgroundOptions: {
    color: "#FFFFFF",
  },
  imageOptions: {
    crossOrigin: "anonymous",
    margin: 6,
  },
  cornersSquareOptions: {
    color: "#D1A980",
    type: "extra-rounded",
  },
  cornersDotOptions: {
    color: "#748873",
  },
});

export default function StyledQR({ url }: { url: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      qrCode.update({ data: url });
      qrCode.append(ref.current);
    }
  }, [url]);

  return <div ref={ref} className="mx-auto" />;
}
