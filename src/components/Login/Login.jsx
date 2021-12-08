import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import HeaderLogin from "./HeaderLogin";
import BodyLogin from "./BodyLogin";

// Import Context
import PkClientesContext from "../../context/Login/PkClientesContext";

const Login = () => {
  const { pkClienteInicial } = useContext(PkClientesContext);
  // console.log(pkCliente);
  return (
    <>
      {pkClienteInicial ? (
        <Redirect to="/home" />
      ) : (
        <>
          <HeaderLogin />
          <BodyLogin />
        </>
      )}
    </>
  );
};

export default Login;
