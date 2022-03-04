import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import TextField from "@mui/material/TextField";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import MyAppBar from "../../components/myAppBar/MyAppBar";
import MyDrawerBox from "../../components/myDrawerBox/MyDrawerBox";

const drawerWidth = 200;

function createData(id, name, last, cc, alias, status) {
  return { id, name, last, cc, alias, status };
}

const rows = [
  createData("1010", "Carolina", "Garcia", 123456789, "Carolina", "Activo"),
  createData("2020", "Cindy", "Garcia", 741852963, "Cindy", "Activo"),
  createData("3030", "Kelly", "Roque", 963852741, "Kelly", "Activo"),
  createData("4040", "Robi", "Roque", 789456123, "Robi", "Inactivo"),
  createData("5050", "Maye", "Gonzalez", 987654321, "Maye", "Activo"),
  createData("6060", "Flor", "Gonzalez", 369258147, "Flor", "Activo"),
  createData("7070", "Danny", "Pelaez", 258147369, "Danny", "Inactivo"),
  createData("8080", "Luigi", "Pelaez", 172839654, "Luigi", "Activo"),
];

function Modelos(props) {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <MyAppBar />
      <MyDrawerBox />
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        <Typography variant="h4">Modelos</Typography>
        <Divider sx={{ mt: 2, mb: 3 }} />
        <Card sx={{ minWidth: 275 }}>
          <CardActions sx={{ mt: 1, ml: 1, mr: 1 }}>
          <TextField id="outlined-basic" label="Buscar.." variant="outlined"/>
          <Divider orientation="vertical" sx={{ flexGrow: 1 }}/>
            <Button variant="contained" startIcon={<AddIcon />}>
              Agregar Modelo
            </Button>
          </CardActions>
          <CardContent>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell >Nombre</TableCell>
                    <TableCell >Apellido</TableCell>
                    <TableCell >Cedula</TableCell>
                    <TableCell >Alias</TableCell>
                    <TableCell >Status</TableCell>
                    <TableCell ></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell component="th" scope="row">{row.id}</TableCell>
                      <TableCell >{row.name}</TableCell>
                      <TableCell >{row.last}</TableCell>
                      <TableCell >{row.cc}</TableCell>
                      <TableCell >{row.alias}</TableCell>
                      <TableCell >{row.status}</TableCell>
                      <TableCell align="center"><Button variant="outlined" size="small">Ver Perfil</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default Modelos;
