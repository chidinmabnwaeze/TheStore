"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
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
        }
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
        }
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

  if (loading) return <p className="h-screen m-auto">Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <main className="flex justify-between items-center p-10">
      <section>
        <img src={product.images[0]} alt={product.title} className="" />
        <button className="text-blue-500 mt-4" onClick={()=>router.push(`/products/${product.id}/edit/`)}>
          Edit Product
        </button>
      </section>

      <section className="ml-15">
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <p className="text-lg">${product.price}</p>
        <p>{product.description}</p>
        <div className="flex justify-between mt-5">
          <button className="bg-blue-700 p-4 w-full text-white rounded mr-3">
            Buy Now
          </button>
          <button
            className="bg-red-700 p-4 w-full text-white rounded mr-3"
            onClick={handleDelete}
          >
            Delete Product
          </button>
        </div>
      </section>
    </main>
  );
}
