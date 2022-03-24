import React, { useContext, useReducer } from "react";
// Import Alerta Context
import AlertaContext from "../../context/Alerta/AlertaContext";
import { getUUID } from "../../services/apiLogin/apiLogin";
import { getSedesUUID } from "../../services/apiSedes/apiSedes";
import PkClienteContext from "./PkClientesContext";
import PkClienteReducer from "./PkClientesReducer";
import { GuardarDatosUsuario, GuarderSedesUsuario } from "./types/types";

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
    bloqueado: null,
    primeraVez: null,
  };

  const [state, dispatch] = useReducer(PkClienteReducer, pkClienteInicial);



  const obtenerPkCliente = async (usuario, contrasena) => {
    const userUUID = await getUUID(usuario, contrasena);
    if (userUUID.mensaje) {
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
        }
      }
    }
  };

    const resetPkCliente = async () => {
      dispatch({
        type: GuardarDatosUsuario,
        payload: await {
          UUID:null,
          Cliente:null,
          Ciudad:null,
          Direccion_Fac:null,
          Email:null,
          EmailPagos:null,
          Nit:null,
          Bloqueado:null,
          Primera_Vez:null,
        },
      });
    };


  return (
    <PkClienteContext.Provider
      value={{
        pkClienteInicial: state.key,
        obtenerPkCliente,
        resetPkCliente,
        nombreCliente: state.nombre,
        ciudadCliente: state.ciudad,
        direccionCliente: state.direccion,
        correoPersonalCliente: state.correoPersonal,
        correoPagosCliente: state.correoPagos,
        UUIDSedes: state.UUIDSedes,
        nit: state.nit,
        bloqueado: state.bloqueado,
        primeraVez: state.primeraVez,
      }}
    >
      {props.children}
    </PkClienteContext.Provider>
  );
};

export default LoginState;
