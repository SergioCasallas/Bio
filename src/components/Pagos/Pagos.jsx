import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import HeaderPagos from "./HeaderPagos";
import BodyPagos from "./BodyPagos";
import pkClienteContext from "../../context/Login/PkClientesContext";

const Pagos = () => {
  const { pkClienteInicial } = useContext(pkClienteContext);

  console.log(pkClienteInicial);

  return (
    <>
      {pkClienteInicial ? (
        <>
          <HeaderPagos />
          <BodyPagos />
        </>
      ) : <Redirect  to="/"/>}
    </>
  );
};

export default Pagos;
