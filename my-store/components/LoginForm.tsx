"use client";

import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";

interface Login {
  email: string;
  password: string;
}

const Login = () => {
  const [user, setUser] = useState<Login>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
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
        },
      );
      if (!response.ok) {
        const errorData = await response.json();

        console.error("Login failed:", errorData);
        throw new Error(errorData || "Login failed");
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
      localStorage.setItem("user", JSON.stringify(userData));
      toast.success("Login successful!");
      router.push("/products");

      console.log("Login successful", data);
    } catch (error: any) {
      console.error("Error during login", error);
      toast.error("Failed to Login. Register first");
      setError(
        error.message ||
          "Login failed. Please check your credentials and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-2xl font-bold tracking-tight text-gray-900">
            The<span className="text-indigo-600">Store</span>
          </span>
          <h1 className="mt-4 text-2xl font-semibold text-gray-800">Welcome back</h1>
          <p className="mt-1 text-sm text-gray-500">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">
          <ToastContainer aria-label="toast-container" />
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="text"
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-medium rounded-lg text-sm transition-colors"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <p className="mt-5 text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <button
            className="text-indigo-600 font-medium hover:underline"
            onClick={(e) => {
              e.preventDefault();
              router.push("/auth/register");
            }}
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
