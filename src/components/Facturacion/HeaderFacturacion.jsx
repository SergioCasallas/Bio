import React from "react";
import Logo from "../../assets/images/Logo.png";

const HeaderFacturacion = () => {
  return (
    <header className="app-header">
      <p className="nombre-usuario">Facturación</p>
      <img className="logobio" src={Logo} alt="logobio"></img>
    </header>
  );
};

export default HeaderFacturacion;
