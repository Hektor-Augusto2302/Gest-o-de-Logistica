"use client";

import PublicRoute from "@/components/auth/PublicRoute";
import Stock from "@/components/Stock/Stock";

export default function StockPage () {

    return (
        <PublicRoute>
            <Stock />
        </PublicRoute>
    )
}