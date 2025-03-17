"use client"

import PublicRoute from "@/components/auth/PublicRoute";

export default function Home() {

  return (
    <PublicRoute>
      <h1>Hello World</h1>
    </PublicRoute>
  );
}