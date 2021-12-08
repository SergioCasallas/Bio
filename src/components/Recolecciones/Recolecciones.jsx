import React,{ useContext } from "react";
import BodyRecolecciones from "./BodyRecolecciones";
import HeaderRecolecciones from "./HeaderRecolecciones";
import PkClientesContext from "../../context/Login/PkClientesContext";
import { Redirect } from "react-router";

const Recolecciones = () => {
  const { pkClienteInicial } = useContext(PkClientesContext);
  return (
    <>
      {pkClienteInicial ? (
        <>
          <HeaderRecolecciones />
          <BodyRecolecciones />
        </>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default Recolecciones;
