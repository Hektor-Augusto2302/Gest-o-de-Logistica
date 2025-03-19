"use client";

interface FormProps {
    handleRegisterProduct: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    code: string;
    setCode: React.Dispatch<React.SetStateAction<string>>;
    quantity: number;
    setQuantity: React.Dispatch<React.SetStateAction<number>>;
    description: string;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
    costPrice: number;
    setCostPrice: React.Dispatch<React.SetStateAction<number>>;
    salePrice: number;
    setSalePrice: React.Dispatch<React.SetStateAction<number>>;
    unit: string;
    setUnit: React.Dispatch<React.SetStateAction<string>>;
    category: string;
    setCategory: React.Dispatch<React.SetStateAction<string>>;
    suppliers: string;
    setSuppliers: React.Dispatch<React.SetStateAction<string>>;
    minStock: number;
    setMinStock: React.Dispatch<React.SetStateAction<number>>;
}

export default function Form({ 
    handleRegisterProduct,
    name, setName,
    code, setCode,
    quantity, setQuantity,
    description, setDescription,
    costPrice, setCostPrice,
    salePrice, setSalePrice,
    unit, setUnit,
    category, setCategory,
    suppliers, setSuppliers,
    minStock, setMinStock,
}: FormProps) {

    return (
        <form onSubmit={handleRegisterProduct} className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <label className="label-form">Nome</label>
                    <input
                        type="text"
                        className="input-form"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="label-form">Código</label>
                    <input
                        type="text"
                        className="input-form"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="label-form">Quantidade</label>
                    <input
                        type="number"
                        className="input-form"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="label-form">Descrição</label>
                    <input
                        type="text"
                        className="input-form"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="label-form">Preço de Custo</label>
                    <input
                        type="number"
                        className="input-form"
                        value={costPrice}
                        onChange={(e) => setCostPrice(Number(e.target.value))}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="label-form">Preço de Venda</label>
                    <input
                        type="number"
                        className="input-form"
                        value={salePrice}
                        onChange={(e) => setSalePrice(Number(e.target.value))}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="label-form">Unidade</label>
                    <input
                        type="text"
                        className="input-form"
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="label-form">Categoria</label>
                    <input
                        type="text"
                        className="input-form"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="label-form">Fornecedores</label>
                    <input
                        type="text"
                        className="input-form"
                        value={suppliers}
                        onChange={(e) => setSuppliers(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="label-form">Estoque Mínimo</label>
                    <input
                        type="number"
                        className="input-form"
                        value={minStock}
                        onChange={(e) => setMinStock(Number(e.target.value))}
                    />
                </div>
            </div>

            <div className="flex justify-center mt-6">
                <button type="submit" className="w-full button-form">
                    Cadastrar Produto
                </button>
            </div>
        </form>
    );
}