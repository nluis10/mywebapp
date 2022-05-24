import React from "react";
import axios from 'axios'
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

function AgregarModelo({ token, usuEmail, rol, borrarToken, apiURL }) {

  let navegacion = useNavigate();

 const [file, setFile] = useState()
 const [descripcion, setDescripcion] = useState("")


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


  const submit = async (e) => {
    e.preventDefault();
    if(!file){
      enqueueSnackbar("SELECCIONE UN ARCHIVO", { variant: "warning" });
      return false
    }
    console.log(file)
    const result = await postImage({image: file, descripcion})
    console.log(result)
    

  }

  async function postImage({image, descripcion}){
    const formData = new FormData();
    formData.append("image", image)
    formData.append("descripcion", descripcion)
    
    const result = await axios.post(`${apiURL}/api/images`, formData, {headers: {'Content-Type': 'multipart/form-data', "auth-token-jwt": token}})
    console.log(result)
    return result.data
  }

  const fileSelected = (e) => {
    const file = e.target.files[0]
    setFile(file);
    //console.log(file);
  }


  return (
    <ValidatorForm component="form" onSubmit={submit} noValidate sx={{ mt: 1 }}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <MyAppBar usuEmail={usuEmail} borrarToken={borrarToken} />
        <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
          <Toolbar />
          <Typography variant="h4">Agregar Documentos</Typography>
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
                    id="descripcion"
                    label="Descripcion"
                    type="text"
                    name="descripcion"
                    value={descripcion}
                    onChange={(event) => setDescripcion(event.target.value)}
                    validators={["required"]}
                    errorMessages={["Este campo es obligatorio"]}
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={4} sx={{ pl: 1, pr: 1, mt: 2 }}>
                  <TextField onChange={fileSelected} id="outlined-basic" label="" type="file" accept="image/*" variant="outlined" />
                </Grid>
                <Grid item lg={4} sx={{ pl: 1, pr: 1 }}></Grid>
                <Grid item xs={12} sx={{ pl: 1, pr: 1 }}></Grid>
                
                <Grid item lg={4} sx={{ pt: 2, pl: 2, pr: 2 }}>
                  <Button size="large" type="submit" fullWidth variant="contained">
                    Agregar
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} lg={4} sx={{ pl: 1, pr: 1, mt: 2 }}>

                  <img src= "http://localhost:8000/api/s3Image/aee895f3ea73e26c5e3b76a0bc878a56" alt="Mi imagen02"></img>
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
