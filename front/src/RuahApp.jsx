import { useDispatch, useSelector } from 'react-redux'
import { AppTheme } from './theme'
import {Navigate,Routes, Route} from 'react-router-dom';
import { useAuthStore } from './hooks';
import { LoginPage } from './auth/pages';
import { useEffect } from 'react';

//import { MenusGeneralSist } from './app/pages/full-layout-page/shared/MenusGeneralSist';
import { MenusGeneralSist } from './shared/MenusGeneralSist';
import { ConfiGeneralAs } from './app/pages/full-layout-page/evaluacionDocente/ConfiGeneralAs';
import { AspectosView } from './app/pages/full-layout-page/evaluacionDocente/aspectos';
import { PreguntaView } from './app/pages/full-layout-page/evaluacionDocente/preguntas';
import { RespuestaWiew } from './app/pages/full-layout-page/evaluacionDocente/opciones_respuestas/RespuestaWiew';
import { MenuLayout } from './shared/layout/MenuLayout';
import { Addcuestionario, EncuestaView } from './app/pages/full-layout-page/evaluacionDocente/encuestas';
import { AddPreguntas } from './app/pages/full-layout-page/evaluacionDocente/encuestas/AddPreguntas';
import { EvaluadorView } from './app/pages/full-layout-page/evaluacionDocente/estudiantesEvaluadores';

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
              <Route path="/*" element={<Navigate to="/login" replace />} />
            </>
          ) : (
            // Rutas privadas
            <>
             <Route path="/" element={<MenuLayout><ConfiGeneralAs /></MenuLayout> } />
            <Route path="/aspectos" element={<MenuLayout> <AspectosView /> </MenuLayout>} />
            <Route path="/preguntas" element={<MenuLayout> <PreguntaView /> </MenuLayout>} />
            <Route path="/respuestas" element={<MenuLayout> <RespuestaWiew /> </MenuLayout>} />
            <Route path="/encuestas" element={<MenuLayout> <EncuestaView /> </MenuLayout>} />
            <Route path="/adicion" element={<MenuLayout> <Addcuestionario /> </MenuLayout>} />
            <Route path="/adicionPregunta" element={<MenuLayout> <AddPreguntas /> </MenuLayout>} />
            <Route path="/vistaestudiante" element={<MenuLayout> <EvaluadorView /> </MenuLayout>} />
            <Route path="*" element={<Navigate to="/" />} /> 
            </>
          )
        }        
                             

      </Routes>
    </AppTheme>
  )
}
