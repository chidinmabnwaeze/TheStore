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
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <form onSubmit={handleUpdate} className="p-10">
       <label className="block mb-1 font-semibold">Title</label>
      <input
       type="text"
        className="w-full border px-3 py-2 rounded"
        value={product.title}
        onChange={(e) => setProduct({ ...product, title: e.target.value })}
      />
      <label className="block mb-1 font-semibold">Price</label>
      <input
        type="number"
        className="w-full border px-3 py-2 rounded"
        value={product.price}
        onChange={(e) =>
          setProduct({ ...product, price: Number(e.target.value) })
        }
      />
         <label className="block mb-1 font-semibold">Description</label>
      <input
        type="text"
        className="w-full border px-3 py-2 rounded"
        value={product.description}
        onChange={(e) =>
          setProduct({ ...product, description: (e.target.value) })
        }
      />
           <label className="block mb-1 font-semibold">Category ID</label>
      <input
        type="number"
        className="w-full border px-3 py-2 rounded"
        value={product.categoryId}
        onChange={(e) =>
          setProduct({ ...product, categoryId: Number (e.target.value) })
        }
      />
           <label className="block mb-1 font-semibold">Images</label>
      <input
        type="text"
        className="w-full border px-3 py-2 rounded"
        value={product.images[0]}
        onChange={(e) =>
          setProduct({ ...product, images: [e.target.value] })
        }
      />

      <button type="submit" className="mt-2 border">Save</button>
    </form>
  );
}
