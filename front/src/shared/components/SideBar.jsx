
import { TurnedInNot } from '@mui/icons-material'
import{Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, Grid} from '@mui/material'
import { useAuthStore } from '../../hooks';


//import { menuservice } from './menu.service';
//import { useState } from 'react';
export const SideBar = ({drawerWidth=240}) => {
    const{ user }=useAuthStore();//se llama al usuario t se muestra  
    //const{data}=menuservice();
   // const [data, setData] = useState([])
   const menuItems = [
    { id: 1, text: 'matricula', description: 'hkfdjkhfhskhfgkjk' },
    // Agrega más elementos aquí
  ];
  return (
    <Box 

    component='nav'
    sx={{width: {sm: drawerWidth}, flexShrink:{sm:0 }}}
    >
        <Drawer
         variant="permanent"
         open
         sx={{display: {sx: 'block'},
          '& .MuiDrrawer-paper':{ boxSizing: 'border-box', whidth: drawerWidth}
        }}
        >
        </Drawer>
        <Toolbar>
          <Typography variant="h9" noWrap component='div'>
            {user.nombre}
          </Typography>
          <Divider/>
        </Toolbar>
        <List>
          {
          [ 'Administrar Pagos','Admón.Prácticas','Consultorio Jurídico','Eventos','Gestion de Notas','Matriculas', 'Evaluación Docente'].map (text =>(
            <ListItem key={text} disablePadding>
              <ListItemButton >
              
                <ListItemIcon>
                <TurnedInNot/>
                </ListItemIcon>
              <Grid container>
                 <ListItemText primary={text}/>
                 <ListItemText secondary={''}/>
              </Grid>
              </ListItemButton>
            </ListItem>
          ))
          }

        </List>
    </Box>
    
  )
}
