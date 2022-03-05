import React, { useState } from "react";
import "../../styles/pages/_newPassword.scss";

const BodyNewPassword = () => {
  const [data, setData] = useState({
    newPassword: null,
    confirmNewPassword: null,
  });

  const onChange = (e) => {
    if (!e.target.value.trim()) {
      setData({
        ...data,
        [e.target.name]: null,
      });
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    }
  };

  const sendInfoPassword = (e) => {
    e.preventDefault();

    if (
      data.newPassword !== null &&
      data.confirmNewPassword !== null &&
      data.newPassword === data.confirmNewPassword
    ) {
      console.log(`me sirve`);
    } else {
      console.log(`no me sirve`);
    }
  };

  return (
    <>
      <div className="form-usuario">
        <div className="contenedor-form">
          <h2>Cambio de Contraseña</h2>
          <form onSubmit={sendInfoPassword}>
            <div className="campo-form">
              <label htmlFor="Usuario">Nueva Contraseña</label>
              <input
                type="password"
                name="newPassword"
                placeholder="Ingrese correo electrónico autorizado"
                onChange={onChange}
              />
            </div>
            <div className="campo-form">
              <label htmlFor="Usuario">Confirme Contraseña</label>
              <input
                type="password"
                name="confirmNewPassword"
                placeholder="Ingrese correo electrónico autorizado"
                onChange={onChange}
              />
            </div>
            <div className="campo-form">
              <input
                type="submit"
                className="btn btn-primario btn-block"
                value="Enviar"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default BodyNewPassword;
