import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import BodyNewPassword from "./BodyNewPassword";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import pkClienteContext from "../../context/Login/PkClientesContext";

const NewPassword = () => {
    const {pkClienteInicial}=useContext(pkClienteContext);
  return (
    <>
      {pkClienteInicial ? (
        <>
          <Header />
          <BodyNewPassword />
          <Footer />
        </>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default NewPassword;
