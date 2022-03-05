import axios from "axios";

export const getCertificados = async (datos) => {
  console.log(datos);

  try {
    const datosCertificados = await axios.post(
      `${process.env.REACT_APP_FRONTEND_LOCALHOST}/certificados`,
      { datos }
    );

    console.log(await datosCertificados);

    return await datosCertificados;
  } catch (e) {
    return { mensaje: "no hay datos" };
  }
};
