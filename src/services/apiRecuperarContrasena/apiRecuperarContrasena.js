import axios from "axios";
export const sendEmail = async (datos) => {
  const respuesta = await axios.post(
    `${process.env.REACT_APP_FRONTEND_LOCALHOST}/recuperarContrasena`,
    { datos }
  );

  console.log(respuesta);

  return respuesta;
};
