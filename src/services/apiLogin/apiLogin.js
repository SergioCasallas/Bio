import axios from "axios";

export const getUUID = async (userEmail, userPassword) => {
  try {
    const datosUUID = await axios.post(
      `${process.env.REACT_APP_FRONTEND_LOCALHOST}/login`,
      {
        user: userEmail,
        password: userPassword,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    return await datosUUID.data;
  } catch (error) {
    console.log(error);
  }
};
