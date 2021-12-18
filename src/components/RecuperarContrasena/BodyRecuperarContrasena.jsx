import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { sendEmail } from "../../services/apiRecuperarContrasena/apiRecuperarContrasena";
import AlertaContext from "../../context/Alerta/AlertaContext";

const BodyRecuperarContrasena = () => {
  const { MostrarAlerta } = useContext(AlertaContext);
  const [datos, setDatos] = useState({ nit: null });
  const [mensaje, setMensaje] = useState(false);

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const sendDatos = async (e) => {
    e.preventDefault();
    if (true && datos.nit !== null && datos.nit.trim() !== "") {
      const dataMensaje = await sendEmail(datos);
      if (dataMensaje.data.mensaje) {
        MostrarAlerta(dataMensaje.data.mensaje);
        setTimeout(() => {
          setMensaje(true);
        }, 2000);
      } else if (dataMensaje.data.error) {
        MostrarAlerta(dataMensaje.data.error);
      }
      // setMensaje(dataMensaje);
    }
  };
  return (
    <div className="form-usuario">
      <form className="password-form" onSubmit={sendDatos}>
        <h1 className="password-title">Busca por NIT de Empresa</h1>
        <div className="password-form__content-input">
          <label className="password-paragraph">
            Al ingresar su <b>NIT</b> se le enviara al correo inscrito su
            contraseña:
          </label>
          <br />
          <input
            name="nit"
            onChange={handleChange}
            className="password-input"
            type="text"
            placeholder="Ingrese su NIT sin puntos,espacios o caracteres extraños"
          />
        </div>
        <br />
        <button className="button-send" type="submit">
          Recuperar Contraseña
        </button>
      </form>
      {mensaje !== false ? <Redirect to="/" /> : null}
    </div>
  );
};

export default BodyRecuperarContrasena;
