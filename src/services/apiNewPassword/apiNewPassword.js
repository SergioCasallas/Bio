import axios from "axios";
export const apiNewPassword = (datos) => {
  try {
    const dataNewPasswword = axios.post(
      `${process.env.REACT_APP_FRONTEND_LOCALHOST}/new-password`,
      { datos }
    );

    return dataNewPasswword;
  } catch (err) {
    console.log(err);
  }
};
