import Link from "next/link";
import Image from 'next/image';
import { 
  Cat, 
  Dog, 
  Heart, 
  PawPrint, 
  Search, 
  ShieldAlert,
  ListPlus,
  Users,
  ShieldCheck
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F8F8F8' }}>
      {/* Navbar */}
      <nav className="flex justify-between items-center py-3 px-6 shadow-md sticky top-0 z-50" style={{ backgroundColor: '#E5E0D8', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}>
        <Link href="/" className="flex items-center gap-3">
          <Image src="/webicon/android-chrome-512x512.png" alt="PawPass Logo" width={45} height={45} />
          <h1 className="text-2xl font-bold" style={{ color: '#748873', fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>PawPass</h1>
        </Link>
        <div className="flex gap-5 items-center">
          <Link href="/cats" className="hover:opacity-80 transition-opacity" title="Cats">
            <Cat size={32} style={{ color: '#748873' }} />
          </Link>
          <Link href="/dogs" className="hover:opacity-80 transition-opacity" title="Dogs">
            <Dog size={32} style={{ color: '#748873' }} />
          </Link>
          <Link
            href="/submit"
            className="text-white px-5 py-2 rounded-full font-semibold shadow-md hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#D1A980' }}
          >
            Submit a Pet
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center p-8 overflow-hidden">
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
            {/* Background shapes */}
            <div className="absolute w-75 h-75 rounded-full -top-8 -left-8" style={{ backgroundColor: '#E5E0D8' }}></div>
            <div className="absolute w-56 h-56 rounded-full -bottom-12 -right-4" style={{ backgroundColor: '#D1A980' }}></div>
            
            {/* Images */}
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
      <section className="py-20 px-8 w-full">
        <h2 className="text-4xl font-bold text-center mb-12" style={{ color: '#748873' }}>How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {/* Feature 1: Submit Your Pet */}
          <div className="flex flex-col items-center text-center p-6 rounded-2xl shadow-lg transform hover:-translate-y-2 transition-transform duration-300" style={{ backgroundColor: '#E5E0D8' }}>
            <div className="p-4 rounded-full mb-4" style={{ backgroundColor: '#D1A980' }}>
              <PawPrint size={40} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2" style={{ color: '#748873' }}>Submit Your Pet</h3>
            <p style={{ color: '#748873' }}>Easily create a profile for your pet with photos and details to find them a new, loving home.</p>
          </div>
          
          {/* Feature 2: Seek Desired Pet */}
          <div className="flex flex-col items-center text-center p-6 rounded-2xl shadow-lg transform hover:-translate-y-2 transition-transform duration-300" style={{ backgroundColor: '#E5E0D8' }}>
            <div className="p-4 rounded-full mb-4" style={{ backgroundColor: '#748873' }}>
              <Search size={40} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2" style={{ color: '#748873' }}>Seek Desired Pet</h3>
            <p style={{ color: '#748873' }}>Browse through profiles of adorable cats and dogs. Filter by breed, age, and location to find your perfect match.</p>
          </div>
          
          {/* Feature 3: Deal Seamlessly */}
          <div className="flex flex-col items-center text-center p-6 rounded-2xl shadow-lg transform hover:-translate-y-2 transition-transform duration-300" style={{ backgroundColor: '#E5E0D8' }}>
            <div className="p-4 rounded-full mb-4" style={{ backgroundColor: '#D1A980' }}>
              <Heart size={40} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2" style={{ color: '#748873' }}>Deal Seamlessly</h3>
            <p style={{ color: '#748873' }}>Connect directly and securely with potential adopters or owners to arrange meetings and finalize the adoption.</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-8 w-full">
        <h2 className="text-4xl font-bold text-center mb-12" style={{ color: '#748873' }}>Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
          {/* Card 1: Safe Adoptions */}
          <div className="rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
            <div className="relative h-48">
              <Image src="/assets/pet-1.jpg" alt="Safe Adoptions" layout="fill" className="object-cover" />
            </div>
            <div className="p-6" style={{ backgroundColor: '#E5E0D8' }}>
              <div className="flex items-center gap-3 mb-2">
                <ShieldCheck size={30} style={{ color: '#748873' }} />
                <h3 className="text-xl font-bold" style={{ color: '#748873' }}>Ensure Safe Adoptions</h3>
              </div>
              <p style={{ color: '#748873' }}>We prioritize the safety and well-being of every pet, ensuring a secure and trustworthy adoption process.</p>
            </div>
          </div>
          {/* Card 2: Easy to List Pets */}
          <div className="rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
            <div className="relative h-48">
              <Image src="/assets/pet-2.jpg" alt="Easy to List Pets" layout="fill" className="object-cover" />
            </div>
            <div className="p-6" style={{ backgroundColor: '#E5E0D8' }}>
              <div className="flex items-center gap-3 mb-2">
                <ListPlus size={30} style={{ color: '#748873' }} />
                <h3 className="text-xl font-bold" style={{ color: '#748873' }}>Easy to List Your Pets</h3>
              </div>
              <p style={{ color: '#748873' }}>Our simple submission form makes it effortless to create a beautiful profile for your pet in minutes.</p>
            </div>
          </div>
          {/* Card 3: Support for Pet Owners */}
          <div className="rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
            <div className="relative h-48">
              <Image src="/assets/pet-3.jpg" alt="Support for Pet Owners" layout="fill" className="object-cover" />
            </div>
            <div className="p-6" style={{ backgroundColor: '#E5E0D8' }}>
              <div className="flex items-center gap-3 mb-2">
                <Users size={30} style={{ color: '#748873' }} />
                <h3 className="text-xl font-bold" style={{ color: '#748873' }}>Support for Pet Owners</h3>
              </div>
              <p style={{ color: '#748873' }}>We provide resources and a supportive community to help you navigate your journey as a pet owner.</p>
            </div>
          </div>
          {/* Card 4: Seek Desired Pet Easily */}
          <div className="rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
            <div className="relative h-48">
              <Image src="/assets/pet-4.jpg" alt="Seek Desired Pet Easily" layout="fill" className="object-cover" />
            </div>
            <div className="p-6" style={{ backgroundColor: '#E5E0D8' }}>
              <div className="flex items-center gap-3 mb-2">
                <Search size={30} style={{ color: '#748873' }} />
                <h3 className="text-xl font-bold" style={{ color: '#748873' }}>Seek Desired Pet Easily</h3>
              </div>
              <p style={{ color: '#748873' }}>Our advanced search filters help you find the perfect furry companion that matches your lifestyle.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-20 px-8 w-full" style={{ backgroundColor: '#E5E0D8' }}>
        <h2 className="text-4xl font-bold text-center mb-12" style={{ color: '#748873' }}>Adoption Tips & Warnings</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center p-6 rounded-2xl shadow-lg hover:-translate-y-2 transition-transform duration-300" style={{ backgroundColor: '#F8F8F8' }}>
            <ShieldAlert size={40} className="mb-4" style={{ color: '#D1A980' }} />
            <h3 className="text-2xl font-bold mb-2" style={{ color: '#748873' }}>Beware of Scams</h3>
            <p style={{ color: '#748873' }}>Never pay for a pet you have not met. Be cautious of sellers who ask for money upfront for shipping.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-2xl shadow-lg hover:-translate-y-2 transition-transform duration-300" style={{ backgroundColor: '#F8F8F8' }}>
            <ShieldAlert size={40} className="mb-4" style={{ color: '#D1A980' }} />
            <h3 className="text-2xl font-bold mb-2" style={{ color: '#748873' }}>Boycott Animal Trafficking</h3>
            <p style={{ color: '#748873' }}>Report any suspicious listings. Trafficked animals often suffer from poor health and inhumane conditions.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-2xl shadow-lg hover:-translate-y-2 transition-transform duration-300" style={{ backgroundColor: '#F8F8F8' }}>
            <ShieldAlert size={40} className="mb-4" style={{ color: '#D1A980' }} />
            <h3 className="text-2xl font-bold mb-2" style={{ color: '#748873' }}>Say No to Illegal Breeding</h3>
            <p style={{ color: '#748873' }}>Support ethical adoption. Avoid backyard breeders and puppy mills that prioritize profit over animal welfare.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="p-8 border-t flex flex-col items-center justify-center gap-4"
        style={{ color: '#748873', backgroundColor: '#E5E0D8' }}
      >
        {/* Logo */}
        <Image
          src="/webicon/android-chrome-512x512.png"
          alt="PawPass Logo"
          width={60}
          height={60}
        />

        {/* Disclaimer */}
        <div className="text-center text-sm">
          <p>All adoptions and interactions are the responsibility of the users.</p>
          <p>PawPass is a platform for connecting pet owners and adopters, but we cannot guarantee outcomes or vet the animals personally.</p>
          <p className="mt-2">© {new Date().getFullYear()} PawPass. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}