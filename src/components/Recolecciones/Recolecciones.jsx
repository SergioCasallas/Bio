import React, { useContext } from "react";
import BodyRecolecciones from "./BodyRecolecciones";
import HeaderRecolecciones from "./HeaderRecolecciones";
import PkClientesContext from "../../context/Login/PkClientesContext";
import { Redirect } from "react-router";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Recolecciones = () => {
  const { pkClienteInicial } = useContext(PkClientesContext);
  return (
    <>
      {pkClienteInicial ? (
        <>
          <Header title="Recolecciones" />
          <BodyRecolecciones />
          <Footer />
        </>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default Recolecciones;
