"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Cart } from "../cart/cart_logic";

const CartContext = createContext<any>(null);

export const CartProvider = ({ children }: any) => {
  const [cart, setCart] = useState(new Cart());

  const addToCart = (
    productId: number,
    name: string,
    price: number,
    quantity: number,
  ) => {
    const newCart = new Cart();
    newCart.items = [...cart.items];
    newCart.addProduct(productId, name, price, quantity);
    localStorage.setItem("cart", JSON.stringify(newCart));
    console.log("Cart after adding product:", newCart);
    setCart(newCart);
  };

  const removeFromCart = (productId: number) => {
    const newCart = new Cart();
    newCart.items = [...cart.items];
    newCart.removeProduct(productId);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
  };

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(new Cart(JSON.parse(storedCart).items));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  return useContext(CartContext);
}
