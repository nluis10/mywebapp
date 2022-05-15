import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import Divider from "@mui/material/Divider";

import Grid from "@mui/material/Grid";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import TableFooter from "@mui/material/TableFooter";

import Paper from "@mui/material/Paper";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import { useParams } from "react-router-dom";

import MyAppBar from "../../components/myAppBar/MyAppBar";

const drawerWidth = 200;

function PerfilModelo({ token, usuEmail, rol, borrarToken,apiURL }) {
  let navegacion = useNavigate();
  const [datos, setDatos] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  const { cedula } = useParams();

  console.log(cedula);

  let cargarDatos = () => {
    fetch(`${apiURL}/api/perfil/${cedula}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token-jwt": token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setDatos({
          nombre: data.nombre,
          apellido: data.apellido,
          cedula: data.cedula,
          alias: data.alias,
          sexo: data.sexo,
          fechaNacimiento: data.fechaNacimiento,
          ciudad: data.ciudad,
          status: data.status,
          email: data.email,
          facebook: data.facebook,
          twitter: data.twitter,
          instagram: data.instagram,
          youtube: data.youtube,
          pornhub: data.pornhub
        });
      });
  };

  useEffect(() => {
    //console.log('0')
    if (!token) {
      navegacion("/login");
    } else if (rol !== "Administrador") {
      enqueueSnackbar("PERMISO DENEGADO", { variant: "warning" });
      enqueueSnackbar("ENVIADO A PAGINA DE BIENVENIDA", { variant: "warning" });
      navegacion("/");
    } else {
      cargarDatos();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <MyAppBar usuEmail={usuEmail} borrarToken={borrarToken} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        <Typography variant="h4">Perfil de {datos.nombre} {datos.apellido}</Typography>
        <Divider sx={{ mt: 2, mb: 3 }} />
            <Grid container rowSpacing={2}>
              <Grid item xs={12} sm={12} lg={8}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} size="small" aria-label="custom pagination table">
                    <TableHead>
                      <TableRow>
                        <TableCell width="40%" >
                          <Typography variant="h6">Datos</Typography>
                        </TableCell>
                        <TableCell></TableCell>
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
                    </TableBody>
                    <TableFooter></TableFooter>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
      </Box>
    </Box>
  );
}

export default PerfilModelo;
