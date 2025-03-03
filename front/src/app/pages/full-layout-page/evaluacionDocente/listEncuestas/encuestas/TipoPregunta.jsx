import PropTypes from "prop-types";
import { RadioGroup, FormControlLabel, Radio, Checkbox, Select, MenuItem, TextField, Slider, Rating, Input } from "@mui/material";

const TipoPregunta = ({ pregunta, respuestas, handleRespuestaChange }) => {
  const renderPregunta = () => {
    switch (pregunta.tipo_pregunta) {
      case "CERRADA":
      case "MÚLTIPLE OPCIÓN":
      case "PUNTUACIÓN CON ESTRELLAS":
        return (
          <RadioGroup
            value={respuestas[pregunta.id_pregunta] || ""}
            onChange={(e) => handleRespuestaChange(pregunta.id_pregunta, e.target.value)}
          >
            {pregunta.opciones_respuesta.map((opcion) => (
              <FormControlLabel
                key={opcion.id_respuesta}
                value={opcion.id_respuesta}
                control={pregunta.tipo_pregunta === "PUNTUACIÓN CON ESTRELLAS" ? <Rating /> : <Radio />}
                label={opcion.nombre_opcion_respuesta}
              />
            ))}
          </RadioGroup>
        );
      case "ESCALA DE VALORACIÓN":
      case "RANGO":
        return (
          <Slider
            value={respuestas[pregunta.id_pregunta] || 0}
            onChange={(e, newValue) => handleRespuestaChange(pregunta.id_pregunta, newValue)}
            min={pregunta.min || 0}
            max={pregunta.max || 10}
          />
        );
      case "ABIERTA (Texto corto)":
        return <TextField fullWidth variant="outlined" value={respuestas[pregunta.id_pregunta] || ""} onChange={(e) => handleRespuestaChange(pregunta.id_pregunta, e.target.value)} />;
      case "ABIERTA (Texto largo)":
        return <TextField fullWidth multiline rows={4} variant="outlined" value={respuestas[pregunta.id_pregunta] || ""} onChange={(e) => handleRespuestaChange(pregunta.id_pregunta, e.target.value)} />;
      case "CERRADA (Checkbox)":
      case "SELECCIÓN MÚLTIPLE":
        return (
          <>
            {pregunta.opciones_respuesta.map((opcion) => (
              <FormControlLabel
                key={opcion.id_respuesta}
                control={<Checkbox checked={respuestas[pregunta.id_pregunta]?.includes(opcion.id_respuesta) || false} onChange={(e) => handleRespuestaChange(pregunta.id_pregunta, opcion.id_respuesta, e.target.checked)} />}
                label={opcion.nombre_opcion_respuesta}
              />
            ))}
          </>
        );
      case "LISTA DESPLEGABLE":
        return (
          <Select fullWidth value={respuestas[pregunta.id_pregunta] || ""} onChange={(e) => handleRespuestaChange(pregunta.id_pregunta, e.target.value)}>
            {pregunta.opciones_respuesta.map((opcion) => (
              <MenuItem key={opcion.id_respuesta} value={opcion.id_respuesta}>
                {opcion.nombre_opcion_respuesta}
              </MenuItem>
            ))}
          </Select>
        );
      case "FECHA":
        return <Input type="date" fullWidth value={respuestas[pregunta.id_pregunta] || ""} onChange={(e) => handleRespuestaChange(pregunta.id_pregunta, e.target.value)} />;
      case "HORA":
        return <Input type="time" fullWidth value={respuestas[pregunta.id_pregunta] || ""} onChange={(e) => handleRespuestaChange(pregunta.id_pregunta, e.target.value)} />;
      case "NÚMERO":
        return <Input type="number" fullWidth value={respuestas[pregunta.id_pregunta] || ""} onChange={(e) => handleRespuestaChange(pregunta.id_pregunta, e.target.value)} />;
      case "SUBIDA DE ARCHIVO":
        return <Input type="file" fullWidth onChange={(e) => handleRespuestaChange(pregunta.id_pregunta, e.target.files[0])} />;
      default:
        return <p>Tipo de pregunta no soportado</p>;
    }
  };

  return <div>{renderPregunta()}</div>;
};

TipoPregunta.propTypes = {
  pregunta: PropTypes.shape({
    id_pregunta: PropTypes.number.isRequired,
    tipo_pregunta: PropTypes.string.isRequired,
    opciones_respuesta: PropTypes.arrayOf(
      PropTypes.shape({
        id_respuesta: PropTypes.number.isRequired,
        nombre_opcion_respuesta: PropTypes.string.isRequired,
      })
    ),
    min: PropTypes.number,
    max: PropTypes.number,
  }).isRequired,
  respuestas: PropTypes.object.isRequired,
  handleRespuestaChange: PropTypes.func.isRequired,
};

export default TipoPregunta;


