import React from "react";
import Logo from "../../assets/images/Logo Editable-01.png";
import "../../styles/layout/_header.scss";

const Header = ({ title }) => {
  return (
    <header className="header">
      <p className="header__title">{title}</p>
      <hr />
      <picture className="header__content-image">
        <img className="header__image" src={Logo} alt="logobio"></img>
      </picture>
    </header>
  );
};

export default Header;
