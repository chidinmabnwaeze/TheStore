"use client";

import { useEffect, useState } from "react";
import { Cart } from "./cart_logic";
import { useCart } from "../context/CartContext";

interface CartItem {
  productId: number;
  name: string;
  quantity: number;
  price: number;
}

export default function CartPage() {
  const { addToCart, cart, removeFromCart } = useCart();

  return (
    <div>
      {cart.items.length > 0 ? (
        <div className="h-screen flex flex-col justify-center items-center bg-zinc-50 font-sans dark:bg-black">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Cart ({cart.items.length})
          </h1>

          <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
            {cart.items.map((item: CartItem) => (
              <div
                key={item.productId}
                className="flex items-center justify-between mb-4"
              >
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {item.name}
                  </h2>
                  <p className="text-gray-500">${item.price.toFixed(2)}</p>
                </div>

                <div className="flex items-center">
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    className="w-16 p-1 border rounded-md text-center"
                  />
                  <button
                    className="ml-4 px-3 py-1 bg-red-500 text-white rounded-md"
                    onClick={() => removeFromCart(item.productId)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="h-screen flex flex-col justify-center items-center bg-zinc-50 font-sans dark:bg-black">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Cart</h1>
          <p className="text-lg text-gray-500 mb-10">
            Your cart is currently empty.
          </p>
        </div>
      )}
    </div>
  );
}
