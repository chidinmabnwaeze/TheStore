import Link from "next/dist/client/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black sm:items-start">
      
       <div className="text-6xl flex justify-center items-center">Welcome to The Store</div>
       <Link href="/products">
       <button className="bg-blue-500  text-white px-4 py-3 mt,,,-6 rounded hover:bg-blue-600">Explore Products</button>
       </Link>
      </main>
    </div>
  );
}
