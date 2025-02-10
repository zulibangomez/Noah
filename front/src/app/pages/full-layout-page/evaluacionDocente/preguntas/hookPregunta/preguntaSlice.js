import { createSlice } from '@reduxjs/toolkit';
  export const preguntaSlice = createSlice({
    name: 'pregunta',
    initialState: {
        cargandoEventos: true,
        events: [],
        activeEvent: null,
    },
reducers: {
    activarEvent: (state, { payload }) => {
        state.activeEvent = payload;
      },
      onListarPregunta: (state, { payload = [] }) => {
        state.cargandoEventos = false;
        payload.forEach((event) => {
          const existe = state.events.some((dbPregunta) => dbPregunta.id === event.id);
          if (!existe) {
            state.events.push(event);
          }
        });
      },
      
      actualizarPregunta: (state, {payload}) => {
        state.events = state.events.map((event) =>{
          if (event.id === payload.id) {
              return payload;
          }
          return event;
          });
          
      },
      deletePregunta: (state, { payload }) => {
        state.events = state.events.filter((event) => event.id !== payload);
        if (state.activeEvent?.id === payload) {
          state.activeEvent = null;
        }
      },
      addEventPregunta: (state, { payload }) => {
        console.log('Payload recibido:', payload);
        const existe = state.events.some((event) => event.id === payload.id);
          if (!existe) {
            state.events.push(payload);
          } else {
            Swal.fire('Error', 'La pregunta ya existe.', 'error');
          }
          state.activeEvent = null;
        },

      onLimpiarPregunta: (state) => {
        state.cargandoEventos = true;
        state.events = [];
        state.activeEvent = null;
      },
    },
    });
    export const { 
      onLimpiarPregunta, 
      addEventPregunta, 
      deletePregunta, 
       
      actualizarPregunta, 
      onListarPregunta, 
      activarEvent 
    } =
       preguntaSlice.actions;