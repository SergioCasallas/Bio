import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import HeaderPagos from "./HeaderPagos";
import BodyPagos from "./BodyPagos";
import pkClienteContext from "../../context/Login/PkClientesContext";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Pagos = () => {
  const { pkClienteInicial } = useContext(pkClienteContext);

  console.log(pkClienteInicial);

  return (
    <>
      {pkClienteInicial ? (
        <>
          <Header title="Pagos" />
          <BodyPagos />
          <Footer/>
        </>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default Pagos;
