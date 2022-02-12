import React, { useContext } from "react";
import BodyFacturacion from "./BodyFacturacion";
import HeaderFacturacion from "./HeaderFacturacion";
import pkClienteContext from "../../context/Login/PkClientesContext";
import { Redirect } from "react-router";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer";

const Facturacion = () => {
  const { pkClienteInicial } = useContext(pkClienteContext);

  return (
    <>
      {pkClienteInicial ? (
        <>
          <Header title="Facturacion" />
          {/* <HeaderFacturacion /> */}
          <BodyFacturacion />
          <Footer />
        </>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default Facturacion;
