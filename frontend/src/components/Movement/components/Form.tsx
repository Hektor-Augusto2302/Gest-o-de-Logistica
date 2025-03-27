"use client";

interface FormProps {
    handleRegisterMovement: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    product: string;
    setProduct: React.Dispatch<React.SetStateAction<string>>;
    movementQuantity: number;
    setMovementQuantity: React.Dispatch<React.SetStateAction<number>>;
    unitPrice: number;
    setUnitPrice: React.Dispatch<React.SetStateAction<number>>;
    totalPrice: number;
    setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
    movementType: "entrada" | "saida";
    setMovementType: React.Dispatch<React.SetStateAction<"entrada" | "saida">>;
    date: string;
    setDate: React.Dispatch<React.SetStateAction<string>>;
    isLoading: boolean;
}

export default function Form({ 
    handleRegisterMovement,
    product, setProduct,
    movementQuantity, setMovementQuantity,
    unitPrice, setUnitPrice,
    movementType, setMovementType,
    date, setDate,
    totalPrice, setTotalPrice
}: FormProps) {

    // Atualizar o totalPrice quando quantity ou unitPrice mudarem
    const handlePriceCalculation = () => {
        setTotalPrice(movementQuantity * unitPrice);
    };

    return (
        <form onSubmit={handleRegisterMovement} className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <label className="label-form">Produto</label>
                    <input
                        type="text"
                        className="input-form"
                        value={product}
                        onChange={(e) => setProduct(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="label-form">Quantidade Movimentada</label>
                    <input
                        type="number"
                        className="input-form"
                        value={movementQuantity}
                        onChange={(e) => {
                            setMovementQuantity(Number(e.target.value));
                            handlePriceCalculation(); // Atualiza o preço total sempre que a quantidade mudar
                        }}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="label-form">Preço Unitário</label>
                    <input
                        type="number"
                        className="input-form"
                        value={unitPrice}
                        onChange={(e) => {
                            setUnitPrice(Number(e.target.value));
                            handlePriceCalculation(); // Atualiza o preço total sempre que o preço unitário mudar
                        }}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="label-form">Preço Total</label>
                    <input
                        type="number"
                        className="input-form"
                        value={totalPrice}
                        readOnly
                    />
                </div>
                <div className="flex flex-col">
                    <label className="label-form">Tipo de Movimento</label>
                    <select
                        className="input-form"
                        value={movementType}
                        onChange={(e) => setMovementType(e.target.value as "entrada" | "saida")}
                    >
                        <option value="entrada">Entrada</option>
                        <option value="saida">Saída</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <label className="label-form">Data</label>
                    <input
                        type="date"
                        className="input-form"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex justify-center mt-6">
                <button type="submit" className="w-full button-form">
                    Registrar Movimento
                </button>
            </div>
        </form>
    );
}