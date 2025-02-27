import { createSlice } from '@reduxjs/toolkit';


export const uiSlice = createSlice({
 name: 'iu',
 initialState: {
  isDateModalOpen:false
},
reducers: {
    onOpenDateModal: (state) => {
        console.log("Cambiando estado a abierto...");
        state.isDateModalOpen = true;
      },
      onCloseDateModal: (state) => {
        console.log("Cerrando modal...");
        state.isDateModalOpen = false;
      }
}

});
export const { onOpenDateModal, onCloseDateModal} = uiSlice.actions;