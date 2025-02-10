import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { theme } from './'; 
// configuracion del tema principal  y la parametro children es el tema principal del app


export const AppTheme = ({children}) => {
  return (
    <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    {/* componete interno que va a tener direntes hijos */}
     { children }
    </ThemeProvider>
  )
}
