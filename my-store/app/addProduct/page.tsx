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
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      <ToastContainer />
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          void handleAddProduct();
        }}
      >
        <div>
          <label className="block mb-1 font-semibold">Title</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={formdata.title}
            onChange={(e) =>
              setFormData({ ...formdata, title: e.target.value })
            }
          />
          <label className="block mb-1 font-semibold">Price</label>
          <input
            type="number"
            className="w-full border px-3 py-2 rounded"
            value={formdata.price}
            onChange={(e) =>
              setFormData({ ...formdata, price: Number(e.target.value) })
            }
          />
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            className="w-full border px-3 py-2 rounded"
            value={formdata.description}
            onChange={(e) =>
              setFormData({ ...formdata, description: e.target.value })
            }
          />
          <label className="block mb-1 font-semibold">Category ID</label>
          <input
            type="number"
            className="w-full border px-3 py-2 rounded"
            value={formdata.categoryId}
            onChange={(e) =>
              setFormData({ ...formdata, categoryId: Number(e.target.value) })
            }
          />
          <label className="block mb-1 font-semibold">Image</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={formdata.images[0]}
            onChange={(e) =>
              setFormData({ ...formdata, images: [e.target.value] })
            }
          />
        </div>
        <div>
          <button
            type="submit"
            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Product
          </button>
        </div>
      </form>
    </main>
  );
}
