export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}

export const getCategories = async (): Promise<Category[]> => {
  const res = await fetch(
    "https://api.escuelajs.co/api/v1/categories?limit=20",
  );
  return res.json();
};
