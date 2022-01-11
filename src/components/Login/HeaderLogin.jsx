import React from "react";
import Logo from "../../assets/images/Logo-Nuevo-SAS-.png";

//let login = 'Bienvenido a Bio-Residuos'

const HeaderLogin = () => {
  return (
    <div className="barra">
      <h1 className="barra__titulo">Bienvenido a Bio-Residuos</h1>
      <img className="logobio" src={Logo} alt="logobio"></img>
    </div>
  );
};

export default HeaderLogin;
