import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Cat, Dog, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#E5E0D8] sticky top-0 z-50 shadow-md rounded-b-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/webicon/android-chrome-512x512.png"
              alt="PawPass Logo"
              width={45}
              height={45}
            />
            <h1 className="text-2xl font-bold text-[#748873] font-comic">PawPass</h1>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-5">
            <Link
              href="/find-your-cat"
              className="hover:opacity-80 transition-opacity"
              title="Find Your Cat"
            >
              <Cat size={32} className="text-[#748873]" />
            </Link>
            <Link
              href="/find-your-dog"
              className="hover:opacity-80 transition-opacity"
              title="Find Your Dog"
            >
              <Dog size={32} className="text-[#748873]" />
            </Link>
            <Link
              href="/submit"
              className="text-white px-5 py-2 rounded-full font-semibold shadow-md hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#D1A980" }}
            >
              Submit a Pet
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
              {isOpen ? (
                <X size={28} className="text-[#748873]" />
              ) : (
                <Menu size={28} className="text-[#748873]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#E5E0D8] px-4 pt-4 pb-6 space-y-4 flex flex-col items-center text-center">
          <Link
            href="/find-your-cat"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            title="Cats"
          >
            <Cat size={24} className="text-[#748873]" />
            <span>Find Your Cat</span>
          </Link>
          <Link
            href="/find-your-dog"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            title="Dogs"
          >
            <Dog size={24} className="text-[#748873]" />
            <span>Find Your Dog</span>
          </Link>
          <Link
            href="/submit-your-pet"
            className="text-white px-5 py-2 rounded-full font-semibold shadow-md hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#D1A980" }}
          >
            Submit a Pet
          </Link>
        </div>
      )}
    </nav>
  );
}
