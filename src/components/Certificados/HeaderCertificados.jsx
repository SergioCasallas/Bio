import React from "react";
import Logo from "../../assets/images/Logo.png"; 

const HeaderCertificados = () => {
  return (
    <header className="app-header">
      <p className="nombre-usuario">Certificados</p>
      <img className="logobio" src={Logo} alt="logobio"></img>
    </header>
  );
};

export default HeaderCertificados;
