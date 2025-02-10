import { Grid, Grid2, Typography } from "@mui/material"
import { BotonActualizar, BotonAddNew, BotonDelete } from "../modelComponents";
import { FormAspectoModal, useAspectoStore } from "../aspectos";
import { useEffect, useMemo, useState } from "react";
import DataTable from 'react-data-table-component';
import './../../../../../styles.css'
import { BotonEliminarAS } from "../modelComponents/BotonEliminarAS";
//import {FormAspectoModal} from "./";


export const AspectosView = () => {
  const { listaAspectos, events, deleteEventoAspecto } = useAspectoStore();//se llaman del useAspectoStore
  const [selectedRows, setSelectedRows] = useState([]); // Estado para filas seleccionadas 

/////para listar 
  useEffect(() => {
    const fetchData = async () => {
      try {
        await listaAspectos(); //listaAspectos función que retorna una promesa.
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);//solo se ejecuta una vez

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
                    .filter((key) => key !== "id" && key !== "estado") // Filtra las columnas no deseadas
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

  
    <Grid  container
    direction="column"
    sx={{
     // height: "100vh", // Altura completa de la pantalla
     // width: "100%", // Ancho completo
     // overflow: "hidden", // Evita desbordamientos
      padding: 2, // Espaciado interno
    }}>
     <Grid
            container
            direction="row"
            justifyContent="flex-end" // Ubica los elementos en los extremos
            alignItems="center" // Centra verticalmente
            spacing={1}
            sx={{ marginBottom: 2 }}
          >
            {/* Botones en el extremo izquierdo */}
            <Grid item>
            <BotonEliminarAS selectedRows={selectedRows} 
            onDelete={deleteEventoAspecto}
            events={events} // Pasa la lista de eventos
      
            />
            </Grid>

            {/* Botones en el extremo derecho */}
            <Grid item>
              <BotonAddNew/>
              <FormAspectoModal/>
             
            </Grid>
          </Grid>
          <Grid
           item
           sx={{
             flex: 1, // Hace que este contenedor use todo el espacio disponible
            height: "calc(100vh - 120px)", // Ajusta la altura si es necesario (restando los botones)
            
            }}
          >
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

          </Grid>
             
      
         
    
    
    </Grid>
  
);
};