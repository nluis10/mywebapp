import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
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

const drawerWidth = 200;

function AgregarModelo({ token, usuEmail, rol, borrarToken }) {
  let navegacion = useNavigate();

  const [sexo, setSexo] = React.useState("Masculino");
  const [status, setStatus] = React.useState("Activo");
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

  var agregar = (e) => {

    e.preventDefault()

    const datos ={
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

    }

    //console.log(datos)

    fetch("http://localhost:8000/api/agregarModelo", {
      method: 'POST', 
      body: JSON.stringify(datos),
      headers:{
        'Content-Type': 'application/json',
        "auth-token-jwt": token
      }
    }).then(res => res.json())
    .catch(error => {
      console.error('Error:', error)
    })
    .then(response => {
      console.log(response)
      //NotificationManager.success(response.mensaje)
      //document.getElementById('cancelModalAg').click()
      //cargarDatos();
    });
  };

  return (
    <form onSubmit={agregar}>
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
              <Grid container rowSpacing={4}>
                <Grid item xs={12} sm={6} lg={4} sx={{ pl: 1, pr: 1 }}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="nombre">Nombre</InputLabel>
                    <OutlinedInput id="nombre" label="Nombre" />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} lg={4} sx={{ pl: 1, pr: 1 }}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="apellido">Apellido</InputLabel>
                    <OutlinedInput id="apellido" label="Apellido" />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} lg={4} sx={{ pl: 1, pr: 1 }}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="cedula">Cedula</InputLabel>
                    <OutlinedInput id="cedula" label="Cedula" />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} lg={4} sx={{ pl: 1, pr: 1 }}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="alias">Alias</InputLabel>
                    <OutlinedInput id="alias" label="Alias" />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} lg={4} sx={{ pl: 1, pr: 1 }}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="sexo">Sexo</InputLabel>
                    <Select
                      labelId="sexo"
                      id="sexo"
                      name="sexo"
                      value={sexo}
                      label="Sexo"
                      onChange={(e) => {
                        setSexo(e.target.value);
                      }}
                    >
                      <MenuItem value="Masculino">Masculino</MenuItem>
                      <MenuItem value="Femenino">Femenino</MenuItem>
                      <MenuItem value="Transsexual">Transsexual</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} lg={4} sx={{ pl: 1, pr: 1 }}>
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
                  <FormControl fullWidth>
                    <InputLabel htmlFor="ciudad">Ciudad</InputLabel>
                    <OutlinedInput id="ciudad" label="ciudad" />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} lg={4} sx={{ pl: 1, pr: 1 }}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="status">Status</InputLabel>
                    <Select
                      labelId="status"
                      id="status"
                      name="status"
                      value={status}
                      label="Status"
                      onChange={(e) => {
                        setStatus(e.target.value);
                      }}
                    >
                      <MenuItem value="Activo">Activo</MenuItem>
                      <MenuItem value="Inactivo">Inactivo</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} lg={4} sx={{ pl: 1, pr: 1 }}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="email">Correo electronico</InputLabel>
                    <OutlinedInput id="email" label="Correo electronico" />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} lg={4} sx={{ pl: 1, pr: 1 }}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="facebook">Facebook</InputLabel>
                    <OutlinedInput id="facebook" label="Facebook" />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} lg={4} sx={{ pl: 1, pr: 1 }}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="twitter">Twitter</InputLabel>
                    <OutlinedInput id="twitter" label="Twitter" />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} lg={4} sx={{ pl: 1, pr: 1 }}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="instagram">Instagram</InputLabel>
                    <OutlinedInput id="instagram" label="Instagram" />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} lg={4} sx={{ pl: 1, pr: 1 }}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="youtube">Youtube</InputLabel>
                    <OutlinedInput id="youtube" label="Youtube" />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} lg={4} sx={{ pl: 1, pr: 1 }}>
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
    </form>
  );
}

export default AgregarModelo;
