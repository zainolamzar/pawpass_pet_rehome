/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import NavBar from "@/components/ui/NavBar";
import Image from "next/image";
import { usePathname } from "next/navigation";
import FilterForm from "@/components/FilterForm";

interface Cat {
  _id: string;
  slug: string; // ensure this exists in your API
  breed: string;
  location: string;
  gender: string;
  description: string;
  age: string;
  phone_number: string;
  owner_name: string;
  animal: string;
  isActive: boolean;
  images: string[];
}

const STATES = [
  "Perlis",
  "Kedah",
  "Pulau Pinang",
  "Perak",
  "Kelantan",
  "Terengganu",
  "Pahang",
  "Selangor",
  "Melaka",
  "Negeri Sembilan",
  "Johor",
  "Sabah",
  "Sarawak",
  "WP Kuala Lumpur",
  "WP Putrajaya",
  "WP Labuan",
];

export default function CatsPage() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [currentIndexes, setCurrentIndexes] = useState<{ [key: string]: number }>({});
  const [filters, setFilters] = useState({
    gender: "",
    breed: "",
    state: "",
    region: "",
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fetchCats = async () => {
      const res = await fetch("/api/cats");
      const data = await res.json();
      if (data.success) setCats(data.data);
    };
    fetchCats();
  }, []);

  useEffect(() => {
    setShowMobileFilters(false);
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setShowMobileFilters(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const breeds = useMemo(() => Array.from(new Set(cats.map((c) => c.breed))), [cats]);
  const regions = useMemo(
    () =>
      Array.from(
        new Set(
          cats.map((c) => {
            const [region] = c.location.split(",").map((s) => s.trim());
            return region;
          })
        )
      ),
    [cats]
  );

  const filteredCats = useMemo(() => {
    return cats.filter((cat) => {
      const [region, state] = cat.location.split(",").map((s) => s.trim());
      return (
        (!filters.gender || cat.gender === filters.gender) &&
        (!filters.breed || cat.breed === filters.breed) &&
        (!filters.state || state === filters.state) &&
        (!filters.region || region === filters.region)
      );
    });
  }, [cats, filters]);

  const handleNext = (id: string, total: number) => {
    setCurrentIndexes((prev) => ({
      ...prev,
      [id]: prev[id] !== undefined ? (prev[id] + 1) % total : 1,
    }));
  };

  const handlePrev = (id: string, total: number) => {
    setCurrentIndexes((prev) => ({
      ...prev,
      [id]: prev[id] !== undefined ? (prev[id] - 1 + total) % total : total - 1,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F8F8F8" }}>
      <NavBar />

      {/* Mobile filter toggle */}
      <div className="md:hidden p-4 border-b flex justify-between items-center bg-white sticky top-0 z-40">
        <h2 className="text-lg font-bold text-[#748873]">Filter Cats</h2>
        <button
          onClick={() => setShowMobileFilters((prev) => !prev)}
          className="px-4 py-2 rounded bg-[#D1A980] text-white font-semibold"
        >
          {showMobileFilters ? "Close" : "Filters"}
        </button>
      </div>

      <div className="flex flex-1">
        {/* Sidebar (desktop) */}
        <aside className="hidden md:flex flex-col w-64 p-4 border-r bg-white">
          <h2 className="text-lg font-bold mb-4 text-[#748873]">Filter Cats</h2>
          <FilterForm
            filters={filters}
            setFilters={setFilters}
            breeds={breeds}
            regions={regions}
            states={STATES}
          />
        </aside>

        {/* Mobile filter panel */}
        <div
          className={`md:hidden fixed inset-0 z-50 flex transition-opacity duration-300 ${
            showMobileFilters ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            className="flex-1 bg-black bg-opacity-40"
            onClick={() => setShowMobileFilters(false)}
          />
          <div
            className={`w-4/5 max-w-sm bg-white p-4 shadow-lg overflow-y-auto transform transition-transform duration-300 ${
              showMobileFilters ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <h2 className="text-lg font-bold mb-4 text-[#748873]">Filter Cats</h2>
            <FilterForm
              filters={filters}
              setFilters={setFilters}
              breeds={breeds}
              regions={regions}
              states={STATES}
              onClose={() => setShowMobileFilters(false)}
            />
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCats.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center text-center p-10">
              <Image src="/assets/cat-info.png" alt="No cats" width={150} height={150} />
              <h2 className="text-2xl font-bold mt-4 text-[#748873]">
                Meow Meow! No kitty cats here yet 😺
              </h2>
              <p className="text-lg text-[#D1A980] mt-2">
                Be the first to add a fluffy friend!
              </p>
            </div>
          ) : (
            filteredCats.map((cat) => {
              const currentIndex = currentIndexes[cat._id] || 0;

              return (
                <Link key={cat._id} href={`/find-your-cat/${cat.slug}`} className="group">
                  <div className="bg-white border rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition">
                    {/* Image Carousel */}
                    <div className="relative w-full h-56 bg-gray-100">
                      {cat.images.length > 0 ? (
                        <img
                          src={cat.images[currentIndex]}
                          alt={cat.breed}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-[#748873] text-lg">
                          No Image
                        </div>
                      )}
                      {cat.images.length > 1 && (
                        <>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handlePrev(cat._id, cat.images.length);
                            }}
                            className="absolute top-1/2 left-2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow hover:bg-opacity-90"
                          >
                            ◀
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleNext(cat._id, cat.images.length);
                            }}
                            className="absolute top-1/2 right-2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow hover:bg-opacity-90"
                          >
                            ▶
                          </button>
                        </>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <h2 className="text-xl font-bold text-[#748873] mb-1">{cat.breed}</h2>
                      <p className="text-sm text-gray-600">📍 {cat.location}</p>
                      <p className="text-sm text-gray-600">⚧ {cat.gender}</p>
                      <p className="text-sm text-gray-600">🎂 {cat.age} years old</p>
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </main>
      </div>
    </div>
  );
}
