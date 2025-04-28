import AdminRoute from "@/components/auth/AdminRoute";
import ProductForm from "@/components/ProductForm/ProductForm"

export default function RegisterProduct () {
    return (
        <AdminRoute>
            <ProductForm />
        </AdminRoute>
    )
}