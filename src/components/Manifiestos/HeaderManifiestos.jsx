import React from "react";
import Logo from "../../assets/images/Logo.png";

const HeaderManifiestos = () => {
  return (
    <header className="app-header">
      <p className="nombre-usuario">Manifiestos</p>
      <img className="logobio" src={Logo} alt="logobio"></img>
    </header>
  );
};

export default HeaderManifiestos;
