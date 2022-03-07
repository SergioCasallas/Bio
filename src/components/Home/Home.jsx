import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import BodyHome from "./BodyHome";
import Header from "../Header/Header";
import Footer from "../Footer/Footer"

import PkClientesContext from "../../context/Login/PkClientesContext";

const Home = () => {
  const { pkClienteInicial,primeraVez } = useContext(PkClientesContext);
  return (
    <>
      {pkClienteInicial && primeraVez!=1 ? (
        <>
          <Header title="Informacion Cliente" />
          <BodyHome />
          <Footer />
        </>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default Home;
