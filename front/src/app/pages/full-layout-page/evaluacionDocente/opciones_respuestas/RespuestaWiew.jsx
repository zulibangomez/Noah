import { useRespuestaStore } from './services/useRespuestaStore'; // Asegúrate de ajustar la ruta correctamente
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { BotonActualizarEncuesta, BotonAddNew, BotonDelete } from '../modelComponents';
import imagen from '../../../../../assets/img/carita_feliz.jpg';
import { FromRespuesta } from './FromRespuesta';
import { MenusGeneralSist } from '../../../../../shared/MenusGeneralSist';

//import { activaEvent } from './hookRespuestas/respuestasSlice';

export const RespuestaWiew = () => {
  const { listarRespuesta, eventsResp, eliminarRespuesta } = useRespuestaStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
 

  // Se usa un useEffect para cargar los datos al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        //console.log("Eventos cargados:", eventsResp);
        await listarRespuesta(); // Llama a la función que actualiza el estado 'events'
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [listarRespuesta]);

  // Filtro de búsqueda
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Función para paginar los resultados
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filtrar los eventos según el término de búsqueda
  const filteredEvents = eventsResp.filter((evento) => {
    const { preguntas, respuestas } = evento;
    
    const preguntasTexto = preguntas ? preguntas.toLowerCase() : "";
    const respuestasTexto = respuestas ? respuestas.toLowerCase() : "";
    const search = searchTerm.toLowerCase();
  
    return preguntasTexto.includes(search) || respuestasTexto.includes(search);
  });

  // Se limita la cantidad de filas por página
  const paginatedEvents = filteredEvents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    
    <div style={{ padding: '20px' }}>
     <div><MenusGeneralSist /></div>
      <h5 style={{ textAlign: 'center' }}>Lista de Respuestas</h5>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <BotonAddNew  />
        <FromRespuesta />
      </div>
    

      {/* Buscador */}
      <TextField
        label="Buscar respuestas"
        variant="outlined"
        fullWidth
        onChange={handleSearch}
        style={{ marginBottom: '20px' }}
      />

      {/* Verificamos si 'events' tiene datos */}
      {Array.isArray(filteredEvents) && filteredEvents.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Respuestas</TableCell>
                <TableCell>Imagen</TableCell>
                <TableCell>Valor</TableCell>
                <TableCell>Respuesta Adicional</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedEvents.map((evento) => {
                const {  opciones_respuestas, valor, id, respuestaadd, estado} = evento;///desestructurar
                return (
                  <TableRow key={id}>
                   
                    <TableCell>{opciones_respuestas || '-'}</TableCell>
                    <TableCell>
                      <img src={imagen} style={{ width: '40px', height: '40px', borderRadius: '50%' }} alt="Imagen" />
                    </TableCell>
                    <TableCell>{valor !== undefined ? valor : '-'}</TableCell>
                   
                    <TableCell>{respuestaadd || '-'}</TableCell>
                    <TableCell>{estado || '-'}</TableCell>
                    
                    <TableCell>
                      <BotonDelete 
                        onDelete={eliminarRespuesta} 
                        id={id} 
                      />
                      
                    </TableCell>
                {/*------------Actualizar--------- */}
                    <TableCell>
                    <BotonActualizarEncuesta row={evento}/>
                  
                    <FromRespuesta/>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>No hay respuestas disponibles.</p>
      )}

      {/* Paginación */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredEvents.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="página" 
      />
    </div>
  );
};
