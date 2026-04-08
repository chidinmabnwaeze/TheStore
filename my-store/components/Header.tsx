import { useUser } from "@/app/context/UserContext";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header() {
  const { user } = useUser();
  const router = useRouter();
  return (
    <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="text-xl font-bold tracking-tight text-gray-900">
          The<span className="text-indigo-600">Store</span>
        </span>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            Welcome,{" "}
            <span className="font-medium text-gray-800">
              {user?.name || "Guest"}
            </span>
          </span>
          <Link
            href="/addProduct"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            + Add Product
          </Link>
          <ShoppingCart
            className="w-5 h-5 text-indigo-600"
            onClick={() => router.push("/cart")}
          />
        </div>
      </div>
    </header>
  );
}
