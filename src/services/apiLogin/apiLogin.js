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
          // 'application/json' is the modern content-type for JSON, but some
          // older servers may use 'text/json'.
          // See: http://bit.ly/text-json
          "content-type": "text/json",
        },
      }
    );
    return await datosUUID.data;
  } catch (error) {
    console.log(error);
  }
};
