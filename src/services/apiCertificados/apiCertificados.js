import axios from "axios";

export const getCertificados = async (datos) => {

  try {
    const datosCertificados = await axios.post(
      `${process.env.REACT_APP_FRONTEND_LOCALHOST}/certificados`,
      { datos }
    );


    return await datosCertificados;
  } catch (e) {
    return { mensaje: "no hay datos" };
  }
};
