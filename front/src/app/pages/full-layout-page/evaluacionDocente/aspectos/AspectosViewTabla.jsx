import { useState } from "react";
import { useAspectoStore } from "./services/useAspectoStore"
import { useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";


export const AspectosViewTabla = () => {
    const{listaAspectos, events, deleteEventoAspecto}=useAspectoStore();
    /////listar aspectos///
    useEffect(()=>{
      const fetchData=async()=>{
      try {
        await listaAspectos();
        console.log('lista de aspectos',listaAspectos());
      } catch (error) {
        console.error('error al listar'.error)
      }
      };
      fetchData();

    }, [listaAspectos])
  return (
    <TableContainer>
        <Table>
            <TableHead>
                <TableRow>
                     <TableCell>Nombre</TableCell>
                     <TableCell>Descripcion</TableCell>
                     <TableCell>Acciones</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {dataEvens.map((evento)=>{
                    const{id, nombre, descripcion} =evento;
                    return(
                        <TableRow key={id}>
                            <TableCell>{}</TableCell>

                        </TableRow>
                    )
                })}
            </TableBody>

        </Table>

    </TableContainer>
  )
}
