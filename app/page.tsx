import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 border-b shadow-sm">
        <h1 className="text-xl font-bold">Pet Rehome</h1>
        <div className="flex gap-4">
          <Link href="/cats" className="hover:underline">
            Cats
          </Link>
          <Link href="/dogs" className="hover:underline">
            Dogs
          </Link>
          <Link
            href="/submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit
          </Link>
        </div>
      </nav>

      {/* Hero / Welcome */}
      <main className="flex-1 flex flex-col items-center justify-center text-center p-8">
        <h2 className="text-3xl font-bold mb-4">Welcome to Pet Rehome 🐾</h2>
        <p className="text-lg text-gray-600 max-w-xl">
          Find loving homes for cats and dogs, or adopt your next furry friend.
        </p>
        <div className="flex gap-4 mt-6">
          <Link
            href="/cats"
            className="px-6 py-3 border rounded-lg hover:bg-gray-100"
          >
            View Cats
          </Link>
          <Link
            href="/dogs"
            className="px-6 py-3 border rounded-lg hover:bg-gray-100"
          >
            View Dogs
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-gray-500 border-t">
        © {new Date().getFullYear()} Pet Rehome. All rights reserved.
      </footer>
    </div>
  );
}