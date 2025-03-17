import AdminRoute from "@/components/auth/AdminRoute";
import RegisterFormAdmin from "@/components/RegisterAdminForm/RegisterAdminForm";

export default function Register () {
    return (
        <AdminRoute>
            <RegisterFormAdmin />
        </AdminRoute>
    )
}