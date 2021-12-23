import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import BodyHome from "./BodyHome";
import HeaderHome from "./HeaderHome";

import PkClientesContext from "../../context/Login/PkClientesContext";

const Home = () => {
  const { pkClienteInicial } = useContext(PkClientesContext);
  return (
    <>
      {pkClienteInicial ? (
        <>
          <HeaderHome />
          <BodyHome />
        </>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default Home;
