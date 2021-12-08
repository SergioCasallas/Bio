import {
  MOSTRAR_ALERTA,
  OCULTAR_ALERTA,
  // REGISTRO_EXITOSO,
  // REGISTRO_ERROR,
  // OBTENER_USUARIO,
  // LOGIN_EXITOSO,
  // LOGIN_ERROR,
  // CERRAR_SESION,
} from "./types/types";

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case MOSTRAR_ALERTA:
      return {
        ...state,
        mensaje: payload,
      };
    case OCULTAR_ALERTA:
      return {
        ...state,
        mensaje: null,
      };
    default:
      return null;
  }
};

export default reducer;
