"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";

interface AdminRouteProps {
    children: ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading) {
            if (!user) {
                router.push("/login");
            } else if (user.role !== "admin") {
                router.push("/");
            }
        }
    }, [user, isLoading, router]);

    if (isLoading) return null;

    return user && user.role === "admin" ? <>{children}</> : null;
}