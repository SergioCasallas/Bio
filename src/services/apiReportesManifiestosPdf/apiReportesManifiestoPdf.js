import axios from "axios";
export const createManifiestoPdf = async (datosManifiesto) => {
  const { nit } = datosManifiesto;

  console.log(datosManifiesto);

  axios
    .post(`${process.env.REACT_APP_FRONTEND_LOCALHOST}/reportesManifiesto`, {
      datosManifiesto,
    })
    .then((respuesta) => {
       respuesta.data[0].nit = nit;
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
            method: "post",
            responseType: "blob",
            data: { nit },
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
