import AdminRoute from "@/components/auth/AdminRoute";
import ListMovement from "@/components/ListMovements/ListMovements";

export default function ListMovementPage () {
    return (
        <AdminRoute>
            <ListMovement />
        </AdminRoute>
    )
}