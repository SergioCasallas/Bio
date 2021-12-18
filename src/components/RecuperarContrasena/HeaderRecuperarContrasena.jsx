import React from "react";
import Logo from "../../assets/images/Logo.png";

const HeaderRecuperarContrasena = () => {
  return (
    <header className="app-header">
      <p className="nombre-usuario">Recuperacion de Contraseña</p>
      <img src={Logo} alt="logobio"></img>
    </header>
  );
};

export default HeaderRecuperarContrasena;
