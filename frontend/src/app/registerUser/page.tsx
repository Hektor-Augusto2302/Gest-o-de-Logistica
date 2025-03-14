import PrivateRoute from "@/components/auth/PrivateRoute";
import RegisterUserForm from "@/components/RegisterUserForm/RegisterUserForm";

export default function Register () {
    return (
        <PrivateRoute>
            <RegisterUserForm />
        </PrivateRoute>
    )
}