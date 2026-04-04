"use client";
import Image from "next/image";
// import AddProductPage from "../app/addProduct/page";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUser } from "@/app/context/UserContext";

interface ProductProps {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  images: string[];
}

// const fetchProducts = async (): Promise<productProps[]> => {
//   const res = await fetch(
//     "https://api.escuelajs.co/api/v1/products?limit=20&offset=0",
//     {},
//   );
//   if (!res.ok) {
//     throw new Error("Failed to fetch products");
//   }
//   return res.json();
// };

export default function ProductsPage() {
  // const products = await fetchProducts();
  const [products, setProducts] = useState<ProductProps[]>([]);
  const { user } = useUser();

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products?limit=20&offset=0")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tight text-gray-900">
            The<span className="text-indigo-600">Store</span>
          </span>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">
              Welcome, <span className="font-medium text-gray-800">{user?.name || "Guest"}</span>
            </span>
            <Link
              href="/addProduct"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              + Add Product
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">All Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
                <div className="h-48 overflow-hidden bg-gray-100">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-sm font-semibold text-gray-800 mb-1 truncate">{product.title}</h2>
                  <p className="text-indigo-600 font-bold text-base mb-3">${product.price}</p>
                  <button className="w-full py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
