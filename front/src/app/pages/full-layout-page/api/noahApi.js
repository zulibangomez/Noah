import axios from 'axios';
import { getEvaVariables } from '../../../../helpers';

const{VITE_API_URL}=getEvaVariables()

const noahApi= axios.create( {
   baseURL:VITE_API_URL,
   headers: {
      'Content-Type': 'application/json', // Agregar el encabezado Content-Type
      'Authorization': 'Bearer <tu_token>', // Si usas autenticación basada en tokens
    },
    
});

////configuracion para el token que  se encuentra en los headers
noahApi.interceptors.request.use(config=>{
   config.headers={
      ...config.headers,
      'x-token':localStorage.getItem('token')
   }
   return config
})

export default noahApi;