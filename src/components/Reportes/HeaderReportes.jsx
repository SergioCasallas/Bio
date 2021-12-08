import React from "react";
import Logo from "../../assets/images/Logo.png";
const HeaderReportes = () => {
  return (
    <header className="app-header">
      <p className="nombre-usuario">Reportes</p>
      <img src={Logo} alt="logobio"></img>
    </header>
  );
};

export default HeaderReportes;
