import Swal from "sweetalert2";
import { IMovement } from "@/interfaces/IMovement";

export const handleDeleteSelected = async (
  selectedMovements: IMovement[],
  deleteMovement: (id: string) => Promise<void>,
  clearSelection: () => void
) => {
  if (selectedMovements.length === 0) {
    await Swal.fire("Nenhuma movimentação selecionada", "Selecione pelo menos uma para excluir.", "info");
    return;
  }

  const result = await Swal.fire({
    title: "Tem certeza?",
    text: "Você não poderá reverter isso!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sim, excluir!",
    cancelButtonText: "Cancelar",
  });

  if (result.isConfirmed) {
    await Promise.all(selectedMovements.map((m) => deleteMovement(m._id)));
    clearSelection();

    await Swal.fire("Excluído!", "As movimentações foram excluídas com sucesso.", "success");
  }
};