import React from "react";
import Typography from "@mui/material/Typography";

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

function VerEscenasPerfil({ datos }) {

  

  return (
    <Grid item xs={12} sm={12} lg={6}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 350 }} size="small" aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <StyledTableCell width="50%" align="center" colSpan={2}>
                <Typography variant="h6">Escenas</Typography>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <b>101010</b>
              </TableCell>
              <TableCell>Escena 01</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>202020</b>
              </TableCell>
              <TableCell>Escena 02</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>303030</b>
              </TableCell>
              <TableCell>Escena 03</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>404040</b>
              </TableCell>
              <TableCell>Escena 04</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter></TableFooter>
        </Table>
      </TableContainer>
    </Grid>
  );
}

export default VerEscenasPerfil;
