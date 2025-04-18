"use client";

import { useState } from "react";
import Form from "./components/Form/Form";
import { useRegisterProduct } from "@/hooks/useRegisterProduct";
import { useAuth } from "@/hooks/useAuth";
import { INewProduct } from "@/interfaces/INewProduct";

export default function ProductForm() {

    const { registerProduct, message } = useRegisterProduct();
    const { user } = useAuth();

    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [description, setDescription] = useState("");
    const [costPrice, setCostPrice] = useState(0);
    const [salePrice, setSalePrice] = useState(0);
    const [unit, setUnit] = useState("");
    const [category, setCategory] = useState("");
    const [suppliers, setSuppliers] = useState("");
    const [minStock, setMinStock] = useState(1);

    const handleRegisterProduct = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!user) {
            console.error("Usuário não autenticado");
            return;
        }

        const newProduct: INewProduct = {
            name,
            code,
            quantity,
            description,
            costPrice,
            salePrice,
            unit,
            category,
            suppliers: suppliers.split(","),
            minStock,
            createdBy: user?._id || "",
        };
        
        await registerProduct(newProduct);
    };

    return (
        <div className="flex items-center justify-center min-h-screen w-full px-4 user-form">
            <div className="flex flex-col w-full max-w-lg md:max-w-2xl p-6 sm:p-8 rounded-lg shadow-lg">
                <h2 className="text-black text-center text-lg sm:text-xl font-semibold mb-4">
                    Cadastrar Produto
                </h2>
                {message && 
                    <div className={message.type === "error" ? "bg-red-50" : "bg-green-50"}>
                        <p className={`text-center ${message.type === "error" ? "text-red-500" : "text-green-500"}`}>
                            {message.text}
                        </p>
                    </div>
                }
                <Form
                    handleRegisterProduct={handleRegisterProduct}
                    name={name}
                    setName={setName}
                    code={code}
                    setCode={setCode}
                    quantity={quantity}
                    setQuantity={setQuantity}
                    description={description}
                    setDescription={setDescription}
                    costPrice={costPrice}
                    setCostPrice={setCostPrice}
                    salePrice={salePrice}
                    setSalePrice={setSalePrice}
                    unit={unit}
                    setUnit={setUnit}
                    category={category}
                    setCategory={setCategory}
                    suppliers={suppliers}
                    setSuppliers={setSuppliers}
                    minStock={minStock}
                    setMinStock={setMinStock}
                />
            </div>
        </div>
    );
}