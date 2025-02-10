import { useEffect, useState } from "react";
import { usePreguntasStore } from "./";
import { Grid } from "@mui/material";
import DataTable from "react-data-table-component";
import { FormPreguntaModal } from "./FormPreguntaModal";
import { BotonAddNew, BotonDelete, BotonActualizar, BotonAddPregunta} from "../modelComponents";
import '../../../../../styles.css';
import { BotonEliminarAS } from "../modelComponents/BotonEliminarAS";

export const PreguntaView = () => {
  const { listPregunta, events, eliminarPregunta, setActivarEvent } = usePreguntasStore();
  const [selectedRows, setselectedRows] = useState([]);

  // Cargar las preguntas cuando se monta el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        await listPregunta();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [listPregunta]);

  // Columnas para la tabla
  const columns = events.length > 0
    ? [
        ...Object.keys(events[0])
          .filter((key) => key !== "id" && key !== "estado")
          .map((key) => ({
            name: key.charAt(0).toUpperCase() + key.slice(1),
            selector: (row) => row[key],
            sortable: true,
            wrap: true,
          })),
        {
          name: "Acciones",
          cell: (row) => <BotonActualizar row={row} setActivarEvent={setActivarEvent} />, // Botón para actualizar
          style: { minWidth: '30px', maxWidth: '150px' },
        },
        {
          name: "Conf Respuesta",
          cell: (row) => <BotonAddPregunta />, // Botón para agregar pregunta
          style: { minWidth: '30px', maxWidth: '150px' },
        }
      ]
    : [];

  // Filtrar los datos únicos
  const data = [...new Map(events.map((item) => [item.id, item])).values()];
  //console.log("Datos únicos:", data);

  // Maneja las filas seleccionadas
  const guardaRowSelected = (state) => {
    // Actualizar el estado con los `id`s de las filas seleccionadas
    setselectedRows(state.selectedRows.map(row => row.id));
   // console.log("Filas seleccionadas:", state.selectedRows); // Verifica si solo estás obteniendo los `id`s de las preguntas
  };

  return (
    <Grid container direction="column" sx={{ padding: 1 }}>
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={1}
        sx={{ marginBottom: 2 }}
      >
        {/* Botones en el extremo izquierdo */}
        <Grid item>
          <BotonEliminarAS
            selectedRows={selectedRows}
            onDelete={eliminarPregunta} // Se pasa la función para eliminar preguntas
            confirmMessage="¿Estás seguro de eliminar estas preguntas?"
            confirmText="¿Quieres eliminar las preguntas seleccionadas?"
            successMessage="Las preguntas se eliminaron correctamente."
            errorMessage="Ocurrió un error al eliminar las preguntas."
          />
        </Grid>

        {/* Botones en el extremo derecho */}
        <Grid item>
          <BotonAddNew />
          <FormPreguntaModal />
        </Grid>
      </Grid>

      <Grid>
        <DataTable
          columns={columns}
          data={data}
          pagination
          highlightOnHover
          noDataComponent="No hay datos disponibles"
          responsive
          selectableRows
          onSelectedRowsChange={guardaRowSelected} // Actualiza las filas seleccionadas
        />
      </Grid>
    </Grid>
  );
};