import { LogoutOutlined, MenuOutlined } from '@mui/icons-material'
import { AppBar, Box, IconButton, Toolbar, Typography, } from '@mui/material'
import React from 'react'
import { useAuthStore } from '../../hooks'

export const NavBar = ({drawerWidth}) => {//llega el espacio del menuLateral
  const{startLogout, user}=useAuthStore();
  
  return (
    <AppBar 
    position='fixed'
    sx={{
        width:{sm:`calc(100% - ${drawerWidth}px)`},//se resta el espacio del menu lateral 
        ml:{sm:`${drawerWidth}px`}
    }}
    >
        <Toolbar>
            <IconButton 
            color='inherit'
            edge="start"
            sx={{mr:2, display:{sm:'none'}}}
            >
              <MenuOutlined/>
            </IconButton>
            <Box display="flex" flexGrow={1} justifyContent="space-between" alignItems="center">
              <Typography variant='h6' noWrap component='div'>NOAH</Typography>
              
              <IconButton  color="customColor1"
              onClick={startLogout}>
                <LogoutOutlined />
              </IconButton>
            
            </Box>
            
        </Toolbar>

    </AppBar>
  )
}
