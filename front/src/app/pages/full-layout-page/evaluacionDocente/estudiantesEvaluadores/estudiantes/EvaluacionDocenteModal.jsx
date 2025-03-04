import { useState, useEffect } from "react";
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

  useEffect(() => {
    const fetchData = async () => {
      await listarEncuesta("EVADOCENTEPROD");
    };
    fetchData();
  }, []);

  if (!docente) return null;

  // const handleRespuestaChange = (preguntaId, valor) => {
  //   setRespuestas((prevRespuestas) => ({
  //     ...prevRespuestas,
  //     [preguntaId]: valor,
  //   }));
  // };
  const handleRespuestaChange = (preguntaId, opcionId, isChecked) => {
    setRespuestas((prev) => {
      const respuestasPrevias = prev[preguntaId] || [];
      return {
        ...prev,
        [preguntaId]: isChecked
          ? [...respuestasPrevias, opcionId]
          : respuestasPrevias.filter((id) => id !== opcionId),
      };
    });
  };
  

  const handleGuardarEvaluacion = async () => {
    try {
        // Preparar los datos a enviar
        const evaluadas = {
            id_persona: docente.id_persona,
            id_encuesta: encuesta[0]?.id_encuesta, // Asegurarse de obtener el ID de la encuesta
            id_docente: docente.id_docente,
            id_asignacion_academica: docente.id_asignacion_academica,
            id_personas_externas: null, // Ajustar si hay personas externas
        };

        // Aquí se define evaluadoras correctamente, sin referirse a sí misma
        const evaluadoras = {
            id_persona: docente?.id_persona || null, // ID del evaluador (docente)
            id_estudiante: estudiante?.id_estudiante || null, // ID del estudiante
            id_persona_externa: null // Ajustar si hay otro tipo de evaluador
        };

        const resultados = Object.keys(respuestas).map((idPregunta) => ({
          fecha_resultado: new Date().toISOString(),
          id_encuesta_pregunta: idPregunta, // Por qué se llama 'id_pregunta' en otro lugar?
          resultado_adicional: null, 
          promedio: null, // Asegúrate de que este valor sea el que esperas
          id_persona_evaluadora: evaluadoras.id_persona, // Tomar de los evaluadores
          id_persona_evaluada: evaluadas.id_persona, // Tomar de evaluadas
        }));

        console.log("Evaluadas:", evaluadas);
        console.log("Evaluadoras:", evaluadoras);
        console.log("Resultados:", resultados);
  
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

export default EvaluacionDocenteModal;
