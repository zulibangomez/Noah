import { Grid2 } from "@mui/material";
import { useEffect, useState } from "react";
import { FromEncuestaModal, useEncuestaStore } from "./index";
import { BotonActualizarEncuesta, BotonAddNew,  } from "../modelComponents";
import { useAuthStore, useUiStoreAsp } from "../../../../../hooks";

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
    setSelectedEncuesta(evento);  // Guarda la encuesta seleccionada
    closeDateModal(); // Cierra el modal antes de abrirlo
    openDateModal(); // Luego lo abres
  };

  return (
    <Grid2>
      <h1>Gestion de Encuestas </h1>
      <BotonAddNew />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 animate-fadeIn">
        {encuetaEvents && encuetaEvents.length > 0 ? (
          encuetaEvents.map((evento, index) => {
            const { id_encuesta, nombre, fecha_creacion, fecha_inicio, fecha_fin, tipo_encuestas, estado } = evento;
            return (
              <div key={index} className="p-4 bg-gray-100 rounded shadow">
                <h2 className="text-gray-700">{nombre}</h2>
                <p className="text-gray-700">{fecha_creacion}</p>
                <p className="text-gray-700">{fecha_inicio}</p>
                <p className="text-gray-700">{fecha_fin}</p>
                <p className="text-gray-700">{tipo_encuestas}</p>
                <p className="text-gray-700">{estado}</p>
                <br />
                <BotonActualizarEncuesta row={evento} onClick={() => openModal(evento)} />
              </div>
            );
          })
        ) : (
          <p>No hay encuestas disponibles</p>
        )}
      </div>

      {/* Mostrar el modal solo si está abierto y pasar la encuesta seleccionada */}
      {isDateModalOpen && <FromEncuestaModal evento={selectedEncuesta} onClose={closeDateModal} />}
    </Grid2>
  );
};