"use client"

import PublicRoute from "@/components/auth/PublicRoute";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { logout } = useAuth();

  return (
    <PublicRoute>
      <h1>Hello World</h1>
    </PublicRoute>
  );
}