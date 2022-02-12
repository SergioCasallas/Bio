import React from "react";
import Logo from "../../assets/images/Lateral AA-01 (1) (1).png";

const HeaderLogin = () => {
  return (
    <>
      <div className="login-barra">
        <img className="login__logobio" src={Logo} alt="logobio" />
        <h1 className="login__titulo">Bienvenido a Bio-Residuos</h1>
      </div>
    </>
  );
};

export default HeaderLogin;
