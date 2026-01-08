"use client";

import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

interface Login {
  email: string;
  password: string;
}

const login = () => {
  const [user, setUser] = useState<Login>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch(
        "https://api.escuelajs.co/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            password: user.password,
          }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        toast.error("Login failed. Please try again.");
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
        }
      );
      if (!getUser.ok) {
        const errorData = await getUser.json();
        console.error("error fetching user", errorData);
        return;
      }
      const userData = await getUser.json();
      localStorage.setItem("user", JSON.stringify(userData));
      toast.success("Login successful!");
      router.push("/products");

      console.log("Login successful", data);
    } catch (error: any) {
      console.error("Error during login", error);
      toast.error("Something went wrong. Try again.");
      setError(
        error.message ||
          "Login failed. Please check your credentials and try again."
      );
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div>
        <h1 className="text-2xl">Login</h1>
      </div>
      <ToastContainer aria-label="toast-container" />
      <form
        onSubmit={handleSubmit}
        className="p-5 w-2/4 border border-gray-100 "
      >
        <div className="p-5 flex  items-center">
          <label htmlFor="email" className="w-1/4">
            Email Address
          </label>
          <input
            type="text"
            placeholder="Email"
            className="p-3 m-5 w-full border border-gray-100"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>

        <div className="p-5 flex items-center">
          <label htmlFor="password" className="w-1/4">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            className="p-3 m-5 w-full border border-gray-100"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <button className="border flex justify-center items-center m-auto p-2 w-2/4">
          Login
        </button>
      </form>
      <h2>
        Don't have an account?{" "}
        <a href="/auth/register" className="hover:text-red-600">
          Register
        </a>
      </h2>
    </div>
  );
};

export default login;
