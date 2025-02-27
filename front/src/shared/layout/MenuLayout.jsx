import { Box } from "@mui/system"
import { NavBar, SideBar} from "../components";
import { Toolbar } from "@mui/material";

///menu lateral
const drawerWidth=290;

import React from 'react'

export const MenuLayout = ({children}) => {
  return (
    
      <Box sx={{display:'flex'}}>
        <NavBar drawerWidth={drawerWidth}/>{/**se pone el menu lateral en el napar  */}
        <SideBar drawerWidth={drawerWidth}/>
      <Box component='main'
      sx={{flexGrow:1, p:3}}
      >
        <Toolbar/>
          {children}
      </Box>
  </Box>
    
  )
}
