import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

// Import Context
import PkClientesContext from "../../context/Login/PkClientesContext";
// Import Context Alerta
import AlertaContext from "../../context/Alerta/AlertaContext";

const BodyLogin = () => {
  const { obtenerPkCliente } = useContext(PkClientesContext);
  const { MostrarAlerta } = useContext(AlertaContext);
  const [usuario, guardarUsuario] = useState({
    user: "",
    contraseña: "",
  });

  const { user, contraseña } = usuario;

  const onChange = (e) => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (user.trim() !== "" && contraseña.trim() !== "") {
      obtenerPkCliente(usuario.user, usuario.contraseña);
    } else {
      MostrarAlerta("Contrasena o Usuario Vacio");
    }
  };

  return (
    <div className="form-usuario">
      <div className="contenedor-form sombra-dark">
        <h2>Iniciar Sesion</h2>
        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="Usuario">Usuario</label>
            <input
              type="text"
              name="user"
              id="Usuario"
              placeholder="Ingrese su Usuario"
              value={user}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="contraseña">Contraseña</label>
            <input
              type="password"
              name="contraseña"
              id="U2"
              placeholder="Ingrese su contraseña"
              value={contraseña}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <Link className="link-recover-password" to="/recuperarContrasena">
              Olvide mi contraseña
            </Link>
          </div>
          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Iniciar Sesion"
            />
            {/* <dialog id="dialogo1">Ingresando...</dialog> */}
            {/* <dialog id="dialogo2">Datos no coinciden</dialog> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default BodyLogin;
