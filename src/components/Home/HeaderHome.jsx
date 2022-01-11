import React from "react";
import Logo from "../../assets/images/Logo-Nuevo-SAS-.jpg";

const HeaderHome = () => {
  return (
    <header className="app-header">
      <p className="nombre-usuario">Informacion Cliente</p>
      <img className="logobio" src={Logo} alt="logobio"></img>
    </header>
  );
};

export default HeaderHome;
