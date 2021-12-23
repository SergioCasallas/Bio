import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import HeaderSaldos from "./HeaderSaldos";
import BodySaldos from "./BodySaldos";
import pkClienteContext from "../../context/Login/PkClientesContext";
const Saldos = () => {
  const { pkClienteInicial } = useContext(pkClienteContext);

  return (
    <>
    {pkClienteInicial?(
        <>
      <HeaderSaldos />
      <BodySaldos />
    </>
    ):<Redirect to="/"/>}
    </>
  );
};

export default Saldos;
