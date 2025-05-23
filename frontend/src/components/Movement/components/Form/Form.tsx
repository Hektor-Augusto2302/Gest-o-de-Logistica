"use client";

interface FormProps {
  handleRegisterMovement: (
    e: React.FormEvent<HTMLFormElement>
  ) => Promise<void>;
  product: string;
  setProduct: React.Dispatch<React.SetStateAction<string>>;
  movementQuantity: number;
  setMovementQuantity: React.Dispatch<React.SetStateAction<number>>;
  movementType: "entrada" | "saida";
  setMovementType: React.Dispatch<React.SetStateAction<"entrada" | "saida">>;
  isLoading: boolean;
  message: { text: string; type: "success" | "error" } | null;
}

export default function Form({
  handleRegisterMovement,
  product,
  setProduct,
  movementQuantity,
  setMovementQuantity,
  movementType,
  setMovementType,
  isLoading,
  message,
}: FormProps) {
  return (
    <div className="flex items-center justify-center min-h-screen w-full px-4">
      <div className="flex flex-col w-full max-w-sm sm:max-w-md p-4 sm:p-6 rounded-lg shadow-lg">
        <h2 className="text-black text-center text-lg sm:text-xl font-semibold mb-4">
          Registrar Movimento de Estoque
        </h2>
        {message && (
          <div
            className={message.type === "error" ? "bg-red-50" : "bg-green-50"}
          >
            <p
              className={`text-center ${
                message.type === "error" ? "text-red-500" : "text-green-500"
              }`}
            >
              {message.text}
            </p>
          </div>
        )}
        <form onSubmit={handleRegisterMovement} className="w-full">
          <div className="flex flex-col">
            <label className="label-form">Código ou Nome do Produto</label>
            <input
              type="text"
              className="input-form"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            />
          </div>
          <div className="flex flex-col mt-4">
            <label className="label-form">Quantidade Movimentada</label>
            <input
              type="number"
              className="input-form"
              min="1"
              value={movementQuantity}
              onChange={(e) => setMovementQuantity(Number(e.target.value))}
            />
          </div>
          <div className="flex flex-col mt-4">
            <label className="label-form">Tipo de Movimento</label>
            <select
              className="select-form cursor-pointer"
              value={movementType}
              onChange={(e) =>
                setMovementType(e.target.value as "entrada" | "saida")
              }
            >
              <option value="entrada">Entrada</option>
              <option value="saida">Saída</option>
            </select>
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="w-full button-form"
              disabled={isLoading}
            >
              {isLoading ? "Registrando..." : "Registrar Movimento"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
