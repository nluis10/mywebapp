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

import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

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

function VerDatosPerfil({ datos }) {

  

  return (
    <Grid item xs={12} sm={12} lg={6}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} size="small" aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <StyledTableCell width="40%" align="center" colSpan={2}>
                <Typography variant="h6">Datos</Typography>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <b>Nombre</b>
              </TableCell>
              <TableCell>{datos.nombre}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Apellido</b>
              </TableCell>
              <TableCell>{datos.apellido}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Cedula</b>
              </TableCell>
              <TableCell>{datos.cedula}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Alias</b>
              </TableCell>
              <TableCell>{datos.alias}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Sexo</b>
              </TableCell>
              <TableCell>{datos.sexo}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Fecha de nacimiento</b>
              </TableCell>
              <TableCell>{datos.fechaNacimiento}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Ciudad</b>
              </TableCell>
              <TableCell>{datos.ciudad}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Status</b>
              </TableCell>
              <TableCell>{datos.status}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Correo electronico</b>
              </TableCell>
              <TableCell>{datos.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Facebook</b>
              </TableCell>
              <TableCell>{datos.facebook}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Twitter</b>
              </TableCell>
              <TableCell>{datos.twitter}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Instagram</b>
              </TableCell>
              <TableCell>{datos.instagram}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Youtube</b>
              </TableCell>
              <TableCell>{datos.youtube}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>Pornhub</b>
              </TableCell>
              <TableCell>{datos.pornhub}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" colSpan={2}>
                <Button variant="contained" size="small" color="info">
                  Editar datos
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

export default VerDatosPerfil;
