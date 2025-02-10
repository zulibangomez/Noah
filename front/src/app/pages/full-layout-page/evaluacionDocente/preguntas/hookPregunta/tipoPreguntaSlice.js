import { createSlice } from '@reduxjs/toolkit';
  export const tipoPreguntaSlice = createSlice({
    name: 'tPregunta',
    initialState: {
        cargandoTipoPre: true,
        tipoPregunta: [],//almacena la lista de tipo de pregunta 
        activeTipoPre: null,//guarda el id de tipo de pregunta 
    },
reducers: {
  ///actualiza el id del tipo pregunta 
    activarTipoPregunta: (state, { payload }) => {
        state.activeTipoPre = payload;
      },
      
      onListartipoPregunta: (state, { payload = [] }) => {
        state.cargandoTipoPre = false;
        payload.forEach((tipoPre) => {
          const existe = state.tipoPregunta.some((dbtipoPregunta) => dbtipoPregunta.id === tipoPre.id);
          if (!existe) {
            state.tipoPregunta.push(tipoPre);
          }
        });
      },
    
      onLimpiartipoPregunta: (state) => {
        state.cargandoTipoPre = true;
        state.tipoPregunta = [];
        state.activeTipoPre = null;
      },
    },
    });
    export const { onLimpiartipoPregunta,  onListartipoPregunta, activarTipoPregunta } = tipoPreguntaSlice.actions;