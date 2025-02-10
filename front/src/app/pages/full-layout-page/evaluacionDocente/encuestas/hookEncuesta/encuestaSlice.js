import { createSlice } from "@reduxjs/toolkit";

export const encuestaSlice = createSlice({
    name:'encuesta',
    initialState:{
        cargandoEventos:true,
        encuetaEvents:[],
        activeEncuesta:null,
    },
reducers:{
    activarEvent:(state, {payload})=>{
        state.activeEncuesta=payload;
    },
    onListarEncuesta:(state, {payload=[]})=>{
        state.cargandoEventos=false;
      
            const nuevosEventos =payload.filter(evento=> !state.encuetaEvents.some(dbencuesta=>dbencuesta.id===evento.id));
            state.encuetaEvents.push(...nuevosEventos);
           /// console.log('slice encuestammmmmm',nuevosEventos);      
    },

    actualizarEncuesta:(state, {payload})=>{
        state.encuetaEvents=state.encuetaEvents.map((event)=>{
           if(event.id===payload.id){
            return payload;
           } 
           return payload;
        })
    },
    eliminarEncuesta:(state, {payload})=>{
        state.encuetaEvents.filter((event)=>event.id!==payload);
        if(state.activeEncuesta?.id===payload){
            state.activeEncuesta=null;
        }
    },
    addEncuesta:(state, {payload})=>{
      state.encuetaEvents.push(payload);
      state.activeEncuesta=null;
    },

    onLimpiarEncuesta:(state)=>{
        state.cargandoEventos= true,
        state.encuetaEvents=[],
        state.activeEncuesta=null
    }
}
});

export const {
    addEncuesta,
    onLimpiarEncuesta,
    eliminarEncuesta,
    onListarEncuesta,
    activarEvent,
    actualizarEncuesta
} = encuestaSlice.actions;///retorna de mi fincion las aciones 
