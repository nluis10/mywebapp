import React from "react";
import ReactDOM from "react-dom";
import { StyledEngineProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";

import App from "./App";

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <SnackbarProvider
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      maxSnack={3}
    >
      <App />
    </SnackbarProvider>
  </StyledEngineProvider>,
  document.querySelector("#root")
);
