"use client";

import { useStockMovement } from "@/hooks/useCreateMovement";
// import { IMovement } from "@/interfaces/IMovement";
import { useEffect } from "react";
import ListTable from "./components/ListTable/ListTable";
// import ModalList from "./components/ModalList/ModalList";
import { useDeleteMovement } from "@/hooks/useDeleteMovement";

export default function ListMovement() {
  const { getMovements, movements, setMovements } = useStockMovement();
  const { deleteMovement, message } = useDeleteMovement(setMovements);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getMovements();
  }, [getMovements]);

  return (
    <div className="flex-column items-center justify-center min-h-screen w-full px-4 user-form">
        <div className="flex justify-between items-center mx-3 pb-3 border-b border-gray-300 max-sm:flex-col max-sm:items-start max-sm:gap-3">
            <h1 className="text-blue-500 font-semibold">Movimentações</h1>
            {message && (
                <div className={message.type === "error" ? "bg-red-50" : "bg-green-50"}>
                    <p
                        className={`text-center ${
                            message.type === "error" ? "text-red-500" : "text-green-500"
                        }`}
                    >
                        {message.text}
                    </p>
                </div>
            )}
        </div>

      <ListTable movements={movements} onDelete={deleteMovement} />

      {/* <ModalList
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen} 
            /> */}
    </div>
  );
}
