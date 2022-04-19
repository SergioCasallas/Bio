import axios from "axios";
export const sendDatosPdf = async (datosReciboPagosPdf) => {
  axios
    .post(`${process.env.REACT_APP_FRONTEND_LOCALHOST}/createReportesPagosPdf`, {
      datosReciboPagosPdf,
    })
    .then(() => {
      axios({
        url: `${process.env.REACT_APP_FRONTEND_LOCALHOST}/getReportesPagosPdf`,
        method: "post",
        responseType: "blob",
        data: {
          nit: datosReciboPagosPdf.nit,
        },
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "ReportesPagos.pdf");
        document.body.appendChild(link);
        link.click();
      });
    });
};
