import HeaderReportes from "./HeaderReportes";
import { Redirect } from "react-router";
import BodyReportes from "./BodyReportes";
import React, { useContext } from "react";

import pkClienteContext from "../../context/Login/PkClientesContext";

const Reportes = () => {
  const { pkClienteInicial } = useContext(pkClienteContext);
  return (
    <>
      {pkClienteInicial ? (
        <>
          <HeaderReportes />
          <BodyReportes />
        </>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default Reportes;
