import AdminRoute from "@/components/auth/AdminRoute";
import Inventory from "@/components/Inventory/Inventory";

export default function InventoryPage () {
    return (
        <AdminRoute>
            <Inventory />
        </AdminRoute>
    )
}