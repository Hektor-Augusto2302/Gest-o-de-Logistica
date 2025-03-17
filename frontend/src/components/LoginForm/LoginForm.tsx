"use client"

import Image from "next/image";
import Illustration from "../../../public/login-illustration.svg";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function LoginForm() {

    const { login, message } = useAuth()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsSubmitting(true);

        const user = {
            email,
            password
        }

        await login(user);

        setTimeout(() => {
            setIsSubmitting(false);
        }, 3000);
    }

    return (
        <div className="flex items-center justify-center h-screen px-4 py-8 user-form">
            <div className="flex flex-col lg:flex-row w-full max-w-[1300px] overflow-hidden">
                <div className="lg:w-[30%] p-6 md:p-10 flex flex-col justify-center">
                    {message && 
                        <div className={message.type === "error" ? "bg-red-50" : "bg-green-50"}>
                            <p className={`text-center ${message.type === "error" ? "text-red-500" : "text-green-500"}`}>
                                {message.text}
                            </p>
                        </div>
                    }
                    <h1 className="text-3xl font-bold">Login</h1>
                    <p className="text-gray-600 mt-2">
                        Veja seu crescimento e obtenha suporte
                    </p>
                    <form onSubmit={handleLogin} className="mt-6">
                        <div className="flex flex-col">
                            <label className="label-form">E-mail</label>
                            <input 
                                type="email" 
                                name="email" 
                                className="input-form" 
                                value={email || ""}
                                onChange={(e) => setEmail(e.target.value)}
                                required />
                        </div>
                        <div className="flex flex-col mt-4">
                            <label className="label-form">Senha</label>
                            <input 
                                type="password" 
                                name="password" 
                                className="input-form" 
                                value={password || ""}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                            />
                        </div>
                        <div className="flex justify-center mt-6">
                        <button
                                type="submit"
                                className="w-full button-form"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Entrando..." : "Entrar"}
                            </button>
                        </div>
                    </form>
                </div>
                <div className="w-full lg:w-[70%] flex items-center justify-center mt-6 lg:mt-0">
                    <Image
                        src={Illustration}
                        alt="Ilustração de login"
                        className="md:w-full md:max-w-none w-[90%] max-w-[500px] h-auto"
                    />
                </div>
            </div>
        </div>
    );
}