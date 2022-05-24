import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import { useNavigate } from "react-router-dom";
import { useState } from "react/cjs/react.development";

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const theme = createTheme();

function Login({ sesion }) {
  const [loginForm, setLoginForm] = useState({
    email: "",
    contrasena: "",
  });

  let navegacion = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const datos = {
      email: event.target.email.value,
      contrasena: event.target.contrasena.value,
    };
    sesion(datos, navegacion);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Card sx={{ mt: { xs: 3, xl: 10 } }}>
          <CardContent sx={{ m: 2 }}>
            <CssBaseline />
            <Box
              sx={{
                marginTop: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                <OndemandVideoIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Inicio de sesion
              </Typography>
              <ValidatorForm component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} /*onError={errors => console.log(errors)}*/>
                <TextValidator
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Usuario"
                  type="email"
                  name="email"
                  value={loginForm.email}
                  onChange={(event) => setLoginForm({ ...loginForm, email: event.target.value })}
                  validators={["required", "isEmail"]}
                  errorMessages={["Este campo es obligatorio", "Correo electronico invalido"]}
                />
                <TextValidator
                  margin="normal"
                  required
                  fullWidth
                  name="contrasena"
                  label="Contraseña"
                  type="password"
                  id="contrasena"
                  value={loginForm.contrasena}
                  onChange={(event) => setLoginForm({ ...loginForm, contrasena: event.target.value })}
                  validators={["required"]}
                  errorMessages={["Este campo es obligatorio"]}
                />
                <FormControlLabel control={<Checkbox value="Recordarme" color="primary" />} label="Recordarme" />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Entrar
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Olvidaste tu contraseña?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"No tienes una cuenta? Registrate"}
                    </Link>
                  </Grid>
                </Grid>
              </ValidatorForm>
            </Box>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 4 }}>
              {"Copyright © "}
              <Link color="inherit" href="/">
                MYWEBAPP
              </Link>{" "}
              {new Date().getFullYear()}
              {"."}
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>
  );
}

export default Login;
