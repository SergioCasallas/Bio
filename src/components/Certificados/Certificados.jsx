import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import HeaderHome from "./HeaderCertificados";
import BodyCertificados from "./BodyCertificados";
import LoginContext from "../../context/Login/PkClientesContext";

const Certificados = () => {
  const { pkClienteInicial } = useContext(LoginContext);
  return (
    <>
      {pkClienteInicial ? (
        <div>
          <HeaderHome />
          <BodyCertificados />
        </div>
      ) : <Redirect to="/home"/>}
    </>
  );
};

export default Certificados;
