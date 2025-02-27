import { useEffect, useState } from "react"
import { useEncuestaPreguntas } from "../encuestasPreguntas"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLocation } from "react-router-dom";

export const AddPreguntas = () => {
  const {listarEncuestaPre, evenEncuestaPre}=useEncuestaPreguntas()
   const [encuestaPre, setencuestaPre] = useState();

   const location = useLocation();
   const queryParams = new URLSearchParams(location.search);
   const id = queryParams.get("id");
   console.log("ID obtenido de URL:", id);

  useEffect(() => {
    if (id) { // Verifica que el id exista antes de hacer la consulta
      listarEncuestaPre(id);
    }
  }, []);
  console.log("Preguntas obtenidas:", evenEncuestaPre);
  return (
    <div>
      <h2>Preguntas de la Encuesta</h2>
      {evenEncuestaPre.length > 0 ? (
        evenEncuestaPre.map((pregunta, index) => (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <Typography component="span">{pregunta.titulo}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{pregunta.descripcion}</Typography>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Typography>No hay preguntas disponibles</Typography>
      )}
    </div>
  );
};
