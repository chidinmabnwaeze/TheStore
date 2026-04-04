"use client";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

interface Register {
  email: string;
  name: string;
  password: string;
  role: string;
  avatar: string;
}

export default function RegisterPage() {
  const [user, setUser] = useState<Register>({
    email: "",
    name: "",
    password: "",
    role: "customer",
    avatar: "https://i.pravatar.cc/300",
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          name: user.name,
          password: user.password,
          role: user.role,
          avatar: user.avatar,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        toast.error("Registration failed. Please try again.");
        console.error("Registration failed:", errorData);
        throw new Error("Registration failed");
      }
      const data = await response.json();
      toast.success("Registration successful! You can now log in.");
      //  console.log("Redirecting to login...");
      router.push("/auth/login");
      console.log("Registration successful", data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-2xl font-bold tracking-tight text-gray-900">
            The<span className="text-indigo-600">Store</span>
          </span>
          <h1 className="mt-4 text-2xl font-semibold text-gray-800">Create an account</h1>
          <p className="mt-1 text-sm text-gray-500">Start shopping in minutes</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">
          <ToastContainer aria-label="toast-container" />
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
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
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg text-sm transition-colors"
            >
              Create Account
            </button>
          </form>
        </div>

        <p className="mt-5 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a href="/auth/login" className="text-indigo-600 font-medium hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
