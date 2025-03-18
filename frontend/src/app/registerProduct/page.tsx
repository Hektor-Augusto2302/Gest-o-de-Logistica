import AdminRoute from "@/components/auth/AdminRoute";
import ProductForm from "@/components/ProductForm/ProductForm"

export default function Register () {
    return (
        <AdminRoute>
            <ProductForm />
        </AdminRoute>
    )
}