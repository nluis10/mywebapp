import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";

import TextField from "@mui/material/TextField";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import MyAppBar from "../../components/myAppBar/MyAppBar";

import { useState } from "react/cjs/react.development";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const drawerWidth = 200;

function AgregarModelo({ token, usuEmail, rol, borrarToken }) {
  const [modeloForm, setModeloForm] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    alias: "",
    sexo: "",
    ciudad: "",
    status: "",
    email: "",
  });

  let navegacion = useNavigate();

  const [date, setDate] = React.useState(new Date(null));

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    //console.log('0')
    if (!token) {
      navegacion("/login");
    } else if (rol !== "Administrador") {
      enqueueSnackbar("PERMISO DENEGADO", { variant: "warning" });
      enqueueSnackbar("ENVIADO A PAGINA DE BIENVENIDA", { variant: "warning" });
      navegacion("/");
    } else {
      console.log("Ok");
    }
    // eslint-disable-next-line
  }, []);

  async function verificarCedula(cedula){
    
    const response = await fetch(`http://localhost:8000/api/verificarCedula/${cedula}`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token-jwt": token,
      },
    });
    const data = await response.json();
    if (data){
      enqueueSnackbar("YA EXISTE LA CEDULA", { variant: "warning" });
      return 1
    }else{
      return 0
    }
  }

  async function verificarEmail(email){
    const response = await fetch(`http://localhost:8000/api/verificarEmail/${email}`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token-jwt": token,
      },
    });
    const data = await response.json();
    if (data){
      enqueueSnackbar("YA EXISTE EL CORREO ELECTRONICO", { variant: "warning" });
      return 1
    }else{
      return 0
    }
  }

  async function agregar (e) {
    e.preventDefault();

    let verCedula = await verificarCedula(e.target.cedula.value);
    let verEmail = await verificarEmail(e.target.email.value);
   
      
    if (verCedula === 0 && verEmail === 0) {
      
      const datos = {
        nombre: e.target.nombre.value,
        apellido: e.target.apellido.value,
        cedula: e.target.cedula.value,
        alias: e.target.alias.value,
        sexo: e.target.sexo.value,
        fechaNacimiento: e.target.fechaNacimiento.value,
        ciudad: e.target.ciudad.value,
        status: e.target.status.value,
        email: e.target.email.value,
        facebook: e.target.facebook.value,
        twitter: e.target.twitter.value,
        instagram: e.target.instagram.value,
        youtube: e.target.youtube.value,
        pornhub: e.target.pornhub.value,
      };

      fetch("http://localhost:8000/api/agregarModelo", {
        method: "POST",
        body: JSON.stringify(datos),
        headers: {
          "Content-Type": "application/json",
          "auth-token-jwt": token,
        },
      })
        .then((res) => res.json())
        .catch((error) => {
          console.error("Error:", error);
        })
        .then((response) => {
          console.log(response);
          enqueueSnackbar("MODELO AGREGADO CORRECTAMENTE", { variant: "success" });
          navegacion("/modelos");
        });
    }
  };

  return (
    <ValidatorForm component="form" onSubmit={agregar} noValidate sx={{ mt: 1 }}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <MyAppBar usuEmail={usuEmail} borrarToken={borrarToken} />
        <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
          <Toolbar />
          <Typography variant="h4">Agregar Modelo</Typography>
          <Divider sx={{ mt: 2, mb: 3 }} />
          <Card sx={{ minWidth: 275 }}>
            <CardActions sx={{ mt: 1, ml: 1, mr: 1 }}></CardActions>
            <CardContent>
              <Grid container rowSpacing={2}>
                <Grid item xs={12} sm={6} lg={4} sx={{ pl: 1, pr: 1 }}>
                  <TextValidator
                    margin="normal"
                    required
                    fullWidth
                    id="nombre"
                    label="Nombre"
                    type="text"
                    name="nombre"
                    value={modeloForm.nombre}
                    onChange={(event) => setModeloForm({ ...modeloForm, nombre: event.target.value })}
                    validators={["required"]}
                    errorMessages={["Este campo es obligatorio"]}
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={4} sx={{ pl: 1, pr: 1 }}>
                  <TextValidator
                    margin="normal"
                    required
                    fullWidth
                    id="apellido"
                    label="Apellido"
                    type="text"
                    name="apellido"
                    value={modeloForm.apellido}
                    onChange={(event) => setModeloForm({ ...modeloForm, apellido: event.target.value })}
                    validators={["required"]}
                    errorMessages={["Este campo es obligatorio"]}
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={4} sx={{ pl: 1, pr: 1 }}>
                  <TextValidator
                    margin="normal"
                    required
                    fullWidth
                    id="cedula"
                    label="Cedula"
                    type="text"
                    name="cedula"
                    value={modeloForm.cedula}
                    onChange={(event) => setModeloForm({ ...modeloForm, cedula: event.target.value })}
                    validators={["required", "isNumber"]}
                    errorMessages={["Este campo es obligatorio", "Este es un campo numerico"]}
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={4} sx={{ pl: 1, pr: 1 }}>
                  <TextValidator
                    margin="normal"
                    required
                    fullWidth
                    id="alias"
                    label="Alias"
                    type="text"
                    name="alias"
                    value={modeloForm.alias}
                    onChange={(event) => setModeloForm({ ...modeloForm, alias: event.target.value })}
                    validators={["required"]}
                    errorMessages={["Este campo es obligatorio"]}
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={4} sx={{ pl: 1, pr: 1 }}>
                  <TextValidator
                    margin="normal"
                    select
                    required
                    fullWidth
                    id="sexo"
                    label="Sexo"
                    type="text"
                    name="sexo"
                    value={modeloForm.sexo}
                    onChange={(event) => setModeloForm({ ...modeloForm, sexo: event.target.value })}
                    validators={["required"]}
                    errorMessages={["Este campo es obligatorio"]}
                  >
                    <MenuItem value="Masculino">Masculino</MenuItem>
                    <MenuItem value="Femenino">Femenino</MenuItem>
                    <MenuItem value="Transsexual">Transsexual</MenuItem>
                  </TextValidator>
                </Grid>
                <Grid item xs={12} sm={6} lg={4} sx={{ pl: 1, pr: 1, mt: 2 }}>
                  <FormControl fullWidth>
                    <LocalizationProvider id="fechaNacimiento" dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Fecha de Nacimiento"
                        inputFormat="dd/MM/yyyy"
                        value={date}
                        onChange={(newValue) => {
                          setDate(newValue);
                        }}
                        renderInput={(params) => <TextField id="fechaNacimiento" {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} lg={4} sx={{ pl: 1, pr: 1 }}>
                  <TextValidator
                    margin="normal"
                    required
                    fullWidth
                    id="ciudad"
                    label="Ciudad"
                    type="text"
                    name="ciudad"
                    value={modeloForm.ciudad}
                    onChange={(event) => setModeloForm({ ...modeloForm, ciudad: event.target.value })}
                    validators={["required"]}
                    errorMessages={["Este campo es obligatorio"]}
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={4} sx={{ pl: 1, pr: 1 }}>
                  <TextValidator
                    margin="normal"
                    select
                    required
                    fullWidth
                    id="status"
                    label="Status"
                    type="text"
                    name="status"
                    value={modeloForm.status}
                    onChange={(event) => setModeloForm({ ...modeloForm, status: event.target.value })}
                    validators={["required"]}
                    errorMessages={["Este campo es obligatorio"]}
                  >
                    <MenuItem value="Activo">Activo</MenuItem>
                    <MenuItem value="Inactivo">Inactivo</MenuItem>
                  </TextValidator>
                </Grid>
                <Grid item xs={12} sm={6} lg={4} sx={{ pl: 1, pr: 1 }}>
                  <TextValidator
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Correo electronico"
                    type="text"
                    name="email"
                    value={modeloForm.email}
                    onChange={(event) => setModeloForm({ ...modeloForm, email: event.target.value })}
                    validators={["required", "isEmail"]}
                    errorMessages={["Este campo es obligatorio", "Correo electronico invalido"]}
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={4} sx={{ pl: 1, pr: 1, mt: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="facebook">Facebook</InputLabel>
                    <OutlinedInput id="facebook" label="Facebook" />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} lg={4} sx={{ pl: 1, pr: 1, mt: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="twitter">Twitter</InputLabel>
                    <OutlinedInput id="twitter" label="Twitter" />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} lg={4} sx={{ pl: 1, pr: 1, mt: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="instagram">Instagram</InputLabel>
                    <OutlinedInput id="instagram" label="Instagram" />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} lg={4} sx={{ pl: 1, pr: 1, mt: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="youtube">Youtube</InputLabel>
                    <OutlinedInput id="youtube" label="Youtube" />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} lg={4} sx={{ pl: 1, pr: 1, mt: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="pornhub">Pornhub</InputLabel>
                    <OutlinedInput id="pornhub" label="Pornhub" />
                  </FormControl>
                </Grid>
                <Grid item lg={4} sx={{ pl: 1, pr: 1 }}></Grid>
                <Grid item xs={12} sx={{ pl: 1, pr: 1 }}></Grid>
                <Grid item lg={4} sx={{ pl: 1, pr: 1 }}></Grid>
                <Grid item lg={4} sx={{ pt: 2, pl: 2, pr: 2 }}>
                  <Button size="large" type="submit" fullWidth variant="contained">
                    Agregar
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </ValidatorForm>
  );
}

export default AgregarModelo;
