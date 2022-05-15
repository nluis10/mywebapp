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

import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";

import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";

import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import MyAppBar from "../../components/myAppBar/MyAppBar";

const drawerWidth = 200;

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="next page">
        {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="last page">
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};


const rows = [];

function Modelos({token,usuEmail,rol,borrarToken}) {

  let navegacion = useNavigate()
  const [modelosDB, setModelosDB] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  let cargarDatos = () => {
    fetch("http://localhost:8000/api/modelos",{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token-jwt": token
      },
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setModelosDB(data);
      });
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const verPerfil = (e) => {
    navegacion(`/perfil/${e.target.value}`)
  }

  useEffect(() => {
    //console.log('0')
    if (!token){
      navegacion('/login')
    }else if(rol !== 'Administrador'){
      enqueueSnackbar('PERMISO DENEGADO', {variant: 'warning'} );
      enqueueSnackbar('ENVIADO A PAGINA DE BIENVENIDA', {variant: 'warning'} );
      navegacion('/')
    }else{
      cargarDatos();
    }
    // eslint-disable-next-line
  },[]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <MyAppBar usuEmail={usuEmail} borrarToken={borrarToken}/>
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        <Typography variant="h4">Modelos</Typography>
        <Divider sx={{ mt: 2, mb: 3 }} />
        <Card sx={{ minWidth: 275 }}>
          <CardActions sx={{ mt: 1, ml: 1, mr: 1 }}>
            <TextField id="outlined-basic" label="Buscar.." variant="outlined" />
            <Divider orientation="vertical" sx={{ flexGrow: 1 }} />
            <Button component={Link} to="/agregarModelo" variant="contained" startIcon={<AddIcon />}>
              Agregar Modelo
            </Button>
          </CardActions>
          <CardContent>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="custom pagination table">
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Apellido</TableCell>
                    <TableCell>Cedula</TableCell>
                    <TableCell>Alias</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0 ? modelosDB.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : modelosDB).map((row) => (
                    <TableRow key={row._id}>
                      <TableCell component="th" scope="row">{row.modeloId}</TableCell>
                      <TableCell >{row.nombre}</TableCell>
                      <TableCell >{row.apellido}</TableCell>
                      <TableCell >{row.cedula}</TableCell>
                      <TableCell >{row.alias}</TableCell>
                      <TableCell >{row.status}</TableCell>
                      <TableCell align="center"><Button onClick={verPerfil} value={row.cedula} variant="contained" size="small" color="info">Ver Perfil</Button></TableCell>
                    </TableRow>
                  ))}
                  
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 33 * emptyRows }}>
                      <TableCell colSpan={7} />
                    </TableRow>
                  )}
                  
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[10, 20, 50,]}
                      colSpan={7}
                      count={rows.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: {
                          "aria-label": "rows per page",
                        },
                        native: true,
                      }}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default Modelos;
