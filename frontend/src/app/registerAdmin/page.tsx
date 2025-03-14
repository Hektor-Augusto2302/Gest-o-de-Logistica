import PublicRoute from "@/components/auth/PublicRoute";
import RegisterFormAdmin from "@/components/RegisterAdminForm/RegisterAdminForm";

export default function Register () {
    return (
        <PublicRoute>
            <RegisterFormAdmin />
        </PublicRoute>
    )
}