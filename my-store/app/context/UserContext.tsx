"use client";
import { Children, createContext, useContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { useActionData } from "react-router-dom";

const UserContext = createContext(null);
const router = useRouter();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider() {
  const [user, setUser] = useState();

  const login = () => {
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

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
      }
      setUser(user);
    };

    const logout = () => {
      setUser(null);
    };

    const value = {user, login, logout}

return(
 <UserContext.Provider value= {value}>
{children}
 </UserContext.Provider>
)

};
}
