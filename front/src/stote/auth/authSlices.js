import { createSlice } from '@reduxjs/toolkit';

  export const authSlice = createSlice({
 name: 'auth',
 initialState: {
   status:'checking',///si la persona esta autenticada
   user:{},
   errorMessage:undefined,
   
        },
 reducers: {

onChecking:(state)=>{
    state.status='checking';
    state.user={};
    state.errorMessage=undefined;
   },

   

 onLogin:(state, {payload})=>{
  ///console.log('Payload recibido en onLogin:', payload);
  if (payload) {
    state.status = 'authenticated';
    state.user = { ...payload }; 
    state.errorMessage = undefined;
  } else {
    state.status = 'not-authenticated';
    state.user = {};
    state.errorMessage = 'Error al autenticar';
  }
 
 }, 
 onLogout: (state) => {
  state.status = 'not-authenticated';
  state.user = {};
  state.errorMessage = undefined;
},


 clearErrorMessage:(state)=>{
  state.errorMessage=undefined;
 }
 

    }
});
export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions;