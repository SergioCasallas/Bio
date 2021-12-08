import React, { useReducer, useContext } from "react";
import PkClienteReducer from "./PkClientesReducer";
import PkClienteContext from "./PkClientesContext";
import { getUUID } from "../../services/apiLogin/apiLogin";
import { getSedesUUID } from "../../services/apiSedes/apiSedes";
import { GuardarDatosUsuario, GuarderSedesUsuario } from "./types/types";

// Import Alerta Context
import AlertaContext from "../../context/Alerta/AlertaContext";

const LoginState = (props) => {
  const { MostrarAlerta } = useContext(AlertaContext);
  const pkClienteInicial = {
    key: null,
    nombre: null,
    ciudad: null,
    correoPersonal: null,
    correoPagos: null,
    direccion: null,
    UUIDSedes: null,
    nit: null,
  };

  const [state, dispatch] = useReducer(PkClienteReducer, pkClienteInicial);

  const obtenerPkCliente = async (usuario, contrasena) => {
    const userUUID = await getUUID(usuario, contrasena);
    if (userUUID.mensaje) {
      console.log(userUUID.mensaje);
      MostrarAlerta(userUUID.mensaje);
    } else {
      dispatch({
        type: GuardarDatosUsuario,
        payload: await userUUID[0],
      });
      if (await userUUID[0].UUID) {
        const UUIDSedes = await getSedesUUID(await userUUID[0].UUID);
        if ((await UUIDSedes.length) > 0) {
          dispatch({
            type: GuarderSedesUsuario,
            payload: await UUIDSedes,
          });
        }else{
          console.log(`ERROR`)
        }
      }
    }
  };

  return (
    <PkClienteContext.Provider
      value={{
        pkClienteInicial: state.key,
        obtenerPkCliente,
        nombreCliente: state.nombre,
        ciudadCliente: state.ciudad,
        direccionCliente: state.direccion,
        correoPersonalCliente: state.correoPersonal,
        correoPagosCliente: state.correoPagos,
        UUIDSedes: state.UUIDSedes,
        nit: state.nit,
      }}
    >
      {props.children}
    </PkClienteContext.Provider>
  );
};

export default LoginState;
