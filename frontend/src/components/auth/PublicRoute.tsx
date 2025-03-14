"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";

interface PublicRouteProps {
    children: ReactNode;
}

export default function PublicRoute({ children }: PublicRouteProps) {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.push("/login");
        }
    }, [user, isLoading, router]);

    if (isLoading) return null;

    return user ? <>{children}</> : null;
}