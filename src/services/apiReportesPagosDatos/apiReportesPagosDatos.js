import axios from "axios";

export const getReportesPagosDatos = async (datos) => {
  const { numeroReporte, fechaInicial, fechaFinal, pkClienteInicial } = datos;

  const datosReportesPagos = await axios.post(
    `${process.env.REACT_APP_FRONTEND_LOCALHOST}/reportesPagos`,
    {
      numeroReporte,
      fechaInicial,
      fechaFinal,
      pkClienteInicial,
    }
  );

  return await datosReportesPagos.data;
};
