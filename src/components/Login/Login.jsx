import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import BodyLogin from "./BodyLogin";
import HeaderLogin from "./HeaderLogin";
import Footer from "../Footer/Footer";

import Spinner from "../Spinner/Spinner"

// Import Context
import PkClientesContext from "../../context/Login/PkClientesContext";

const Login = () => {
  const { pkClienteInicial, primeraVez } = useContext(PkClientesContext);
  return (
    <>
      {pkClienteInicial ? (
        primeraVez == 1 ? (
          <Redirect to="/new-password" />
        ) : (
          <Redirect to="/home" />
        )
      ) : (
        <>
        <Spinner></Spinner>
          <HeaderLogin />
          <BodyLogin />
          <Footer />
        </>
      )}
    </>
  );
};

export default Login;
