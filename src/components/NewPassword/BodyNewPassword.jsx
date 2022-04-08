import React, { useContext, useState } from "react";
import pkClienteContext from "../../context/Login/PkClientesContext";
import { apiNewPassword } from "../../services/apiNewPassword/apiNewPassword";
import "../../styles/pages/_newPassword.scss";
import AlertaContext from "../../context/Alerta/AlertaContext";

const BodyNewPassword = () => {
  const { pkClienteInicial, resetPkCliente } = useContext(pkClienteContext);

  const {MostrarAlerta} = useContext(AlertaContext)


  const [data, setData] = useState({
    newPassword: null,
    confirmNewPassword: null,
    UUID: pkClienteInicial,
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

  const sendInfoPassword = async(e) => {
    e.preventDefault();

    if (
      data.newPassword !== null &&
      data.confirmNewPassword !== null &&
      data.newPassword === data.confirmNewPassword
    ) {
      const dataNewPassword = await apiNewPassword(data);


      if (dataNewPassword.mensaje) {
        MostrarAlerta(dataNewPassword.mensaje)
      } else {

        MostrarAlerta(` Porfavor Ingrese Sus Datos Con Su Nueva Contrasena`);

        setTimeout(() => {
          resetPkCliente();
        }, 2000);
      }
    } else {
      MostrarAlerta(` La contrasena no coincide porfavor verifique`)
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
                minlength="8"
                placeholder="Ingrese nueva Contraseña"
                onChange={onChange}
              />
            </div>
            <div className="campo-form">
              <label htmlFor="Usuario">Confirme Contraseña</label>
              <input
                type="password"
                name="confirmNewPassword"
                minlength="8"
                placeholder="Confirmar Contraseña"
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
