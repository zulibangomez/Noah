import {Google} from '@mui/icons-material';
import {  useEffect } from "react";
import Swal from 'sweetalert2';
import { Grid, TextField, Typography, Button } from '@mui/material';

import { Link } from 'react-router-dom';
import { AuthVistaGeneral } from '../layout/AuthVistaGeneral';
import { useForm } from '../../hooks/useForm';
import { useAuthStore } from '../../hooks';


const loginFormFields={
  nombre_usuario:'',
  clave_acceso:'',
}




export const LoginPage = () => {

  const{startLogin,  errorMessage}=useAuthStore();

 const {nombre_usuario, clave_acceso, onInputChange}=useForm(loginFormFields);
 const loginSubmint=(event)=>{
  event.preventDefault();
  startLogin({nombre_usuario, clave_acceso});
  
 }
  const onGoogleSignIn=()=>{
    console.log('onGoogleSignIn');
    dispatch(startGoogleSignIn());
  }

useEffect(() => {
  if (errorMessage!==undefined) {
    Swal.fire('error en la autenticacion', errorMessage, 'error')
  }

}, [errorMessage])



  return (
    <AuthVistaGeneral titulo='Inicio de sesión'>
      
<form onSubmit={loginSubmint}>
           <Grid container>
           {/* en pantallas pequeñas tomar todo el ancho posible */}
              <Grid item xs={ 12} sx= {{ mt:2}} >
                <TextField label='correo' type='email' placeholder='correo@unicesmag.edu.co' fullWidth 
                name='nombre_usuario' value={nombre_usuario} onChange={onInputChange}
                />
              </Grid>

              <Grid item xs={ 12} sx= {{  mb:2, mt:1}} >
                <TextField label="Contraseña" type='password' placeholder='Contraseña' fullWidth 
                name='clave_acceso' value={clave_acceso} onChange={onInputChange}
                />
              </Grid>

               <Grid container spacing={2} sx= {{ mb: 2}} >
                  <Grid item xs={12} sm={ 6 } >
              
                      <Button type="submit" color="primary" fullWidth >
                          Iniciar Sesión
                      </Button>
                    
                  </Grid>
                 

                  <Grid item xs={10} sm={ 6 } >
                  
                      <Button type="submit"
                      variant='container' 
                      fullWidth
                   
                      //onClick={onGoogleSignIn}
                      >
                        <Google/>
                        <Typography sx={{ml:2}}>Google</Typography>
                      
                      </Button>
                  
                  </Grid>
                 
                    
                  <Grid container direction='row' justifyContent='end'>
                    <Link  color='inherit' to={"/auth/recuperarclave"}>
                    ¿Olvidaste tu contraseña?
                    </Link>
                  </Grid>
                
                    
              </Grid>
           </Grid>

        </form>
    </AuthVistaGeneral>
        

      
  );
};
