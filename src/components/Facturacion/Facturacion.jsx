import React, { useContext } from "react";
import BodyFacturacion from "./BodyFacturacion";
import HeaderFacturacion from "./HeaderFacturacion";
import pkClienteContext from "../../context/Login/PkClientesContext";
import { Redirect } from "react-router";

const Facturacion = () => {
  const { pkClienteInicial } = useContext(pkClienteContext);

  return (
    <>
      {pkClienteInicial ? (
        <>
          <HeaderFacturacion />
          <BodyFacturacion />
        </>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default Facturacion;
