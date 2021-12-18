import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home.jsx";
import Facturacion from "./components/Facturacion/Facturacion";
import Recolecciones from "./components/Recolecciones/Recolecciones";
import Reportes from "./components/Reportes/Reportes";
import Certificados from "./components/Certificados/Certificados";
import RecuperarContrasena from "./components/RecuperarContrasena/RecuperarContrasena";

// Import Context
import PkClienteState from "./context/Login/PkClienteState";
// !Import Context Alert
import AlertaState from "./context/Alerta/AlertaStatus";

import Alerta from "./components/Alerta/Alerta.jsx";

function App() {
  return (
    <>
      <Router>
        <AlertaState>
          <Alerta />
          <Switch>
            <PkClienteState>
              <Route exact path="/" component={Login}></Route>
              <Route path="/home" component={Home} />
              <Route path="/facturacion" component={Facturacion} />
              <Route path="/recolecciones" component={Recolecciones} />
              <Route path="/reportes" component={Reportes} />
              <Route path="/certificados" component={Certificados} />
              <Route
                path="/recuperarContrasena"
                component={RecuperarContrasena}
              />
            </PkClienteState>
          </Switch>
        </AlertaState>
      </Router>
    </>
  );
}

export default App;
