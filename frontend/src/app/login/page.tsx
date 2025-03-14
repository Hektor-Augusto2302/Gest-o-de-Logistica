import PrivateRoute from "@/components/auth/PrivateRoute";
import LoginForm from "@/components/LoginForm/LoginForm";

export default function Login () {
    return (
        <PrivateRoute>
            <LoginForm />
        </PrivateRoute>
    )
}