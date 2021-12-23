import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import HeaderManifiestos from "./HeaderManifiestos";
import BodyManifiestos from "./BodyManifiestos";
import pkClienteContext from "../../context/Login/PkClientesContext";
const Manifiestos = () => {
  const { pkClienteInicial } = useContext(pkClienteContext);

  console.log(pkClienteInicial);

  return (
    <>
      {pkClienteInicial ? (
        <>
          <HeaderManifiestos />
          <BodyManifiestos />
        </>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default Manifiestos;
