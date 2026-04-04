import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="w-full px-8 py-5 flex items-center justify-between bg-white border-b border-gray-100 shadow-sm">
        <span className="text-xl font-bold tracking-tight text-gray-900">
          The<span className="text-indigo-600">Store</span>
        </span>
        <div className="flex gap-3">
          <Link
            href="/auth/login"
            className="px-5 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Login
          </Link>
          <Link
            href="/auth/register"
            className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Register
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Shop smarter,<br />
          <span className="text-indigo-600">live better.</span>
        </h1>
        <p className="text-lg text-gray-500 mb-10 max-w-md">
          Discover thousands of products at unbeatable prices. Sign in to start shopping today.
        </p>
        <div className="flex gap-4">
          <Link
            href="/auth/login"
            className="px-8 py-3 text-base font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow"
          >
            Get Started
          </Link>
          <Link
            href="/auth/register"
            className="px-8 py-3 text-base font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow"
          >
            Create Account
          </Link>
        </div>
      </main>

      <footer className="py-6 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} TheStore. All rights reserved.
      </footer>
    </div>
  );
}
