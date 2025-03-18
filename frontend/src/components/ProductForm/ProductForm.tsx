"use client";

import { useState } from "react";
import Form from "./components/Form";

export default function ProductForm() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegisterProduct = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <div className="flex items-center justify-center min-h-screen w-full px-4 user-form">
            <div className="flex flex-col w-full max-w-sm sm:max-w-md p-4 sm:p-6 rounded-lg shadow-lg">
                <h2 className="text-black text-center text-lg sm:text-xl font-semibold mb-4">
                    Cadastrar Produto
                </h2>
                {/* {message && (
                    <div
                        className={`text-center p-2 mb-3 rounded ${
                            message.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
                        }`}
                    >
                        {message.text}
                    </div>
                )} */}
                <Form
                    handleRegisterProduct={handleRegisterProduct}
                    name={name}
                    setName={setName}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    confirmPassword={confirmPassword}
                    setConfirmPassword={setConfirmPassword}
                />
            </div>
        </div>
    );
}