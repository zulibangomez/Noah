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
      case "CERRADA":
        return (
          <RadioGroup
            value={respuestas[pregunta.id_pregunta] || ""}
            onChange={(e) => handleRespuestaChange(pregunta.id_pregunta, e.target.value)}
          >
            {pregunta.opciones_respuesta.map((opcion) => (
              <FormControlLabel key={opcion.id_respuesta} value={opcion.id_respuesta} control={<Radio />} label={opcion.nombre_opcion_respuesta} />
            ))}
          </RadioGroup>
        );
      case "MÚLTIPLE OPCIÓN":
        return (
          <FormControl>
            <FormLabel>Seleccione varias opciones</FormLabel>
            {pregunta.opciones_respuesta.map((opcion) => (
              <FormControlLabel
                key={opcion.id_respuesta}
                control={<Checkbox checked={respuestas[pregunta.id_pregunta]?.includes(opcion.id_respuesta) || false} onChange={(e) => handleRespuestaChange(pregunta.id_pregunta, opcion.id_respuesta, e.target.checked)} />}
                label={opcion.nombre_opcion_respuesta}
              />
            ))}
          </FormControl>
        );
        case "ESCALA DE VALORACIÓN":
          case "PUNTUACIÓN CON ESTRELLAS":
            return (
              <Box display="flex" flexDirection="column" alignItems="center">
                <Rating
                  value={respuestas[pregunta.id_pregunta] || 0}
                  onChange={(e, newValue) => handleRespuestaChange(pregunta.id_pregunta, newValue)}
                />
                <Typography variant="caption" mt={1}>
                  {pregunta.opciones_respuesta[respuestas[pregunta.id_pregunta] - 1]?.nombre_opcion_respuesta || "Seleccione una opción"}
                </Typography>
              </Box>
            );
        case "ABIERTA (Texto corto)":
        return <TextField fullWidth size="small" variant="outlined" value={respuestas[pregunta.id_pregunta] || ""} onChange={(e) => handleRespuestaChange(pregunta.id_pregunta, e.target.value)} />;
      case "ABIERTA (Texto largo)":
        return <TextField fullWidth multiline rows={4} variant="outlined" value={respuestas[pregunta.id_pregunta] || ""} onChange={(e) => handleRespuestaChange(pregunta.id_pregunta, e.target.value)} />;
      case "CERRADA (Checkbox)":
        return <FormControlLabel control={<Checkbox checked={!!respuestas[pregunta.id_pregunta]} onChange={(e) => handleRespuestaChange(pregunta.id_pregunta, e.target.checked)} />} label="Seleccione" />;
      case "SELECCIÓN MÚLTIPLE":
        return (
          <FormControl>
            <FormLabel>Seleccione varias opciones</FormLabel>
            {pregunta.opciones_respuesta.map((opcion) => (
              <FormControlLabel
                key={opcion.id_respuesta}
                control={<Checkbox checked={respuestas[pregunta.id_pregunta]?.includes(opcion.id_respuesta) || false} onChange={(e) => handleRespuestaChange(pregunta.id_pregunta, opcion.id_respuesta, e.target.checked)} />}
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
      case "FECHA":
        return <Input type="date" fullWidth value={respuestas[pregunta.id_pregunta] || ""} onChange={(e) => handleRespuestaChange(pregunta.id_pregunta, e.target.value)} />;
      case "HORA":
        return <Input type="time" fullWidth value={respuestas[pregunta.id_pregunta] || ""} onChange={(e) => handleRespuestaChange(pregunta.id_pregunta, e.target.value)} />;
      case "NÚMERO":
        return <Input type="number" fullWidth value={respuestas[pregunta.id_pregunta] || ""} onChange={(e) => handleRespuestaChange(pregunta.id_pregunta, e.target.value)} />;
      case "RANGO":
        return <Slider value={respuestas[pregunta.id_pregunta] || 0} onChange={(e, newValue) => handleRespuestaChange(pregunta.id_pregunta, newValue)} min={pregunta.min || 0} max={pregunta.max || 10} />;
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




