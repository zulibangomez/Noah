import { Checkbox, FormControlLabel, Grid, Grid2, Stack, Button  } from "@mui/material";
import { useEffect, useState } from "react";
import { FromEncuestaModal, useEncuestaStore } from "./index";
import { BotonActualizarEncuesta, BotonAddNew,  } from "../modelComponents";
import { useAuthStore, useUiStoreAsp } from "../../../../../hooks";
import { format } from "date-fns";
import { BotonAddEncuesta } from "../modelComponents/BotonAddEncuesta";
import { Link } from "react-router-dom";


export const EncuestaView = () => {
  const { listarEncuesta, encuetaEvents } = useEncuestaStore();
  const [selectedEncuesta, setSelectedEncuesta] = useState(null);
  const { isDateModalOpen, openDateModal, closeDateModal } = useUiStoreAsp();
 // const{ user }=useAuthStore();//se llama de mi useAuthStore importa
  // Al cargar el componente, obtenemos las encuestas
  ///const id_usuario = user.id_usuario; // se usa el operador de encadenamiento opcional para evitar errores si 'user' es undefined

  useEffect(() => {
    const fetchData = async () => {
    /// console.log('lista encuestaaakkkkkkkkk', encuetaEvents);
      try {
        await  listarEncuesta(); // Llamar a la función para listar las encuestas
      } catch (error) {
        console.log("Error al listar Encuesta", error);
      }
    };
    fetchData();
  }, [listarEncuesta]);

  const openModal = (evento) => {
    if (isDateModalOpen) {
      console.warn("El modal ya está abierto, evitando duplicación.");
      return;
    }
  
    console.log("Abriendo modal con encuesta:", evento);
    setSelectedEncuesta(evento);
    openDateModal();  // 🔹 Asegúrate de que esta función cambia correctamente el estado global
  };
  return (
    <Grid container spacing={2}>
     <Grid item xs={12}>
        <h1>Gestión de Encuestas</h1>
        <BotonAddEncuesta />
        {/* Renderizar el modal solo si está abierto */}
        {isDateModalOpen && (
          <FromEncuestaModal evento={selectedEncuesta} onClose={closeDateModal} />
        )}
      </Grid>
    

      {encuetaEvents && encuetaEvents.length > 0 ? (
        encuetaEvents.map((evento, index) => {
          const { id, nombre, fecha_creacion, fecha_inicio, fecha_fin, tipo_encuestas, estado } = evento;
          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <div className="p-4 bg-gray-100 rounded shadow">
                <nav>
                <Stack>
                <Button component={Link} to={`/adicionPregunta?id=${id}`}  variant="contained" color="primary">
                addEncuesta 
              </Button>
              </Stack>

                </nav>
             
                <h2 className="text-gray-700">{nombre}</h2>
                <p className="text-gray-700">Fecha de creación: {format(new Date(fecha_creacion), "yyyy-MM-dd ")}</p>
                <p className="text-gray-700">Fecha de inicio: {format(new Date(fecha_inicio), "yyyy-MM-dd HH:mm:ss")}</p>
                <p className="text-gray-700">Fecha de finalización:  {format(new Date(fecha_fin), "yyyy-MM-dd HH:mm:ss")}</p>
                <p className="text-gray-700">{tipo_encuestas}</p>
                <FormControlLabel
                  control={<Checkbox checked={estado === "Habilitado"} />}
                  label="Habilitado"
                />
                <br />
                <BotonActualizarEncuesta row={evento} onClick={() => openModal(evento)} />
              </div>
            </Grid>
          );
        })
      ) : (
        <Grid item xs={12}>
          <p>No hay encuestas disponibles</p>
        </Grid>
      )}
    </Grid>
  );
};