"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  Heart, 
  PawPrint, 
  Search, 
  ShieldAlert,
  ListPlus,
  Users,
  ShieldCheck
} from 'lucide-react';
import { useEffect, useRef, useState } from "react";
import NavBar from "@/ui/NavBar";

// Hook for fade-in on scroll
function useFadeInOnScroll(threshold = 0.2) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

export default function HomePage() {
  const heroRef = useFadeInOnScroll(0.2);
  const featuresRef = useFadeInOnScroll(0.2);
  const whyChooseRef = useFadeInOnScroll(0.2);
  const tipsRef = useFadeInOnScroll(0.2);

  const fadeClass = (isVisible: boolean) =>
    `transition-opacity duration-1000 transform ${
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    }`;

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F8F8F8' }}>
      {/* Navbar */}
      <NavBar />

      {/* Hero Section */}
      <main
        ref={heroRef.ref}
        className={`${fadeClass(heroRef.isVisible)} flex-1 flex flex-col items-center justify-center p-8 overflow-hidden`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left z-10">
            <h2 className="text-6xl font-bold mb-6 leading-tight" style={{ color: '#748873' }}>
              Find Your <span style={{ color: '#D1A980' }}>Pawsitively</span> Perfect Companion
            </h2>
            <p className="text-lg mb-8" style={{ color: '#748873' }}>
              Discover endless love and joy. We connect loving homes with adorable pets waiting for their forever family. Your new best friend is just a click away. 🐾
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <Link
                href="/find-your-cat"
                className="text-white px-6 py-3 rounded-lg text-lg shadow-md transform hover:scale-105 hover:shadow-xl transition-all duration-300"
                style={{ backgroundColor: '#748873' }}
              >
                Meet the Cats
              </Link>
              <Link
                href="/find-your-dog"
                className="text-white px-6 py-3 rounded-lg text-lg shadow-md transform hover:scale-105 hover:shadow-xl transition-all duration-300"
                style={{ backgroundColor: '#D1A980' }}
              >
                Meet the Dogs
              </Link>
            </div>
          </div>
          <div className="relative flex justify-center items-center h-full">
            <div className="absolute w-75 h-75 rounded-full -top-8 -left-8" style={{ backgroundColor: '#E5E0D8' }}></div>
            <div className="absolute w-56 h-56 rounded-full -bottom-12 -right-4" style={{ backgroundColor: '#D1A980' }}></div>

            <div className="relative group mr-4">
              <div className="absolute -inset-2 rounded-xl" style={{ backgroundColor: '#D1A980' }}></div>
              <Image 
                src="/assets/dog-hero.png" 
                alt="Cute Dog" 
                width={400} 
                height={400} 
                className="relative object-cover rounded-xl shadow-2xl transform group-hover:scale-105 transition-transform duration-300" 
              />
            </div>
            <div className="relative group mt-6">
              <div className="absolute -inset-2 rounded-xl" style={{ backgroundColor: '#748873' }}></div>
              <Image 
                src="/assets/cat-hero.png" 
                alt="Cute Cat" 
                width={250} 
                height={250} 
                className="relative object-cover rounded-xl shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section
        ref={featuresRef.ref}
        className={`${fadeClass(featuresRef.isVisible)} py-20 px-8 w-full`}
      >
        <h2 className="text-4xl font-bold text-center mb-12" style={{ color: '#748873' }}>How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[{
            icon: <PawPrint size={40} className="text-white" />,
            title: "Submit Your Pet",
            color: "#D1A980",
            desc: "Easily create a profile for your pet with photos and details to find them a new, loving home."
          },{
            icon: <Search size={40} className="text-white" />,
            title: "Seek Desired Pet",
            color: "#748873",
            desc: "Browse through profiles of adorable cats and dogs. Filter by breed, age, and location to find your perfect match."
          },{
            icon: <Heart size={40} className="text-white" />,
            title: "Deal Seamlessly",
            color: "#D1A980",
            desc: "Connect directly and securely with potential adopters or owners to arrange meetings and finalize the adoption."
          }].map((feat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-6 rounded-2xl shadow-lg transform hover:-translate-y-2 transition-transform duration-300" style={{ backgroundColor: '#E5E0D8' }}>
              <div className="p-4 rounded-full mb-4" style={{ backgroundColor: feat.color }}>
                {feat.icon}
              </div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: '#748873' }}>{feat.title}</h3>
              <p style={{ color: '#748873' }}>{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section
        ref={whyChooseRef.ref}
        className={`${fadeClass(whyChooseRef.isVisible)} py-20 px-8 w-full`}
      >
        <h2 className="text-4xl font-bold text-center mb-12" style={{ color: '#748873' }}>Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
          {[
            {
              img: "/assets/pet-1.jpg",
              icon: <ShieldCheck size={30} style={{ color: '#748873' }} />,
              title: "Ensure Safe Adoptions",
              desc: "We prioritize the safety and well-being of every pet, ensuring a secure and trustworthy adoption process."
            },
            {
              img: "/assets/pet-2.jpg",
              icon: <ListPlus size={30} style={{ color: '#748873' }} />,
              title: "Easy to List Your Pets",
              desc: "Our simple submission form makes it effortless to create a beautiful profile for your pet in minutes."
            },
            {
              img: "/assets/pet-3.jpg",
              icon: <Users size={30} style={{ color: '#748873' }} />,
              title: "Support for Pet Owners",
              desc: "We provide resources and a supportive community to help you navigate your journey as a pet owner."
            },
            {
              img: "/assets/pet-4.jpg",
              icon: <Search size={30} style={{ color: '#748873' }} />,
              title: "Seek Desired Pet Easily",
              desc: "Our advanced search filters help you find the perfect furry companion that matches your lifestyle."
            }
          ].map((card, idx) => (
            <div key={idx} className="rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
              <div className="relative h-48">
                <Image src={card.img} alt={card.title} layout="fill" className="object-cover" />
              </div>
              <div className="p-6" style={{ backgroundColor: '#E5E0D8' }}>
                <div className="flex items-center gap-3 mb-2">
                  {card.icon}
                  <h3 className="text-xl font-bold" style={{ color: '#748873' }}>{card.title}</h3>
                </div>
                <p style={{ color: '#748873' }}>{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tips Section */}
      <section
        ref={tipsRef.ref}
        className={`${fadeClass(tipsRef.isVisible)} py-20 px-8 w-full`}
        style={{ backgroundColor: '#E5E0D8' }}
      >
        <h2 className="text-4xl font-bold text-center mb-12" style={{ color: '#748873' }}>Adoption Tips & Warnings</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              icon: <ShieldAlert size={40} className="mb-4" style={{ color: '#D1A980' }} />,
              title: "Beware of Scams",
              desc: "Never pay for a pet you have not met. Be cautious of sellers who ask for money upfront for shipping."
            },
            {
              icon: <ShieldAlert size={40} className="mb-4" style={{ color: '#D1A980' }} />,
              title: "Boycott Animal Trafficking",
              desc: "Report any suspicious listings. Trafficked animals often suffer from poor health and inhumane conditions."
            },
            {
              icon: <ShieldAlert size={40} className="mb-4" style={{ color: '#D1A980' }} />,
              title: "Say No to Illegal Breeding",
              desc: "Support ethical adoption. Avoid backyard breeders and puppy mills that prioritize profit over animal welfare."
            }
          ].map((tip, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-6 rounded-2xl shadow-lg hover:-translate-y-2 transition-transform duration-300" style={{ backgroundColor: '#F8F8F8' }}>
              {tip.icon}
              <h3 className="text-2xl font-bold mb-2" style={{ color: '#748873' }}>{tip.title}</h3>
              <p style={{ color: '#748873' }}>{tip.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        className="p-8 border-t flex flex-col items-center justify-center gap-4"
        style={{ color: '#748873', backgroundColor: '#E5E0D8' }}
      >
        <Image src="/webicon/android-chrome-512x512.png" alt="PawPass Logo" width={60} height={60} />
        <div className="text-center text-sm">
          <p>All adoptions and interactions are the responsibility of the users.</p>
          <p>PawPass is a platform for connecting pet owners and adopters, but we cannot guarantee outcomes or vet the animals personally.</p>
          <p className="mt-2">© {new Date().getFullYear()} PawPass. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
