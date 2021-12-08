import axios from "axios";

export const getReportesSaldosDatos = async (datos) => {
  const { fechaInicial, fechaFinal, numeroReporte, pkClienteInicial } = datos;

  try {
    const datosReportesSaldos = await axios.post(
      `${process.env.REACT_APP_FRONTEND_LOCALHOST}/reportesSaldos`,
      { fechaInicial, fechaFinal, numeroReporte, pkClienteInicial }
    );

    return await datosReportesSaldos.data;
  } catch (err) {
    console.log(err);
  }
};
