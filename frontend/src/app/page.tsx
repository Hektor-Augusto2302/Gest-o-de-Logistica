"use client"

import PublicRoute from "@/components/auth/PublicRoute";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {

  const { user } = useAuth();

  return (
    <PublicRoute>
      <h1 className="text-center">Seja Bem-Vindo {user ? user.name : "Visitante"}</h1>
    </PublicRoute>
  );
}