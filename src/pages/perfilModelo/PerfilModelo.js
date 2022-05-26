import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

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
import VerDatosPerfil from "./components/verDatosPerfil/VerDatosPerfil";
import VerDetallesPerfil from "./components/verDetallesPerfil/VerDetallesPerfil";
import VerDocumentosPerfil from "./components/verDocumentosPerfil/VerDocumentosPerfil";
import VerEscenasPerfil from "./components/verEscenasPerfil/VerEscenasPerfil";

const drawerWidth = 200;

function PerfilModelo({ token, usuEmail, rol, borrarToken, apiURL }) {
  const navegacion = useNavigate();
  const [datos, setDatos] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  const { cedula } = useParams();

  //console.log(cedula);

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
          pornhub: data.pornhub,
          imagenes: data.imagenes
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
        <Typography variant="h4">
          Perfil de {datos.nombre} {datos.apellido}
        </Typography>
        <Divider sx={{ mt: 2, mb: 3 }} />
        <Grid container spacing={2} rowSpacing={2}>
          <VerDatosPerfil datos={datos} />

          <VerDetallesPerfil datos={datos} />

          <VerDocumentosPerfil datos={datos} apiURL={apiURL} token={token}/>

          <VerEscenasPerfil datos={datos} />
        </Grid>
      </Box>
    </Box>
  );
}

export default PerfilModelo;
