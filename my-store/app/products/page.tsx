import Image from "next/image";
import AddProductPage from "../addProduct/page";
import Link from "next/link";

interface productProps {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  images: string[];
}

const fetchProducts = async (): Promise<productProps[]> => {
  const res = await fetch(
    "https://api.escuelajs.co/api/v1/products?limit=20&offset=0",
    {}
  );
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
};


export default async function ProductsPage() {
  const products = await fetchProducts();
  // const id = useParams();
  // const getProductId = await getProductById(id);
  return (
    <main>
      <div className="flex justify-between items-center p-4">
        {/* <div>Welcome {user?.name || "Guest"}!</div> */}
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        <Link href="/addProduct" className="border p-4">
          Add New Product
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-4 p-4">
        {products.map((product) => (
          <Link href={`/products/${product.id}`}>
            <div key={product.id} className="border p-4 rounded">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-48 object-cover mb-4"
              />
              <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
              
              <p className="text-gray-700 mb-2">${product.price}</p>
              {/* <p className="text-gray-600">{product.description}</p> */}
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Add to Cart
              </button>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
