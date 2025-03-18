"use client";

interface FormProps {
    handleRegisterProduct: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    name: string;
    setName: (value: string) => void;
    email: string;
    setEmail: (value: string) => void;
    password: string;
    setPassword: (value: string) => void;
    confirmPassword: string;
    setConfirmPassword: (value: string) => void;
}

export default function Form({ 
    handleRegisterProduct,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
}: FormProps) {

    return (
        <form onSubmit={handleRegisterProduct} className="w-full">
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
            <div className="flex justify-center mt-6">
                <button type="submit" className="w-full button-form">
                    Cadastrar Produto
                </button>
            </div>
        </form>
    );
}