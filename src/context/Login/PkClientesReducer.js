import { GuardarDatosUsuario, GuarderSedesUsuario } from "./types/types";

const reducer = (state, action) => {


  const { payload, type } = action;

  switch (type) {
    case GuardarDatosUsuario:
      return {
        ...state,
        key: payload.UUID,
        nombre: payload.Cliente,
        ciudad: payload.Ciudad,
        direccion: payload.Direccion_Fac,
        correoPersonal: payload.Email,
        correoPagos: payload.EmailPagos,
        nit: payload.Nit,
        bloqueado: payload.Bloqueado,
      };
    case GuarderSedesUsuario:
      return {
        ...state,
        UUIDSedes: payload,
      };
    default:
      console.log(`nada`);
  }
};

export default reducer;
