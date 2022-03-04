import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Modelos from "./pages/modelos/Modelos";


function App(props) {

  return (
    <BrowserRouter>
    <Routes>
      <Route path={"/"} element={<Modelos />}  />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
