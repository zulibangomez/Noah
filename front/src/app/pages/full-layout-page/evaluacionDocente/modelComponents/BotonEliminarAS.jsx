import { Grid, Button } from "@mui/material";
import Swal from 'sweetalert2';
import { DeleteOutlined } from "@mui/icons-material";

export const BotonEliminarAS = ({
  selectedRows = [], // Filas seleccionadas
  onDelete, // Función para eliminar los elementos
  confirmMessage = "¿Estás seguro?", // Mensaje de confirmación
  confirmText = "¿Quieres eliminar los elementos seleccionados?", // Texto de confirmación
  successMessage = "Los elementos seleccionados se eliminaron correctamente.", // Mensaje de éxito
  errorMessage = "Ocurrió un error al eliminar los elementos.", // Mensaje de error
}) => {
  const handleDelete = async () => {
    if (selectedRows.length === 0) {
      Swal.fire("Atención", "No hay elementos seleccionados para eliminar.", "warning");
      return;
    }

    // Confirmación con SweetAlert
    const confirmDelete = await Swal.fire({
      title: confirmMessage,
      text: `${confirmText} (${selectedRows.join(", ")})`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
    });

    if (!confirmDelete.isConfirmed) return;

    try {
      // Ejecutar la función de eliminación proporcionada para cada `id`
      await Promise.all(selectedRows.map((id) => onDelete(id)));
      Swal.fire("Eliminado", successMessage, "success");
    } catch (err) {
      console.error("Error eliminando elementos:", err);
      Swal.fire("Error", errorMessage, "error");
    }
  };

  return (
    <Grid container justifyContent="flex-end" alignItems="center">
      <Button
        size="small"
        variant="contained"
        color="btnDelete"
        onClick={handleDelete}
        startIcon={<DeleteOutlined />}
      >
        
      </Button>
    </Grid>
  );
};
