import { createSlice } from '@reduxjs/toolkit';
  export const preguntaSlice = createSlice({
    name: 'pregunta',
    initialState: {
        cargandoEventos: true,
        eventsP: [],
        activeEvent: null,
    },
reducers: {
    activarEvent: (state, { payload }) => {
        state.activeEvent = payload;
      },
      onListarPregunta: (state, { payload = [] }) => {
        state.cargandoEventos = false;
        payload.forEach((event) => {
          const existe = state.eventsP.some((dbPregunta) => dbPregunta.id === event.id);
          if (!existe) {
            state.eventsP.push(event);
          }
        });
      },
      
      actualizarPregunta: (state, {payload}) => {
        state.eventsP = state.eventsP.map((event) =>{
          if (event.id === payload.id) {
              return payload;
          }
          return event;
          });
          
      },
      deletePregunta: (state, { payload }) => {
        state.eventsP = state.eventsP.filter((event) => event.id !== payload);
        if (state.activeEvent?.id === payload) {
          state.activeEvent = null;
        }
      },
      addEventPregunta: (state, { payload }) => {
        console.log('Payload recibido:', payload);
        const existe = state.eventsP.some((event) => event.id === payload.id);
          if (!existe) {
            state.eventsP.push(payload);
          } else {
            Swal.fire('Error', 'La pregunta ya existe.', 'error');
          }
          state.activeEvent = null;
        },

      onLimpiarPregunta: (state) => {
        state.cargandoEventos = true;
        state.eventsP = [];
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