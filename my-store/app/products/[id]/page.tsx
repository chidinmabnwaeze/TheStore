"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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
  const [product, setProduct] = useState<ProductProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `https://api.escuelajs.co/api/v1/products/${id}`
        );

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

    fetchProduct();
  }, [id]);

  const updateProduct = async (id: string) => {
    try {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/products/${id}`
      );

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      const data = await response.json();
      // set
    } catch (error) {
      console.error(error);
    }
  };

//   const deleteProduct = async ()=

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <main className="flex justify-between items-center p-10">
      <section>
        <img src={product.images[0]} alt={product.title} className="" />
      </section>

      <section className="ml-15">
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <p className="text-lg">${product.price}</p>
        <p>{product.description}</p>
        <div className="flex justify-between mt-5">
          <button className="bg-blue-700 p-4 w-full text-white rounded mr-3">
            Buy Now
          </button>
          <button className="bg-red-700 p-4 w-full text-white rounded mr-3">
            Delete Product
          </button>
        </div>
      </section>
    </main>
  );
}
