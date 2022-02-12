import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import HeaderHome from "./HeaderCertificados";
import BodyCertificados from "./BodyCertificados";
import LoginContext from "../../context/Login/PkClientesContext";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Certificados = () => {
  const { pkClienteInicial } = useContext(LoginContext);
  return (
    <>
      {pkClienteInicial ? (
        <div>
          <Header title="Certificados" />
          <BodyCertificados />
          <Footer />
        </div>
      ) : (
        <Redirect to="/home" />
      )}
    </>
  );
};

export default Certificados;
