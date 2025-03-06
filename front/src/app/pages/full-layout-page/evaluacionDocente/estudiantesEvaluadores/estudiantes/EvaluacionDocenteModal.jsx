import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Box,
  Avatar,
  Typography,
  Card,
  CardContent,
  Divider,
} from "@mui/material";

import imagenDocente from "../../../../../../assets/img/recursos/usuarioSinFoto.jpg";
import { useListEncuestaStore } from "../../listEncuestas/encuestas/useListEncuestaStore";
import TipoPregunta from "../../listEncuestas/encuestas/TipoPregunta";

const EvaluacionDocenteModal = ({ estudiante, docente, onClose }) => {
  const { encuesta, listarEncuesta, AddEncuesta } = useListEncuestaStore();
  const [respuestas, setRespuestas] = useState({});
  const [idEncuestaPregunta, setIdEncuestaPregunta] = useState(null);
  const [promedio, setIPromedio] = useState(null);
  const [resultadoAdd, setResultadoAdd] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await listarEncuesta("EVADOCENTEPROD");
    };
    fetchData();
  }, []);

  if (!docente) return null;

 
  const handleRespuestaChange = (preguntaId, valor, isChecked = null, id_encuesta_preguntaevet, resultado_adicional) => {
    setIdEncuestaPregunta(id_encuesta_preguntaevet);
    setIPromedio(valor);
    setResultadoAdd(resultado_adicional);

    setRespuestas((prevRespuestas) => {
      if (isChecked === null) {
        return {
          ...prevRespuestas,
          [preguntaId]: {
            valor: valor,  // Guarda la opción seleccionada
            resultado_adicional: resultado_adicional, // Guarda lo que escribe el usuario
          },
        };
      }
  
      const respuestasPrevias = prevRespuestas[preguntaId] || [];
      return {
        ...prevRespuestas,
        [preguntaId]: isChecked
          ? [...respuestasPrevias, valor] 
          : respuestasPrevias.filter((id) => id !== valor),
      };
    });
};

  

  const handleGuardarEvaluacion = async () => {
    try {
    
        const evaluadas = {
            id_persona: docente.id_persona,
            id_encuesta: encuesta[0]?.id_encuesta,
            id_docente: docente.id_docente,
            id_asignacion_academica: docente.id_asignacion_academica,
            id_personas_externas: null, 
        };

        const evaluadoras = {
            id_persona: docente?.id_persona || null, 
            id_estudiante: estudiante?.id_estudiante || null, 
            id_persona_externa: null 
        };

        const resultados ={
          idEncuestaPregunta:idEncuestaPregunta,
          promedio:promedio,
          resultadoAdd:resultadoAdd
        }
       
  
        // Llamar a la función para agregar la encuesta
        console.log("Llamando a AddResultados con:", JSON.stringify(resultados, null, 2));
        const response = await AddEncuesta(evaluadas, evaluadoras, resultados);
        console.log("Respuesta del servidor:", response);

        // Cerrar el modal después de guardar
        onClose();
    } catch (error) {
        console.error("Error al guardar la evaluación:", error);
    }
};



  return (
    <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          bgcolor: "#008cba",
          color: "white",
          py: 2,
        }}
      >
        Evaluación del Docente
      </DialogTitle>

      <DialogContent sx={{ bgcolor: "#f5f5f5", py: 3 }}>
        <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
          <Avatar
            src={docente.ruta_foto_docente?.trim() || imagenDocente}
            alt="Foto Docente"
            sx={{ width: 110, height: 125, mb: 2, border: "4px solid #008cba" }}
          />

          <Card
            variant="outlined"
            sx={{ width: "100%", borderRadius: 2, boxShadow: 2 }}
          >
            <CardContent>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ color: "#008cba" }}
              >
                Información del Docente
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
                <TextField
                  label="Nombre"
                  value={docente.nombres_completos_docent}
                  fullWidth
                  disabled
                />
                <TextField
                  label="Identificación"
                  value={docente.identificacion_docente}
                  fullWidth
                  disabled
                />
                <TextField
                  label="Semestre Asignatura"
                  value={docente.semestre_asignatura}
                  fullWidth
                  disabled
                />
                <TextField
                  label="Asignatura"
                  value={docente.nombre}
                  fullWidth
                  disabled
                />
                
              </Box>
            </CardContent>
          </Card>

          {Array.isArray(encuesta) && encuesta.length > 0 && (
            <Card
              variant="outlined"
              sx={{ width: "100%", borderRadius: 2, boxShadow: 2 }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ color: "#008cba" }}
                >
                  Encuesta de Evaluación
                </Typography>
                <Divider sx={{ mb: 2 }} />

                {encuesta.map((evaluacion, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {evaluacion.nombre_encuesta}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      gutterBottom
                    >
                      {evaluacion.descripcion_encuesta}
                    </Typography>

                    {Array.isArray(evaluacion.aspectos) &&
                      evaluacion.aspectos.map((aspecto, aspectoIndex) => (
                        <Box
                          key={aspectoIndex}
                          sx={{
                            mt: 2,
                            p: 2,
                            bgcolor: "#e3f2fd",
                            borderRadius: 2,
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            fontWeight="bold"
                            color="#1565c0"
                          >
                            {aspecto.nombre_aspecto}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {aspecto.descripcion_aspecto}
                          </Typography>

                          {aspecto.preguntas.map((pregunta, preguntaIndex) => (
                            <Box
                              key={preguntaIndex}
                              sx={{
                                mt: 2,
                                p: 2,
                                bgcolor: "white",
                                borderRadius: 2,
                                boxShadow: 1,
                              }}
                            >
                              <Typography variant="subtitle1">
                                {pregunta.titulo_pregunta}
                              </Typography>

                              <TipoPregunta
                                pregunta={pregunta}
                                respuestas={respuestas}
                                handleRespuestaChange={handleRespuestaChange}
                              />
                            </Box>
                          ))}
                        </Box>
                      ))}
                  </Box>
                ))}
              </CardContent>
            </Card>
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button
          onClick={handleGuardarEvaluacion}
          color="primary"
          variant="contained"
        >
          Guardar Evaluación
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EvaluacionDocenteModal.propTypes = {
  estudiante: PropTypes.shape({
    id_estudiante: PropTypes.number.isRequired,
  }),
  docente: PropTypes.shape({
    id_persona: PropTypes.number.isRequired,
    id_docente: PropTypes.number.isRequired,
    id_asignacion_academica: PropTypes.number.isRequired,
    nombres_completos_docent: PropTypes.string.isRequired,
    identificacion_docente: PropTypes.string.isRequired,
    semestre_asignatura: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    ruta_foto_docente: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EvaluacionDocenteModal;
