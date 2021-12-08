import axios from "axios";

export const getSedesUUID = async (UUidCliente) => {
  try {
    const datosGetSedesUUID = await axios.post(
      `${process.env.REACT_APP_FRONTEND_LOCALHOST}/sedes`,
      {
        UUID: `${UUidCliente}`,
      }
    );
    return await datosGetSedesUUID.data;
  } catch (e) {
    console.log(e);
  }
};
