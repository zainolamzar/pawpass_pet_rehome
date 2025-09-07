import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PawPass | Pet Rehome | For Pets | Made By Zainol Amzar",
  description: "Pawpass is a centralized pet rehome system for seeking new home for pets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/webicon/favicon.ico" sizes="any" />
      </head>
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
