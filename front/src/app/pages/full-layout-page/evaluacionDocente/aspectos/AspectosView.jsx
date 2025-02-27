import { Box, Grid2, Typography } from "@mui/material"
import { BotonActualizar, BotonAddNew, BotonDelete } from "../modelComponents";
import { FormAspectoModal, useAspectoStore } from "../aspectos";
import { useEffect, useMemo, useState } from "react";
import DataTable from 'react-data-table-component';
import './../../../../../styles.css'
import { BotonEliminarAS } from "../modelComponents/BotonEliminarAS";
import { MenusGeneralSist } from "../../../../../shared/MenusGeneralSist";
import CheckIcon from '@mui/icons-material/Check';
import BackHandIcon from '@mui/icons-material/BackHand';

//import {FormAspectoModal} from "./";

export const AspectosView = () => {
  const { listaAspectos, events, deleteEventoAspecto } = useAspectoStore();//se llaman del useAspectoStore
  const [selectedRows, setSelectedRows] = useState([]); // Estado para filas seleccionadas 

/////para listar 



useEffect(() => {
  let isMounted = true;
  const fetchData = async () => {
    try {
      const data = await listaAspectos();
      if (isMounted) {
        console.log('Lista de aspectos:', data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
  return () => { isMounted = false; }; // Evita actualizar si el componente se desmonta
}, [listaAspectos]);

  useEffect(() => {
    setSelectedRows([]);
  }, [events]);

  const handleCheckboxChange = (e, row) => {
    const { checked, value } = e.target;
    console.log('Checkbox seleccionado:', value);

    setSelectedRows((prev) => {
      if (checked) {
        // Agrega el ID si está seleccionado
        return [...prev, row.id];
      } else {
        // Elimina el ID si está desmarcado
        return prev.filter((id) => id !== row.id);
      }
    });
  };
  const handleDelete = async () => {
    if (selectedRows.length === 0) return;
    try {
      await deleteEventoAspecto(selectedRows); // Asegurar que es async
      await listaAspectos(); // Refrescar la tabla
    } catch (error) {
      console.error("Error al eliminar aspectos:", error);
    }
  };

   const columns = [
            {
              name: "Select",
              cell: (row) => (
                <input
                  type="checkbox"
                  value={row.id}
                  checked={selectedRows.includes(row.id)} // Verifica si el ID está en el estado
                  onChange={(e) => handleCheckboxChange(e, row)}
                />
              ),
              ignoreRowClick: true,
              style: { minWidth: '50px', maxWidth: '90px' }
             
              },
            ...(
              events && events.length > 0
                ? Object.keys(events[0])
                    .filter((key) => key !== "id" && key ) // Filtra las columnas no deseadas
                    .map((key) => ({
                      name: key.charAt(0).toUpperCase() + key.slice(1), // Capitaliza el nombre
                      selector: (row) => row[key], // Accede dinámicamente al valor
                      wrap: true,
                      sortable: true,
                    }))
                : []
            ),
            {
              name: "Acciones",
              cell: (row) => <BotonActualizar row={row} />, // boton para actualizar 
              ignoreRowClick: true,
              
              style: { minWidth: '30px', maxWidth: '150px' },
              
            },
    
          ];
          // const datosAspectotabla = useMemo(() => {
          //   return [...new Map(events.map(item => [item.id, item])).values()];
          // }, [events]);

  return ( 
    <Box 
    direction="column"
    sx={{
      padding: 2, // Espaciado interno
    }}>
        <><MenusGeneralSist /></>
         <Box
         sx={{ width: "100%", textAlign: "center", minHeight: "60px" }} // Asegura el ancho y la alineación
         >
         <Typography variant="h4" component="h5">
            Aspectos 
          </Typography>
         </Box>
      
           <Box
            display="flex"
            flexDirection="row"
            justifyContent="flex-end"
            alignItems="center"
            gap={0.1} // Ajusta el espacio entre los botones
            sx={{ width: "100%", minHeight: "100px", paddingRight: "16px" }} // Agrega padding derecho si es necesario
           >
            {/* Botones en el extremo izquierdo */}
         
            <BotonEliminarAS selectedRows={selectedRows} 
            onDelete={handleDelete}
            events={events} // Pasa la lista de eventos
            />
               {/* Botones en el extremo derecho */}
              <BotonAddNew />

              
              <FormAspectoModal/>
            </Box>
            <Box sx={{ flex: 1, height: "calc(100vh - 120px)" }}>
          <DataTable
          
            columns={columns}
            data={events} 
            highlightOnHover
            noDataComponent="No hay datos disponibles" // Personaliza el mensaje si no hay datos
            //  selectableRows
            //  onSelectedRowsChange={data=>console.log('selector', data) }
            fixedHeader
            responsive
            className="mi-tabla"
            pagination   
          />
          </Box>  
    </Box> 
);
};