import {Google} from '@mui/icons-material';
import { Grid, TextField, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { AuthVistaGeneral } from '../layout/AuthVistaGeneral';

export const Recuperarclave = () => {
  return (
    <AuthVistaGeneral titulo='Recuperar Contraseña'>
      <form>
                <Grid container>
                {/* en pantallas pequeñas tomar todo el ancho posible */}
                    <Grid item xs={ 12} sx= {{ mt:2}} >
                      <TextField label='Correo electrónico' type='email' placeholder='correo@unicesmag.edu.co' fullWidth />
                    </Grid>
                      <Grid container spacing={ 2} sx= {{ mt: 1}} >
                        <Grid item xs={12} sm={ 12 } >
                          
                            <Button type="submit"
                              variant="contained"
                              fullWidth
                              sx={{
                                padding: 2,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            >
                                Recuperar Contraseña
                            </Button>
                          
                        </Grid>
                          
                        <Grid container direction='row' justifyContent='end'>
                          <Link  color='inherit' to={"/auth/login"}>
                          Iniciar sesión
                          </Link>
                        </Grid>
                        
                          
                    </Grid>
                </Grid>

              </form>
    </AuthVistaGeneral>
        

      
  );
};
