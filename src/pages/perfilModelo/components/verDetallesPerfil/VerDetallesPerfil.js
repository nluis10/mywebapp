import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import Grid from "@mui/material/Grid";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import { tableCellClasses } from '@mui/material/TableCell';

import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

//Estilos para la tabla
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#2196f3',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function VerDetallesPerfil({ datos }) {



  return (
    <Grid item xs={12} sm={12} lg={6}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 350 }} size="small" aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <StyledTableCell width="50%" align="center" colSpan={2}>
                <Typography variant="h6">Detalles</Typography>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <b>Color de ojos</b>
              </TableCell>
              <TableCell>{datos.nombre}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Color del cabello</b>
              </TableCell>
              <TableCell>{datos.apellido}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Grupo</b>
              </TableCell>
              <TableCell>{datos.cedula}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Arte corporal</b>
              </TableCell>
              <TableCell>{datos.alias}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Tipo de cuerpo</b>
              </TableCell>
              <TableCell>{datos.sexo}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Tipo de culo</b>
              </TableCell>
              <TableCell>{datos.fechaNacimiento}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Tipo de tetas</b>
              </TableCell>
              <TableCell>{datos.ciudad}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Peso</b>
              </TableCell>
              <TableCell>{datos.status}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Altura</b>
              </TableCell>
              <TableCell>{datos.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" colSpan={2}>
                <Button variant="contained" size="small" color="info">
                  Editar detalles
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
          <TableFooter></TableFooter>
        </Table>
      </TableContainer>
    </Grid>
  );
}

export default VerDetallesPerfil;
