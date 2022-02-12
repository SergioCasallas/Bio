import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import HeaderSaldos from "./HeaderSaldos";
import BodySaldos from "./BodySaldos";
import pkClienteContext from "../../context/Login/PkClientesContext";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Saldos = () => {
  const { pkClienteInicial } = useContext(pkClienteContext);

  return (
    <>
      {pkClienteInicial ? (
        <>
          <Header title="Saldos" />
          <BodySaldos />
          <Footer />
        </>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default Saldos;
