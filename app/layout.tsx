import type { Metadata } from "next";
import "./globals.css";
import Head from "next/head";

export const metadata: Metadata = {
  title: "PawPass | Pet Rehome | For Pets | Made By Zainol Amzar",
  description:
    "PawPass is a centralised pet rehome platform that helps pets find new loving homes. Made with care by Zainol Amzar.",
  keywords: [
    "PawPass",
    "pet adoption",
    "pet rehome",
    "dog adoption",
    "cat adoption",
    "rescue pets",
    "find pets new home",
    "adopt a pet",
    "pet care",
    "Zainol Amzar",
  ],
  authors: [{ name: "Zainol Amzar", url: "https://yourportfolio.com" }],
  creator: "Zainol Amzar",
  publisher: "PawPass",
  metadataBase: new URL("https://www.pawpass.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "PawPass | Adopt, Rescue & Rehome Pets",
    description:
      "Find pets a new home with PawPass – a centralised rehome system for cats, dogs, and other pets.",
    url: "https://www.pawpass.com",
    siteName: "PawPass",
    images: [
      {
        url: "https://www.pawpass.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PawPass - Pet Rehome Platform",
      },
    ],
    locale: "en_MY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PawPass | Pet Rehome | Made by Zainol Amzar",
    description:
      "Rehome your pets with PawPass – helping cats, dogs & more find loving families.",
    creator: "@yourTwitterHandle",
    images: ["https://www.pawpass.com/og-image.jpg"],
  },
  category: "Pets & Animals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PawPass",
    url: "https://pawpass.zainolamzar.my",
    logo: "https://pawpass.zainolamzar.my/webicon/favicon-32x32.png",
    sameAs: [
      "https://facebook.com/pawpass",
      "https://twitter.com/pawpass",
    ],
  };

  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/webicon/favicon.ico" sizes="512x512" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
