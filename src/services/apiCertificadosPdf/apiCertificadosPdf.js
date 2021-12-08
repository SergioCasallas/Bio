import axios from "axios";
export const getCertificadoPdf = (datosCertificadoPdf) => {
  console.log(datosCertificadoPdf);
  const { fechaActual, nombreCompania, nit, numeroWorkPlan, sede, sedeName } =
    datosCertificadoPdf;
  axios
    .post(`${process.env.REACT_APP_FRONTEND_LOCALHOST}/recoleccionesDatosPdf`, {
      numeroWorkPlan,
      sede,
    })
    .then((responseDatosCertificadoPdf) => {
      responseDatosCertificadoPdf.data[0].sedeName = sedeName;
      responseDatosCertificadoPdf.data[0].fechaActual = fechaActual;
      responseDatosCertificadoPdf.data[0].nombreCompania = nombreCompania;
      responseDatosCertificadoPdf.data[0].nit = nit;
      const dataCertificadoPdf = responseDatosCertificadoPdf.data
      axios.post(
        `${process.env.REACT_APP_FRONTEND_LOCALHOST}/createCertificadoPdf`,
        { dataCertificadoPdf }
      ).then(()=>{
        axios({
          url: `${process.env.REACT_APP_FRONTEND_LOCALHOST}/getCertificadoPdf`,
          method: "GET",
          responseType: "blob",
        }).then((responsePdf) => {
          const url = window.URL.createObjectURL(new Blob([responsePdf.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Certificado.pdf");
          document.body.appendChild(link);
          link.click();
        });
      })
    });
};
