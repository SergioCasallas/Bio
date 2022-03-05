import axios from "axios";
export const createManifiestoPdf = async (datosManifiesto) => {

  axios
    .post(`${process.env.REACT_APP_FRONTEND_LOCALHOST}/reportesManifiesto`, {
      datosManifiesto,
    })
    .then((respuesta) => {
      axios
        .post(
          `${process.env.REACT_APP_FRONTEND_LOCALHOST}/createManifiestoPdf`,
          {
            respuesta,
          }
        )
        .then(() => {
          axios({
            url: `${process.env.REACT_APP_FRONTEND_LOCALHOST}/getManifiestoPdf`,
            method: "GET",
            responseType: "blob",
          }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "ReporteManifiesto.pdf");
            document.body.appendChild(link);
            link.click();
          });
        });
    });
};
