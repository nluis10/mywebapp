import React from "react";
import axios from "axios";

import "./VerDocumentosPerfil.css";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import { tableCellClasses } from '@mui/material/TableCell';

import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Slide from "@mui/material/Slide";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { useSnackbar } from "notistack";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import { useNavigate } from "react-router-dom";

//VARIABLE PARA EL MODAL AGREGAR DOCUMENTO
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

//VARIABLE PARA EL MODAL AGREGAR DOCUMENTO
const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

//VARIABLE PARA EL MODAL VER IMAGEN
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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


function VerDocumentosPerfil({ datos, apiURL, token }) {
  const navegacion = useNavigate();

  const [imagenesDB, setImagenesDB] = useState([]);

  const [file, setFile] = useState();
  const [descripcion, setDescripcion] = useState("");

  const [open, setOpen] = useState(false);
  const [openImg, setOpenImg] = useState(false);

  const [imagenModal, setImagenModal] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenImg = (e) => {
    setImagenModal(`${apiURL}/api/${e.target.value}`);
    setOpenImg(true);
  };

  const handleCloseImg = () => {
    setOpenImg(false);
    setImagenModal("");
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!file) {
      enqueueSnackbar("SELECCIONE UN ARCHIVO", { variant: "warning" });
      return false;
    }
    console.log(file);
    const result = await postImage({ image: file, descripcion: descripcion, cedula: datos.cedula });
    console.log(result);
    enqueueSnackbar("ARCHIVO AGREGADO CORRECTAMENTE", { variant: "success" });
    navegacion(`/blankPage`);
    navegacion(`/perfil/${datos.cedula}`);
  };

  async function postImage({ image, descripcion, cedula }) {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("descripcion", descripcion);
    formData.append("cedula", cedula);

    const result = await axios.post(`${apiURL}/api/images`, formData, { headers: { "Content-Type": "multipart/form-data", "auth-token-jwt": token } });
    console.log(result);
    return result.data;
  }

  const fileSelected = (e) => {
    const file = e.target.files[0];
    setFile(file);
    //console.log(file);
  };

  //Tema para el modal de la imagen
  const theme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#000000",
      },
      secondary: {
        main: "#000000",
      },
      background: {
        default: "#000000",
        paper: "#232323",
      },
    },
  });

  //Actualizar array con las imagnes
  useEffect(() => {
    if (datos.imagenes){
      console.log(datos.imagenes)
      setImagenesDB(datos.imagenes)
    }
  });

  return (
    <Grid item xs={12} sm={12} lg={6}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 350 }} size="small" aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <StyledTableCell width="50%" align="center" colSpan={2}>
                <Typography variant="h6">Documentos</Typography>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {imagenesDB.map((img) => {
              return (
                <TableRow key={img.ruta}>
                  <TableCell>
                    <b>{img.descripcion}</b>
                  </TableCell>
                  <TableCell>
                    <Button onClick={handleClickOpenImg} value={img.ruta} variant="outlined" size="small" color="info">
                      VER IMAGEN
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
            <TableRow>
              <TableCell align="center" colSpan={2}>
                <Button onClick={handleClickOpen} value={datos.cedula} variant="contained" size="small" color="info">
                  Agregar documentos
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
          <TableFooter></TableFooter>
        </Table>
      </TableContainer>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Agregar Documento
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <ValidatorForm component="form" onSubmit={submit} noValidate sx={{ mt: 1 }}>
            <Grid container rowSpacing={2}>
              <Grid item xs={12} sm={6} lg={6} sx={{ pl: 1, pr: 1 }}>
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
              <Grid item xs={12} sm={6} lg={6} sx={{ pl: 1, pr: 1, mt: 2 }}>
                <TextField onChange={fileSelected} id="outlined-basic" label="" type="file" accept="image/*" variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={4} lg={4} sx={{ pl: 1, pr: 1, mt: 2 }}></Grid>
              <Grid item lg={4} sx={{ pt: 2, pl: 2, pr: 2 }}>
                <Button size="large" type="submit" fullWidth variant="contained">
                  Agregar
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} lg={4} sx={{ pl: 1, pr: 1, mt: 2 }}></Grid>
            </Grid>
          </ValidatorForm>
        </DialogContent>
      </BootstrapDialog>
      <ThemeProvider theme={theme}>
        <Dialog fullScreen open={openImg} onClose={handleCloseImg} TransitionComponent={Transition}>
          <AppBar sx={{ position: "fixed" }}>
            <Toolbar>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div"></Typography>
              <Button autoFocus color="inherit" onClick={handleCloseImg}>
                CERRAR
              </Button>
              <IconButton edge="start" color="inherit" onClick={handleCloseImg} aria-label="close">
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <img className="modalImg" src={imagenModal} alt="IMAGEN DEL DOCUMENTO"></img>
        </Dialog>
      </ThemeProvider>
    </Grid>
  );
}

export default VerDocumentosPerfil;
