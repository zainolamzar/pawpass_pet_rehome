import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Find Your Cat | PawPass - Pet Rehome",
  description: "Pawpass is a centralised pet rehome system for seeking new home for pets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/webicon/favicon.ico" sizes="512x512" />
      </head>
      <body
        className={`antialiased`}
      >
            {children}
      </body>
    </html>
  );
}
