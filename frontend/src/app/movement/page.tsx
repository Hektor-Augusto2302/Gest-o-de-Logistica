"use client";

import PublicRoute from "@/components/auth/PublicRoute";
import Movement from "@/components/Movement/Movement";

export default function MovementPage () {

    return (
        <PublicRoute>
            <Movement />
        </PublicRoute>
    )
}