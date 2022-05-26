import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react/cjs/react.development";

import { useSnackbar } from "notistack";

import Modelos from "./pages/modelos/Modelos";
import AgregarModelo from "./pages/agregarModelo/AgregarModelo";
import AgregarDocumento from "./pages/agregarDocumento/AgregarDocumento";
import PerfilModelo from "./pages/perfilModelo/PerfilModelo";
import Movies from "./pages/movies/Movies";
import BlankPage from "./pages/blankPage/BlankPage";
import Login from "./pages/login/Login";

function App(props) {
  const [token, setToken] = useState("");
  const [usuEmail, setusuEmail] = useState("usuario");
  const [datosUsu, setDatosUsu] = useState({});
  const [rolUsu, setRolUsu] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  //const apiURL = "http://localhost:8000";
  const apiURL = "https://nodejswebapi.herokuapp.com";

  const iniciarSesion = (datos, navegacion) => {
    fetch(`${apiURL}/api/login`, {
      method: "POST",
      body: JSON.stringify(datos),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => {
        console.error("Error:", error);
      })
      .then((response) => {
        //console.log(response)
        if (response.usuario) {
          setDatosUsu(response);
          setToken(response.token);
          setusuEmail(response.usuario);
          setRolUsu(response.tipoUsuario);
          navegacion("/modelos");
          enqueueSnackbar(`${response.mensaje} ${response.usuario}`, {variant: 'info'} );
        } else {
          enqueueSnackbar(response.mensaje, {variant: 'error'} );
        }
      });
  };

  const borrarToken = () => {
    setToken("");
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/modelos"} element={<Modelos token={token} usuEmail={usuEmail} rol={rolUsu} borrarToken={borrarToken} apiURL={apiURL}/>} />
        <Route path={"/agregarModelo"} element={<AgregarModelo token={token} usuEmail={usuEmail} rol={rolUsu} borrarToken={borrarToken} apiURL={apiURL}/>} />
        <Route path={"/agregarDocumento/:cedula"} element={<AgregarDocumento token={token} usuEmail={usuEmail} rol={rolUsu} borrarToken={borrarToken} apiURL={apiURL}/>} />
        <Route path={"/perfil/:cedula"} element={<PerfilModelo token={token} usuEmail={usuEmail} rol={rolUsu} borrarToken={borrarToken} apiURL={apiURL}/>} />
        <Route path={"/movies"} element={<Movies token={token} usuEmail={usuEmail} rol={rolUsu} borrarToken={borrarToken} apiURL={apiURL}/>} />
        <Route path={"/blankPage"} element={<BlankPage token={token} usuEmail={usuEmail} rol={rolUsu} borrarToken={borrarToken} apiURL={apiURL}/>} />
        <Route path={"/login"} element={<Login sesion={iniciarSesion} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
