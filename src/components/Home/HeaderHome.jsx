import React from "react";
import Logo from "../../assets/images/Logo.png";

const HeaderHome = () => {
  return (
    <header className="app-header">
      <p className="nombre-usuario">Hola Bio-Residuos</p>
      <img src={Logo} alt="logobio"></img>
    </header>
  );
};

export default HeaderHome;
