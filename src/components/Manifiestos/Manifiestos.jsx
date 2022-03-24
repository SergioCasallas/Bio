import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import HeaderManifiestos from "./HeaderManifiestos";
import BodyManifiestos from "./BodyManifiestos";
import pkClienteContext from "../../context/Login/PkClientesContext";
import Header from "../Header/Header"
import Footer from "../Footer/Footer"

const Manifiestos = () => {
  const { pkClienteInicial } = useContext(pkClienteContext);


  return (
    <>
      {pkClienteInicial ? (
        <>
          <Header title="Manifiestos" />
          <BodyManifiestos />
          <Footer/>
        </>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default Manifiestos;
