import axios from "axios";

export const getFacturas = async (datosBusqueda) => {
  try {
    const datosFacturas = await axios.post(
      `${process.env.REACT_APP_FRONTEND_LOCALHOST}/facturas`,
      {
        fechaInicial: datosBusqueda.fechaInicial,
        fechaFinal: datosBusqueda.fechaFinal,
        pkCliente: datosBusqueda.pkClienteInicial,
        factura: datosBusqueda.factura,
      }
    );

    console.log(await datosFacturas);
    return await datosFacturas;
  } catch (error) {
    console.log(error);
  }
};
