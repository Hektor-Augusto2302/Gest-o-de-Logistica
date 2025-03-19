"use client";

import PublicRoute from "@/components/auth/PublicRoute";
import Stock from "@/components/Stock/Stock";

export default function Profile () {

    return (
        <PublicRoute>
            <Stock />
        </PublicRoute>
    )
}