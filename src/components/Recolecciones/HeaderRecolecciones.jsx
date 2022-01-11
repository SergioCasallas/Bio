import Logo from "../../assets/images/Logo.png";
import React from "react";

const HeaderRecolecciones = () => {
  return (
    <header className="app-header">
      <p className="nombre-usuario">Recolecciones</p>
      <img className="logobio" src={Logo} alt="logobio"></img>
    </header>
  );
};

export default HeaderRecolecciones;
