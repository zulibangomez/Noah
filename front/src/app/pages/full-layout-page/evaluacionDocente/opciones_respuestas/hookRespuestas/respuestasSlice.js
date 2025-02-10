
import { createSlice } from '@reduxjs/toolkit';

  export const respuestaSlice = createSlice({
    name: 'repuesta',
    initialState: {
        cargarEventos:true,
        eventsResp:[],
        activaEvent:null,
     },
reducers: {
        activarEvent: (state, {payload} ) => {
        state.activaEvent=payload;
        },
        onlistarRespuestas: (state, { payload = [] }) => {
            state.cargarEventos = false;
            const nuevosEventos = payload.filter(evento => !state.eventsResp.some(dbrespuesta => dbrespuesta.id === evento.id));///Si el evento no existe en state.events, se incluye en el array nuevosEventos
            
            state.eventsResp.push(...nuevosEventos);//se agregan todos los eventos filtrados
          },
          
        actualizarRespuesta:(state,{payload})=>{
            state.eventsResp=state.eventsResp.map((event)=>{
                if(event.id===payload.id){
                    return payload;
                }
                return event;
            })
        },
        deleteRespuesta:(state, {payload})=>{
            state.eventsResp=state.eventsResp.filter((event)=>event.id!==payload);
            if(state.activaEvent?.id===payload){
                state.activaEvent=null;
            }
        },
        addRespuesta:(state,{payload})=>{
            state.eventsResp.push(payload);
            state.activaEvent=null;
        }, 
        limpiarPregunta:(state)=>{
            state.cargarEventos=true,
            state.eventsResp=[],
            state.activaEvent=null
        }
}
});
export const { activarEvent, 
    onlistarRespuestas,
    actualizarRespuesta,
    deleteRespuesta,
    addRespuesta,
limpiarPregunta } = respuestaSlice.actions;