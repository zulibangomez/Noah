import { useEffect, useState } from "react";
import { useAspectoStore } from "../aspectos";
import { usePreguntasStore } from "../preguntas";
import { useLocation } from "react-router-dom";
import { Box, Select, MenuItem, TextField, Typography, FormControl, InputLabel, OutlinedInput, Chip } from "@mui/material";
import { format } from "date-fns";
import { useRespuestaStore } from "../opciones_respuestas";
import { useEncuestaPreguntas } from "../encuestasPreguntas";

export const Addcuestionario = () => {
    const {evenEncuestaPre, listarEncuestaPre}=useEncuestaPreguntas();

    const { events, listaAspectos } = useAspectoStore();
    const { eventsP, listPregunta } = usePreguntasStore();
    const { eventsResp, listarRespuesta } = useRespuestaStore();
  
    const [opcions, setOpcions] = useState([]); // Aspectos
    const [opcionsp, setOpcionsp] = useState([]); // Preguntas
    const [opcionsres, setOpcionsres] = useState([]); // Respuestas

 
  
    const [formValues, setFormValues] = useState({
      aspecto: "",
      pregunta: "",
      respuestas: [], // Debe ser un array
    });
  
    ///// Datos de la encuesta
    const { state } = useLocation();
    const formatFecha = (fecha) => {
      return fecha ? format(new Date(fecha), "yyyy-MM-dd HH:mm:ss") : "Sin fecha";
    };
    const datosEncuesta = {
      Encuesta: state?.nombre || "Sin nombre",
      "Fecha inicio": formatFecha(state?.fecha_inicio),
      "Fecha fin": formatFecha(state?.fecha_fin),
    };
  
    ///// Cargar aspectos
    useEffect(() => {
      const fetchAspectos = async () => {
        try {
          await listaAspectos();
        } catch (error) {
          console.error("Error al listar los aspectos:", error);
        }
      };
      fetchAspectos();
    }, []);
  
    ///// Guardar aspectos en estado
    useEffect(() => {
      if (Array.isArray(events) && events.length > 0) {
        setOpcions(
          events.map((aspecto) => ({
            value: aspecto.id,
            label: aspecto.aspecto,
          }))
        );
      } else {
        setOpcions([]);
      }
    }, [events]);
  
    ///// Cargar preguntas
    useEffect(() => {
      const fetchPreguntas = async () => {
        try {
          await listPregunta();
        } catch (error) {
          console.error("Error al listar preguntas:", error);
        }
      };
      fetchPreguntas();
    }, []);
  
    ///// Guardar preguntas en estado
    useEffect(() => {
      if (Array.isArray(eventsP) && eventsP.length > 0) {
        setOpcionsp(
          eventsP.map((pregunta) => ({
            value: pregunta.id,
            label: pregunta.pregunta,
          }))
        );
      } else {
        setOpcionsp([]);
      }
    }, [eventsP]);
  
    ///// Cargar respuestas
    useEffect(() => {
      const fetchDataOres = async () => {
        try {
          await listarRespuesta();
        } catch (error) {
          console.error("Error cargando respuestas:", error);
        }
      };
      fetchDataOres();
    }, []);
  
    ///// Guardar respuestas en estado
    useEffect(() => {
      if (Array.isArray(eventsResp) && eventsResp.length > 0) {
        setOpcionsres(
          eventsResp.map((respuesta) => ({
            value: respuesta.id,
            label: respuesta.opciones_respuestas, // Asegúrate de que esta propiedad existe
          }))
        );
      } else {
        setOpcionsres([]);
      }
    }, [eventsResp]);
  
    ///// Manejo de selección de aspectos
    const handleAspectoChange = ({target}) => {
        console.log('Opción seleccionada aspeecto :',target.value);
        const selectedValue = target.value;
      setFormValues({
        ...formValues,
        aspecto:selectedValue,
      });
    };
  
    ///// Manejo de selección de preguntas
    const handlePreguntaChange = ({target}) => {
        console.log('Opción seleccionada pregunta:',target.value);
        const selectedValue = target.value;
      setFormValues({
        ...formValues,
        pregunta: selectedValue,
      });
    };
  
    ///// Manejo de selección múltiple de respuestas
    const handleChange = (event) => {
        console.log('selec obciones respuesta', event.target);  
      const { value } = event.target;
      
      setFormValues({
        ...formValues,
        respuestas: typeof value === "string" ? value.split(",") : value, 
      });
    };
   
  
    return (
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            height: "15vh",
            gap: 2,
          }}
        >
          {Object.entries(datosEncuesta).map(([key, value]) => (
            <Typography key={key}>
              <strong>{key}:</strong> {value}
            </Typography>
          ))}
        </Box>
  
        {/* Selects */}
        <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
          <InputLabel>Seleccione un Aspecto</InputLabel>
          <Select name="id_aspecto" value={formValues.aspecto} onChange={handleAspectoChange}>
            {opcions.length > 0 ? (
              opcions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No hay opciones disponibles</MenuItem>
            )}
          </Select>
        </FormControl>
  
        <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
          <InputLabel>Seleccione una Pregunta</InputLabel>
          <Select name="id_pregunta"  value={formValues.pregunta} onChange={handlePreguntaChange}>
            <MenuItem disabled value="">
              Seleccione una Pregunta
            </MenuItem>
            {opcionsp.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
  
        {/* Select con selección múltiple */}
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel>Seleccione una Opción de Respuesta</InputLabel>
          <Select
            multiple
            name="id_opciones_respuestas"
            value={formValues.respuestas} // Debe ser un array
            onChange={handleChange}
            input={<OutlinedInput label="Opciones" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={opcionsres.find(op => op.value === value)?.label || value} />
                ))}
              </Box>
            )}
          >
            {opcionsres.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
  };