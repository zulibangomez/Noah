import { useDispatch, useSelector } from 'react-redux'
import { AppTheme } from './theme'
import {Navigate,Routes, Route} from 'react-router-dom';
import { useAuthStore } from './hooks';
import { LoginPage } from './auth/pages';
import { useEffect } from 'react';

//import { MenusGeneralSist } from './app/pages/full-layout-page/shared/MenusGeneralSist';
import { MenusGeneralSist } from './shared/MenusGeneralSist';
export const RuahApp = () => {
//const authStatus='not-authenticated';

const {checkAuthToken, startLogin, status}= useAuthStore();

 useEffect(() => {
  checkAuthToken()
 }, [])

 if (status === 'checking') {
  return <h3>Validando autenticación...</h3>; // Pantalla de carga mientras se valida
}

  return (
    <AppTheme>
     <Routes>
     {
          status === 'not-authenticated' ? (
            // Rutas publicas
            <>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/*" element={<Navigate to="/login" />} />
            </>
          ) : (
            // Rutas privadas
            <>
              <Route path="/" element={<MenusGeneralSist />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )
        }        
                             

      </Routes>
    </AppTheme>
  )
}
