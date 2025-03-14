"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";

interface PrivateRouteProps {
    children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && user) {
            router.push("/");
        }
    }, [user, isLoading, router]);

    if (isLoading) return null;

    return !user ? <>{children}</> : null;
}
