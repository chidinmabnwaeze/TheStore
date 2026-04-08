"use client";
import Image from "next/image";
// import AddProductPage from "../app/addProduct/page";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUser } from "@/app/context/UserContext";
import Header from "@/components/Header";
import { Category, getCategories } from "../services/categories";

interface ProductProps {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  images: string[];
}

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const { user } = useUser();

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products?limit=20&offset=0")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCategories();
        setCategories(categories);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="flex">
        <section className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            All Products
          </h1>
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
                    <h2 className="text-sm font-semibold text-gray-800 mb-1 truncate">
                      {product.title}
                    </h2>
                    <p className="text-indigo-600 font-bold text-base mb-3">
                      ${product.price}
                    </p>
                    <button className="w-full py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* sidebar */}
        <aside className="hidden lg:block w-64 bg-white rounded-xl border border-gray-100 shadow-sm p-6 ml-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Categories</h2>
          <ul className="space-y-3">
            {categories.map((cat) => (
              <li key={cat.id}>
                <a
                  href="#"
                  className="capitalize font-medium hover:text-gray-900 transition-colors"
                >
                  {cat.name}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </main>
    </div>
  );
}
