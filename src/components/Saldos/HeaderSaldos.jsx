import React from "react";
import Logo from "../../assets/images/Logo.png";

const HeaderSaldos = () => {
  return (
    <header className="app-header">
      <p className="nombre-usuario">Saldos</p>
      <img src={Logo} alt="logobio"></img>
    </header>
  );
};

export default HeaderSaldos;
