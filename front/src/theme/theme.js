import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';
// configuracion del tema en general 
export const theme =createTheme({
    components: {
        MuiTypography: {
          defaultProps: {
            variantMapping: {
              h1: 'h2',
              h2: 'h2',
              h3: 'h2',
              h4: 'h2',
              h5: 'h2',
              h6: 'h2',
              subtitle1: 'h2',
              subtitle2: 'h2',
              body1: 'span',
              body2: 'span',
            },
          },
        },
      },


    palette:{
        primary:{
            main: '#0f82b1'
        },
        secondary: {
             main: '#543884'
        },
        tertiary:{
            main:'#030581'

        },
        customColor1: {
            main: '#000307', // Agrega el color hexadecimal que prefieras
        },
        customColor2: {
            main: '#e46363', // Agrega el color hexadecimal que prefieras
        },
        customColor3: {
            main: '#aaee9d', // Agrega el color hexadecimal que prefieras
        },
        btnAdd: {
            main: '#27ae60', // Agrega el color hexadecimal que prefieras
        },
        btnUpdate: {
            main: '#2874a6', // Agrega el color hexadecimal que prefieras
        },
        btnDelete: {
            main: '#c0392b', // Agrega el color hexadecimal que prefieras
        },


        error:{
            main: red.A400
        }
        
    }
})