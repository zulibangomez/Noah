import { parseISO } from "date-fns";
//////////convertir fecha 
export const convertirData = (encuetaEvents=[]) => {
    return encuetaEvents.map(event=>{
        event.fecha_inicio= parseISO(event.fecha_inicio);
        event.fecha_fin=parseISO(event.fecha_fin)
        return event;
    })
}
