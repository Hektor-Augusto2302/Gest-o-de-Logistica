"use client";

import PublicRoute from "@/components/auth/PublicRoute";
import ProfileForm from "@/components/ProfileForm/ProfileForm";

export default function Profile () {

    return (
        <PublicRoute>
            <ProfileForm />
        </PublicRoute>
    )
}