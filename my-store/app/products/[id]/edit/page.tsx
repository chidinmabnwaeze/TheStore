//  "use client";
//  import { useState } from "react";

// interface UpdateProps{
//   id: number;
//   title: string;
//   slug: string;
//   price: number;
//   description: string;
//   images: string[];
// };

// export default function EditProduct() {
//   const [product, setProduct] = useState<UpdateProps | null>(null);

//   const updateProduct = async (e:any) => {
// e.preventDefault()
//     try {
//       const response = await fetch(
//         `https://api.escuelajs.co/api/v1/products/${product?.id}`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             title: product?.title + "Updated",
//           }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to update product");
//       }

//       const data = await response.json();
//       setProduct(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <form onSubmit={updateProduct}>
//       <div>
//         <label className="block mb-1 font-semibold">Title</label>
//         <input
//           type="text"
//           className="w-full border px-3 py-2 rounded"
//           value={product?.title}
//           onChange={(e) => setProduct({ ...product, title: e.target.value })}
//         />
//         <label className="block mb-1 font-semibold">Price</label>
//         <input
//           type="number"
//           className="w-full border px-3 py-2 rounded"
//           value={product.price}
//           onChange={(e) =>
//             setProduct({ ...product, price: Number(e.target.value) })
//           }
//         />
//         <label className="block mb-1 font-semibold">Description</label>
//         <textarea
//           className="w-full border px-3 py-2 rounded"
//           value={product.description}
//           onChange={(e) =>
//             setProduct({ ...product, description: e.target.value })
//           }
//         />
//         <label className="block mb-1 font-semibold">Category ID</label>
//         <input
//           type="number"
//           className="w-full border px-3 py-2 rounded"
//           value={product.categoryId}
//           onChange={(e) =>
//             setProduct({ ...product, categoryId: Number(e.target.value) })
//           }
//         />
//         <label className="block mb-1 font-semibold">Image</label>
//         <input
//           type="text"
//           className="w-full border px-3 py-2 rounded"
//           value={product.images[0]}
//           onChange={(e) => setProduct({ ...product, images: [e.target.value] })}
//         />
//       </div>
//       <div>
//         <button
//           type="submit"
//           className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Save
//         </button>
//       </div>
//     </form>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface ProductProps {
  id: number;
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<ProductProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);

      const data = await res.json();
      setProduct(data);
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
  

    if (res.ok) {
      router.push(`/products/${id}`);
    } else {
      const error = res.json();
      console.log(error);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-gray-400 text-sm">Loading product...</p>
    </div>
  );
  if (!product) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-gray-500">Product not found.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            type="button"
            onClick={() => router.push(`/products/${id}`)}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            ← Back to Product
          </button>
          <span className="text-gray-300">|</span>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            The<span className="text-indigo-600">Store</span>
          </span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Edit Product</h1>
        <p className="text-sm text-gray-500 mb-8">Update the details below and save your changes.</p>

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">
          <form onSubmit={handleUpdate} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                value={product.title}
                onChange={(e) => setProduct({ ...product, title: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
              <input
                type="number"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                value={product.price}
                onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                value={product.description}
                onChange={(e) => setProduct({ ...product, description: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category ID</label>
              <input
                type="number"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                value={product.categoryId}
                onChange={(e) => setProduct({ ...product, categoryId: Number(e.target.value) })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                value={product.images[0]}
                onChange={(e) => setProduct({ ...product, images: [e.target.value] })}
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg text-sm transition-colors"
            >
              Save Changes
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
