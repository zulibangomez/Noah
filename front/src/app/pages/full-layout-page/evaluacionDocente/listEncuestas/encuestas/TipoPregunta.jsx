import PropTypes from "prop-types";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Select,
  MenuItem,
  TextField,
  Slider,
  Rating,
  Input,
  FormControl,
  FormLabel,
  Box,
  Typography,
  Button,
} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const TipoPregunta = ({ pregunta, respuestas, handleRespuestaChange }) => {
  const renderPregunta = () => {
    switch (pregunta.tipo_pregunta) {
      case "CERRADA": //lista valor_opcion_respuesta y id_encuesta_pregunta, falta que pinte la selecionada
        return (
          <RadioGroup
            value={respuestas[pregunta.id_pregunta]?.valor || ""}
            onChange={(e) => {
              const opcionSeleccionada = pregunta.opciones_respuesta.find(
                (opcion) => opcion.id_respuesta === parseInt(e.target.value, 10)
              );
              handleRespuestaChange(
                pregunta.id_pregunta,
                opcionSeleccionada?.valor_opcion_respuesta,
                null, // isChecked es null porque es una única selección
                opcionSeleccionada?.id_encuesta_pregunta
              );
            }}
          >
            {pregunta.opciones_respuesta.map((opcion) => (
              <FormControlLabel
                key={opcion.id_respuesta}
                value={opcion.id_respuesta}
                control={<Radio />}
                label={opcion.nombre_opcion_respuesta}
              />
            ))}
          </RadioGroup>

        );
      case "MÚLTIPLE OPCIÓN": //lista valor_opcion_respuesta y id_encuesta_pregunta
        return (
          <FormControl>
          <FormLabel>Seleccione varias opciones</FormLabel>
          {pregunta.opciones_respuesta.map((opcion) => (
            <FormControlLabel
              key={opcion.id_respuesta}
              control={
                <Checkbox
                  checked={respuestas[pregunta.id_pregunta]?.includes(opcion.valor_opcion_respuesta) || false}
                  onChange={(e) =>
                    handleRespuestaChange(pregunta.id_pregunta, opcion.valor_opcion_respuesta, e.target.checked, opcion.id_encuesta_pregunta)
                  }
                />
              }
              label={opcion.nombre_opcion_respuesta}
            />
          ))}
        </FormControl>
          
        );
        case "ESCALA DE VALORACIÓN": //lista valor_opcion_respuesta y id_encuesta_pregunta
          case "PUNTUACIÓN CON ESTRELLAS":
            return (
              <Box display="flex" flexDirection="column" alignItems="center">
                <Rating
                  // Se muestra el valor guardado; si no hay nada, se muestra 0
                  value={respuestas[pregunta.id_pregunta]?.valor_opcion_respuesta || 0}
                  onChange={(e, newValue) => {
                    const selectedOption = pregunta.opciones_respuesta[newValue - 1];
                    if (selectedOption) {
                      // Se guarda el valor de la opción y el id de la encuesta de la pregunta
                      handleRespuestaChange(
                        pregunta.id_pregunta,
                        selectedOption.valor_opcion_respuesta,
                        true,
                        selectedOption.id_encuesta_pregunta
                      );
                      console.log("actualizado", respuestas);
                    }
                  }}
                />
                <Typography variant="caption" mt={1}>
                  {
                    // Se busca la opción cuyo valor coincide con el valor almacenado
                    pregunta.opciones_respuesta.find(
                      (opcion) =>
                        opcion.valor_opcion_respuesta ===
                        respuestas[pregunta.id_pregunta]?.valor_opcion_respuesta
                    )?.nombre_opcion_respuesta || "Seleccione una opción"
                  }
                </Typography>
              </Box>
            );
            case "ABIERTA (Texto corto)"://lista valor_opcion_respuesta y id_encuesta_pregunta
              return (
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  value={respuestas[pregunta.id_pregunta]?.resultado_adicional || ""}
                  onChange={(e) => {
                    const selectedOption = pregunta.opciones_respuesta?.[0]; // Se asume que solo hay una opción de respuesta
                    if (selectedOption) {
                      handleRespuestaChange(
                        pregunta.id_pregunta,
                        selectedOption.valor_opcion_respuesta, // Guarda el valor de la opción
                        null,
                        selectedOption.id_encuesta_pregunta,
                        e.target.value // Guarda lo que se escribe en resultado_adicional
                      );
                    }
                  }}
                  placeholder={pregunta.opciones_respuesta?.[0]?.nombre_opcion_respuesta || ""}
                />
              );
            
          
      case "ABIERTA (Texto largo)"://lista valor_opcion_respuesta y id_encuesta_pregunta
        return (
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={respuestas[pregunta.id_pregunta]?.resultado_adicional || ""}
            onChange={(e) => {
              const selectedOption = pregunta.opciones_respuesta?.[0]; 
              if (selectedOption) {
                handleRespuestaChange(
                  pregunta.id_pregunta,
                  selectedOption.valor_opcion_respuesta,
                  null, 
                  selectedOption.id_encuesta_pregunta,
                  e.target.value  // Aquí se pasa el valor correctamente
                );
              }
            }}
            placeholder={pregunta.opciones_respuesta?.[0]?.nombre_opcion_respuesta || ""}
          />
        );
                
        case "CERRADA (Checkbox)": //lista valor_opcion_respuesta y id_encuesta_pregunta
          return (
            <FormControl>
              <FormLabel>Seleccione una opción</FormLabel>
              {pregunta.opciones_respuesta.map((opcion) => (
                <FormControlLabel
                  key={opcion.id_respuesta}
                  control={
                    <Checkbox
                      checked={respuestas[pregunta.id_pregunta]?.includes(opcion.valor_opcion_respuesta) || false}
                      onChange={(e) => handleRespuestaChange(
                        pregunta.id_pregunta,
                        opcion.valor_opcion_respuesta,
                        e.target.checked,
                        opcion.id_encuesta_pregunta
                      )}
                    />
                  }
                  label={opcion.nombre_opcion_respuesta}
                />
              ))}
            </FormControl>
          );
        case "SELECCIÓN MÚLTIPLE": //lista valor_opcion_respuesta y id_encuesta_pregunta
        return (
          <FormControl>
            <FormLabel>Seleccione varias opciones</FormLabel>
            {pregunta.opciones_respuesta.map((opcion) => (
              <FormControlLabel
                key={opcion.id_respuesta}
                control={<Checkbox checked={respuestas[pregunta.id_pregunta]?.includes(opcion.valor_opcion_respuesta) || false} 
                onChange={(e) => handleRespuestaChange(pregunta.id_pregunta, opcion.valor_opcion_respuesta, e.target.checked,opcion.id_encuesta_pregunta)} />}
                label={opcion.nombre_opcion_respuesta}
              />
            ))}
          </FormControl>
        );
      case "LISTA DESPLEGABLE":
        return (
          <Select fullWidth value={respuestas[pregunta.id_pregunta] || ""} onChange={(e) => handleRespuestaChange(pregunta.id_pregunta, e.target.value)}>
            {pregunta.opciones_respuesta.map((opcion) => (
              <MenuItem key={opcion.id_respuesta} value={opcion.id_respuesta}>{opcion.nombre_opcion_respuesta}</MenuItem>
            ))}
          </Select>
        );
      case "FECHA": //lista valor_opcion_respuesta y id_encuesta_pregunta
        return <Input 
        type="date" 
        fullWidth 
        variant="outlined"
            value={respuestas[pregunta.id_pregunta]?.resultado_adicional || ""}
            onChange={(e) => {
              const selectedOption = pregunta.opciones_respuesta?.[0]; 
              if (selectedOption) {
                handleRespuestaChange(
                  pregunta.id_pregunta,
                  selectedOption.valor_opcion_respuesta,
                  null, 
                  selectedOption.id_encuesta_pregunta,
                  e.target.value  // Aquí se pasa el valor correctamente
                );
              }
            }}
            placeholder={pregunta.opciones_respuesta?.[0]?.nombre_opcion_respuesta || ""}
          />;
      case "HORA"://lista valor_opcion_respuesta y id_encuesta_pregunta
        return <Input 
        type="time" 
        fullWidth 
        variant="outlined"
            value={respuestas[pregunta.id_pregunta]?.resultado_adicional || ""}
            onChange={(e) => {
              const selectedOption = pregunta.opciones_respuesta?.[0]; 
              if (selectedOption) {
                handleRespuestaChange(
                  pregunta.id_pregunta,
                  selectedOption.valor_opcion_respuesta,
                  null, 
                  selectedOption.id_encuesta_pregunta,
                  e.target.value  // Aquí se pasa el valor correctamente
                );
              }
            }}
            placeholder={pregunta.opciones_respuesta?.[0]?.nombre_opcion_respuesta || ""}
          />;
          case "NÚMERO"://lista valor_opcion_respuesta y id_encuesta_pregunta
          return <Input 
          type="number" 
          fullWidth 
          variant="outlined"
          value={respuestas[pregunta.id_pregunta]?.resultado_adicional || ""}
          onChange={(e) => {
            const selectedOption = pregunta.opciones_respuesta?.[0]; 
            if (selectedOption) {
              handleRespuestaChange(
                pregunta.id_pregunta,
                selectedOption.valor_opcion_respuesta,
                null, 
                selectedOption.id_encuesta_pregunta,
                e.target.value  // Aquí se pasa el valor correctamente
              );
            }
          }} />;
        
          case "RANGO"://lista valor_opcion_respuesta y id_encuesta_pregunta
            return (
              <div>
                <Slider
                  variant="outlined"
                  value={Number(respuestas[pregunta.id_pregunta]?.resultado_adicional) || 0} 
                  onChange={(e, newValue) => {
                    const selectedOption = pregunta.opciones_respuesta?.[0]; 
                    if (selectedOption) {
                      handleRespuestaChange(
                        pregunta.id_pregunta,
                        selectedOption.valor_opcion_respuesta,
                        null, 
                        selectedOption.id_encuesta_pregunta,
                        `${newValue}%`,
                      );
                    }
                  }}
                  min={0} // Puedes ajustar el mínimo y máximo según necesites
                  max={100}
                  step={1}
                />
                <span>{respuestas[pregunta.id_pregunta]?.resultado_adicional || 0}</span>
              </div>
            );
          
      case "SUBIDA DE ARCHIVO":
        return (
          <Button variant="contained" component="label" startIcon={<CloudUploadIcon />}>
            Subir archivo
            <input type="file" hidden onChange={(e) => handleRespuestaChange(pregunta.id_pregunta, e.target.files[0])} />
          </Button>
        );

      case "MATRIZ DE ESCALA":
        return (
          <Box>
            {pregunta.opciones_respuesta.map((opcion, index) => (
              <TextField key={index} label={opcion.nombre_opcion_respuesta} fullWidth variant="outlined" margin="dense" />
            ))}
          </Box>
        );
      default:
        return <Typography variant="body2">Tipo de pregunta no soportado</Typography>;
    }
  };

  return <Box p={2}>{renderPregunta()}</Box>;
};

TipoPregunta.propTypes = {
  pregunta: PropTypes.object.isRequired,
  respuestas: PropTypes.object.isRequired,
  handleRespuestaChange: PropTypes.func.isRequired,
};

export default TipoPregunta;




