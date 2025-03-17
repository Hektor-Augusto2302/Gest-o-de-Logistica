import { useAuth } from "@/hooks/useAuth";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { useEffect, useState } from "react";

export default function ProfileForm() {
    const { user, isLoading } = useAuth();
    const { updateUser }  = useUpdateUser();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setProfileImage(e.target.files[0]);
        }
    };

    const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!user?._id) {
            console.error("Usuário não autenticado");
            return;
        }

        setIsSubmitting(true);

        const formData = new FormData();
        formData.append("name", name);
        formData.append("password", password);
        formData.append("confirmPassword", confirmPassword);

        if (profileImage) {
            formData.append("profileImage", profileImage);
        }

        await updateUser(user._id, formData);

        setTimeout(() => {
            setIsSubmitting(false);
        }, 3000);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen w-full px-4 user-form">
            <div className="flex flex-col w-full max-w-sm sm:max-w-md p-4 sm:p-6 rounded-lg shadow-lg">
                <h2 className="text-black text-center text-lg sm:text-xl font-semibold mb-4">
                    Atualizar Perfil
                </h2>
                <form onSubmit={handleUpdateProfile} className="w-full">
                    <div className="flex flex-col">
                        <label className="label-form">Nome</label>
                        <input
                            type="text"
                            name="name"
                            className="input-form"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col mt-4">
                        <label className="label-form">E-mail</label>
                        <input
                            type="email"
                            name="email"
                            className="input-form"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            readOnly
                        />
                    </div>
                    <div className="flex flex-col mt-4">
                        <label className="label-form">Senha</label>
                        <input
                            type="password"
                            name="password"
                            className="input-form"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col mt-4">
                        <label className="label-form">Confirmar Senha</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            className="input-form"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col mt-4">
                        <label className="label-form">Imagem de Perfil</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className="w-full button-form"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Atualizando..." : "Atualizar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}