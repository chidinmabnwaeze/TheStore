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
    <div className="flex flex-col justify-center items-center h-screen">
      <div>
        <h1 className="text-2xl">Register</h1>
      </div>
      <ToastContainer aria-label="toast-container" />
      <form
        className="p-5 w-2/4 border border-gray-100 "
        onSubmit={handleSubmit}
      >
        <div className="p-5 flex items-center">
          <label htmlFor="name" className="w-1/4">
            Name
          </label>
          <input
            type="text"
            placeholder="Name"
            className="p-3 m-5 w-full border border-gray-100"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>

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
          Register
        </button>
      </form>
        <h2>
        Have an account?{" "}
        <a href="/auth/login" className="hover:text-red-600">
          Login
        </a>
      </h2>
    </div>
  );
}
