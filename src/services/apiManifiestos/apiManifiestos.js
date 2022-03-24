import axios from "axios";

export const getManifiestos = async (datosBusqueda) => {
  const {
    fechaInicial,
    fechaFinal,
    residue,
    UUIDSede,
    pkClienteInicial,
    numeroReporte,
  } = datosBusqueda;
  try {
    const datosRecolecciones = await axios.post(
      `${process.env.REACT_APP_FRONTEND_LOCALHOST}/manifiestos`,
      {
        fechaInicial,
        fechaFinal,
        residue,
        UUIDSede,
        pkClienteInicial,
        numeroReporte,
      }
    );


    return await datosRecolecciones;
  } catch (e) {
    return { mensaje: "no hay datos" };
  }
};
