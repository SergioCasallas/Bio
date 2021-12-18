import axios from "axios";

console.log(process.env.REACT_APP_FRONTEND_LOCALHOST);
export const getUUID = async (userEmail, userPassword) => {
  try {
    const datosUUID = await axios.post(
      `${process.env.REACT_APP_FRONTEND_LOCALHOST}/login`,
      {
        user: userEmail,
        password: userPassword,
      }
    );
    return await datosUUID.data;
  } catch (error) {
    console.log(error);
  }
};
