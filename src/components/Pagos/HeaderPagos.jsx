import React from "react";
import Logo from "../../assets/images/Logo.png";
const HeaderPagos = () => {
  return (
    <header className="app-header">
      <p className="nombre-usuario">Pagos</p>
      <img src={Logo} alt="logobio"></img>
    </header>
  );
};

export default HeaderPagos;
