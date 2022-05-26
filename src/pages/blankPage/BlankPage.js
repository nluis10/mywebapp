import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import MyAppBar from "../../components/myAppBar/MyAppBar";

const drawerWidth = 200;

function BlankPage({token,usuEmail,rol,borrarToken,apiURL}) {

  let navegacion = useNavigate()
  const { enqueueSnackbar } = useSnackbar();


  useEffect(() => {
    //console.log('0')
    if (!token){
      navegacion('/login')
    }else if(rol !== 'Administrador'){
      enqueueSnackbar('PERMISO DENEGADO', {variant: 'warning'} );
      enqueueSnackbar('ENVIADO A PAGINA DE BIENVENIDA', {variant: 'warning'} );
      navegacion('/')
    }else{
      //cargarDatos();
    }
    // eslint-disable-next-line
  },[]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <MyAppBar usuEmail={usuEmail} borrarToken={borrarToken}/>
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        <Typography variant="h4">Blank Page</Typography>
        <Divider sx={{ mt: 2, mb: 3 }} />

      </Box>
    </Box>
  );
}

export default BlankPage;
