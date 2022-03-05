import React from "react";
// import "./App.css";
import "./styles/main.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home.jsx";
import Facturacion from "./components/Facturacion/Facturacion";
import Recolecciones from "./components/Recolecciones/Recolecciones";
import Reportes from "./components/Reportes/Reportes";
import Certificados from "./components/Certificados/Certificados";
import RecuperarContrasena from "./components/RecuperarContrasena/RecuperarContrasena";
import Manifiestos from "./components/Manifiestos/Manifiestos";
import Pagos from "./components/Pagos/Pagos";
import Saldos from "./components/Saldos/Saldos";
import NewPassword from "./components/NewPassword/NewPassword"


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
              <Route exact path="/" component={Login}/>
              <Route path="/new-password" component={NewPassword}/>
              <Route path="/home" component={Home} />
              <Route path="/facturacion" component={Facturacion} />
              <Route path="/recolecciones" component={Recolecciones} />
              <Route path="/reportes" component={Reportes} />
              <Route path="/certificados" component={Certificados} />
              <Route path="/manifiestos" component={Manifiestos} />
              <Route path="/pagos" component={Pagos} />
              <Route path="/saldos" component={Saldos} />
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
