import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="sidebar">
      <h2>Menú</h2>

      <Link to={"/home"} className="btn btn-primario btn-block">
        Inicio
      </Link>

      <Link to={"/recolecciones"} className="btn btn-primario btn-block">
        Recolecciones
      </Link>

      <Link to={"/facturacion"} className="btn btn-primario btn-block">
        Facturación
      </Link>

      <Link to={"/reportes"} className="btn btn-primario btn-block">
        Reportes
      </Link>

      <Link to={"/certificados"} className="btn btn-primario btn-block">
        Certificado
      </Link>

      {/* <Link to={"/manifiestos"} className="btn btn-primario btn-block">
        Manifiestos
      </Link>

      <Link to={"/pagos"} className="btn btn-primario btn-block">
        Pagos
      </Link>

      <Link to={"/saldos"} className="btn btn-primario btn-block">
        Saldos
      </Link> */}
    </div>
  );
};

export default SideBar;
