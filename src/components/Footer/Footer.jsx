import React from "react";
import "../../styles/layout/_footer.scss";
import MapImage from "../../assets/images/placeholder.png";
import PhoneImage from "../../assets/images/phone.png";
import InstagramImage from "../../assets/images/instagram.png";
import LogoIprocess from "../../assets/images/Logo iProcess Transparente.png";

const Footer = () => {
  return (
    <footer className="footer">
      {/* <span className="footer">
        iProcess Colombia SAS. © 2019 www.iprocess.co
      </span> */}
      <div className="footer__content-images">
        <a
          className="footer__link-social"
          href="https://goo.gl/maps/CDv7sTyDF5Ty566L9"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="footer__images-social" src={MapImage} alt="" />
        </a>
        {/* <a
          className="footer__link-social"
          href="tel:+576047815219"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="footer__images-social"
            src={PhoneImage}
            alt="tel:+576047815219"
          />
        </a> */}
        <a
          className="footer__link-social"
          href="https://www.instagram.com/bioresiduos/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="footer__images-social" src={InstagramImage} alt="" />
        </a>
      </div>
      <a
        className="footer__link-iprocess"
        href="https://www.iprocess.co/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img className="footer__img-iprocess" src={LogoIprocess} alt="" />
      </a>
    </footer>
  );
};

export default Footer;
