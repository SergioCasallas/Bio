import React, { useReducer } from "react";
import AlertaContext from "./AlertaContext";
import AlertaReducer from "./AlertaReducer";
import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "./types/types";

const AlertaState = (props) => {
  const AlertaInicial = {
    mensaje: null,
  };

  const [state, dispatch] = useReducer(AlertaReducer, AlertaInicial);

  const MostrarAlerta = (alertaMensaje) => {
    dispatch({
      type: MOSTRAR_ALERTA,
      payload: alertaMensaje,
    });
    setTimeout(() => {
      dispatch({
        type: OCULTAR_ALERTA,
      });
    }, 8000);
  };

  return (
    <AlertaContext.Provider value={{ mensaje: state.mensaje, MostrarAlerta }}>
      {props.children}
    </AlertaContext.Provider>
  );
};

export default AlertaState;
