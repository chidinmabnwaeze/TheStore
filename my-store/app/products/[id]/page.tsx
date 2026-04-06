"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Cart } from "@/app/cart/cart_logic";
import EditProduct from "@/app/products/[id]/edit/page";

interface ProductProps {
  id: number;
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

export default function SingleProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<ProductProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<Cart | null>(null);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);

      if (!res.ok) {
        throw new Error("Failed to fetch product");
      }

      const data = await res.json();
      setProduct(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchProduct();
  }, [id]);

  const updateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/products/${product?.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: product?.title + "Updated",
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `https://api.escuelajs.co/api/v1/products/${product?.id}`,
        {
          method: "DELETE",
        },
      );
      if (!res.ok) {
        console.log("error deleting product");
        throw new Error("Couldn't delete product");
      } else {
        console.log("product deleted successfully");
        router.push("/products");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400 text-sm">Loading product...</p>
      </div>
    );
  if (!product)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Product not found.</p>
      </div>
    );

  const addToCart = () => {
    const newCart = new Cart();
    newCart.items = [...(cart?.items ?? []), { productId: product.id, quantity: 1 }];
    newCart.addProduct(product.id, 1);
    console.log("Cart after adding product:", newCart);
    setCart(newCart);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => router.push("/products")}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            ← Back to Products
          </button>
          <span className="text-gray-300">|</span>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            The<span className="text-indigo-600">Store</span>
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-1/2 bg-gray-100">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover max-h-96 md:max-h-full"
            />
          </div>

          <div className="md:w-1/2 p-8 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {product.title}
              </h1>
              <p className="text-3xl font-bold text-indigo-600 mb-4">
                ${product.price}
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="mt-8 space-y-3">
              <button
                className="w-full py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
                onClick={addToCart}
              >
                Buy Now
              </button>
              <button
                onClick={() => router.push(`/products/${product.id}/edit/`)}
                className="w-full py-3 text-sm font-medium text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors"
              >
                Edit Product
              </button>
              <button
                onClick={handleDelete}
                className="w-full py-3 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
