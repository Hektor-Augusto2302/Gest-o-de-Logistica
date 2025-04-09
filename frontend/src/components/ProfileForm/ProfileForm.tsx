import { useAuth } from "@/hooks/useAuth";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { uploads } from "@/utils/upload";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ProfileForm() {
    const { user, isLoading } = useAuth();
    const { updateUser, message }  = useUpdateUser();
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);

            if (user.profileImage) {
                setPreviewImage(`${uploads}/users/${user.profileImage}`);
            }
        }
    }, [user]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setProfileImage(e.target.files[0]);
            setPreviewImage(URL.createObjectURL(file));
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
            router.push("/");
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
                {message && 
                    <div className={message.type === "error" ? "bg-red-50" : "bg-green-50"}>
                        <p className={`text-center ${message.type === "error" ? "text-red-500" : "text-green-500"}`}>
                            {message.text}
                        </p>
                    </div>
                }
                <form onSubmit={handleUpdateProfile} className="w-full">
                {previewImage && (
                    <div className="flex justify-center mb-4">
                        <Image 
                        src={previewImage}
                        width={200}
                        height={200}
                        alt="Preview" 
                        className="w-40 h-40 object-cover rounded-full border border-gray-300"
                        quality={100}
                        />
                    </div>
                )}
                    <div className="flex flex-col">
                        <label className="label-form">Imagem de Perfil</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="flex flex-col mt-4">
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