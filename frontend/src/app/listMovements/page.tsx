import AdminRoute from "@/components/auth/AdminRoute";
import ListMovement from "@/components/ListMovements/ListMovements";

export default function Register () {
    return (
        <AdminRoute>
            <ListMovement />
        </AdminRoute>
    )
}