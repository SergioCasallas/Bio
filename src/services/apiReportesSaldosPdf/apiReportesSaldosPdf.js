import axios from "axios";
export const createReportesSaldosPdf = (datosReciboSaldosPdf) => {

console.log(datosReciboSaldosPdf)

  axios
    .post(`${process.env.REACT_APP_FRONTEND_LOCALHOST}/createReportesSaldosPdf`, {
      datosReciboSaldosPdf,
    })
    .then(() => {
      axios({
        url: `${process.env.REACT_APP_FRONTEND_LOCALHOST}/getReportesSaldosPdf`,
        method: "post",
        responseType: "blob",
        data: {
          nit:datosReciboSaldosPdf.nit
        }
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "ReporteSaldos.pdf");
        document.body.appendChild(link);
        link.click();
      });
    });
};
