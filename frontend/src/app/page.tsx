"use client";

import { useEffect } from "react";
import PublicRoute from "@/components/auth/PublicRoute";
import { useAuth } from "@/hooks/useAuth";
import { useGetProducts } from "@/hooks/useGetProducts";

export default function Home() {
  const { user } = useAuth();
  const { products, getProducts, isLoading, message } = useGetProducts();

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <PublicRoute>
      <h1 className="text-center">
        Seja Bem-Vinda (o) {user ? user.name : "Visitante"}
      </h1>
      {isLoading && <p>Carregando produtos...</p>}
      {message && <p>{message.text}</p>}
      <ul>
        {products?.map((product) => (
          <li key={product._id}>{product.name}</li>
        ))}
      </ul>
    </PublicRoute>
  );
}
