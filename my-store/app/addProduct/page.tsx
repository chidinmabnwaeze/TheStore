"use client";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

interface addProductProps {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

export default function AddProductPage() {
  const [formdata, setFormData] = useState<addProductProps>({
    title: "",
    price: 0,
    description: "",
    categoryId: 1,
    images: [""],
  });

  const router = useRouter();

  const handleAddProduct = async () => {
    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formdata.title,
          price: formdata.price,
          description: formdata.description,
          categoryId: formdata.categoryId,
          images: formdata.images,
        }),
      });

      
      if (!response.ok) {
        const error = await response.json();
        toast.error("Error adding product");
        console.log(error);
        throw new Error("Failed to add product");
      }
        
      
      const data = await response.json();
      toast.success("Product added successfully");
      router.push("/products");
      console.log("Product added successfully", data);
    } catch (error) {
      console.error("Error adding product", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <a href="/products" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
            ← Back to Products
          </a>
          <span className="text-gray-300">|</span>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            The<span className="text-indigo-600">Store</span>
          </span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Add New Product</h1>
        <p className="text-sm text-gray-500 mb-8">Fill in the details below to list a new product.</p>

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">
          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              void handleAddProduct();
            }}
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                placeholder="Product title"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                value={formdata.title}
                onChange={(e) => setFormData({ ...formdata, title: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
              <input
                type="number"
                placeholder="0.00"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                value={formdata.price}
                onChange={(e) => setFormData({ ...formdata, price: Number(e.target.value) })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                rows={3}
                placeholder="Describe your product..."
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
                value={formdata.description}
                onChange={(e) => setFormData({ ...formdata, description: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category ID</label>
              <input
                type="number"
                placeholder="1"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                value={formdata.categoryId}
                onChange={(e) => setFormData({ ...formdata, categoryId: Number(e.target.value) })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input
                type="text"
                placeholder="https://..."
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                value={formdata.images[0]}
                onChange={(e) => setFormData({ ...formdata, images: [e.target.value] })}
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg text-sm transition-colors"
            >
              Add Product
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
