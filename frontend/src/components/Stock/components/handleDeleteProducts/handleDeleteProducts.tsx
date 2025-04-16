import Swal from "sweetalert2";

export const handleDeleteProducts = async (
  id: string,
  deleteProduct: (id: string) => Promise<void>
) => {
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
    await deleteProduct(id);
    await Swal.fire("Excluído!", "A movimentação foi excluída com sucesso.", "success");
  }
};