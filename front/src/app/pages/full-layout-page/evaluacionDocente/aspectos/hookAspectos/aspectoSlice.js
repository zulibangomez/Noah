import { createSlice } from '@reduxjs/toolkit';


export const aspectoSlice = createSlice({
        name: 'aspecto',
        initialState: {
            cargandoEventos:true,
            events:[],
            activeEvent:null,
        },
reducers: {
 
    activarEvent: (state, {payload} ) => {
        state.activeEvent=payload;
    },

    onListarAspecto: (state, { payload = [] }) => {
      //console.log("Payload en reducer:", payload); 
      state.cargandoEventos = false;
    
      payload.forEach((event) => {
        const existe = state.events.some((dbaspecto) => dbaspecto.id === event.id);
        if (!existe) {
          state.events.push(event);
        }
      });
    
      console.log("Estado actualizado en events:", state.events);
  },

    actualizarAspecto:(state,{payload})=>{
        //map regresa un nuevo arreglo basado en el valor del retorno 
        state.events=state.events.map((event)=>{
        if (event.id === payload.id) {
            return payload;
        }
        return event;
        })
    },
    deleteAspecto: (state, { payload }) => {
        state.events = state.events.filter((event) => event.id !== payload);
        // Limpia el evento activo si fue eliminado
        if (state.activeEvent?.id === payload) {
          state.activeEvent = null;
        }
      },

    addEvenAspecto:(state,{payload})=>{
       state.events.push(payload);
       state.activeEvent=null;//para limpiar 
    },

 

    // deleteAspecto: (state) => {
    //     state.events = state.events.filter(event => event.id !== state.activenEvent.id);
    //     state.activenEvent = null;
    // },
 


    onLimpiaraspecto:(state)=>{
        state.cargandoEventos=true,
        state.events=[],
        state.activeEvent=null

    },

  
  


}
});
export const { 
    activarEvent,
    addEvenAspecto, 
    actualizarAspecto,
    deleteAspecto, 
    onListarAspecto,
    onLimpiaraspecto
} = aspectoSlice.actions;