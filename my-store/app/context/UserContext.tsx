"use client";
import {
  Children,
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { Cart } from "../cart/cart_logic";
import ProductsPage from "../products/page";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<AuthContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<Cart>(new Cart());
  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(
        "https://api.escuelajs.co/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        },
      );
      if (!response.ok) {
        const errorData = await response.json();

        console.error("Login failed:", errorData);
        throw new Error("Login failed");
      }
      const data = await response.json();

      // Store the token in localStorage
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);

      const getUser = await fetch(
        "https://api.escuelajs.co/api/v1/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${data.access_token}`,
          },
        },
      );
      if (!getUser.ok) {
        const errorData = await getUser.json();
        console.error("error fetching user", errorData);
        return;
      }
      const userData = await getUser.json();
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      toast.success("Login successful!");
      router.push("/products");

      console.log("Login successful", data);
    } catch (error: any) {
      console.error("Error during login", error);
      toast.error(error.message || "Login failed");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    router.push("/auth/login");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be inside UserProvider");
  }
  return context;
}
