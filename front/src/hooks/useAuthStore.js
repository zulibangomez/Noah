import { useDispatch, useSelector } from "react-redux"
import noahApi from "../app/pages/full-layout-page/api/noahApi";
import { onLogin, onLogout, onChecking, clearErrorMessage} from "../stote/auth/authSlices";
import Swal from 'sweetalert2';
import { onLimpiaraspecto } from "../app/pages/full-layout-page/evaluacionDocente/aspectos";



export const useAuthStore = () => {
    const{status, user, errorMessage}=useSelector(state =>state.auth);
    const dispatch= useDispatch();

    const startLogin=async({nombre_usuario, clave_acceso})=>{
        ////console.log('rrrrrrrrrrrrrrrrrrrrrr',{nombre_usuario, clave_acceso})
      // dispatch(onChecking());
      try {
        const { data } = await noahApi.post('/login/onlogin', { nombre_usuario, clave_acceso });
        ///console.log('lock',data);
        
        if (!data.id || !data.name || !data.id_usuario) { // Verifica las propiedades correctas
          console.log('El usuario no existe', data);
          dispatch(onLogout('Usuario no encontrado'));
          Swal.fire('Error en la autenticación', 'Usuario no encontrado', 'error');
        } else {
          localStorage.setItem('token', data.token);
          localStorage.setItem('token-init-date', new Date().getTime());
    
          // Usa las propiedades correctas del objeto data
          dispatch(onLogin({ id: data.id, nombre: data.name, id_usuario: data.id_usuario }));
         

    
          Swal.fire({
            title: '¡Bienvenido!',
            text: `Bienvenido, ${data.name},${data.id_usuario}`,
            icon: 'info',
            confirmButtonText: 'Aceptar'
          });
        }
          
        } catch (error) {
           console.log("error",{error})
          dispatch(onLogout('credenciales incorrectas'));
          setTimeout(() => {
            dispatch(clearErrorMessage());// Limpia el mensaje de error después de un tiempo
          }, 10);

        }

    }

    // ////revalidar el token //////////
    const checkAuthToken = async () => {
      const token = localStorage.getItem('token');
    
      if (!token) {///si no hay token lo envia al inicio de sesion 
        dispatch(onLogout());
        return;
      }
    
      try {
        const { data } = await noahApi.get('/login/renew', {
          headers: { 'x-token': token }, ///se resibe token del headers 
        });
    
        localStorage.setItem('token', data.token);
        localStorage.setItem('token-init-date', new Date().getTime());
    
        dispatch(onLogin({ id: data.id, nombre: data.nombre, id_usuario: data.id_usuario }));
      } catch (error) {
        console.error('Error al renovar el token:', error);
        localStorage.clear();
        dispatch(onLogout());
      }
    };

    //////logout para sacar al usuario ///

    const startLogout=()=>{
      localStorage.clear();
      dispatch(onLimpiaraspecto());
      dispatch(onLogout());

    }

  return {
     ///propiedades
     status, 
     user, 
     errorMessage,
    

     ///metodos
     startLogin,
     checkAuthToken,
     startLogout

  }
}
