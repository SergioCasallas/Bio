import axios from "axios";
export const getCertificadoPdf = (datosCertificadoPdf) => {

  console.log(datosCertificadoPdf)

  const {
    fechaActual,
    fechaInicial,
    fechaFinal,
    nombreCompania,
    nit,
    // numeroWorkPlan,
    sede,
    UUID_Factura,
    sedeName,
  } = datosCertificadoPdf;


  axios
    .post(`${process.env.REACT_APP_FRONTEND_LOCALHOST}/certificados`, {
      UUID_Factura,
    })
    .then((responseDatosCertificadoPdf) => {
      responseDatosCertificadoPdf.data[0].sedeName = sedeName;
      responseDatosCertificadoPdf.data[0].fechaActual = fechaActual;
      responseDatosCertificadoPdf.data[0].nombreCompania = nombreCompania;
      responseDatosCertificadoPdf.data[0].nit = nit;
      responseDatosCertificadoPdf.data[0].fechaFinal = fechaFinal;
      responseDatosCertificadoPdf.data[0].fechaInicial = fechaInicial;
      const dataCertificadoPdf = responseDatosCertificadoPdf.data;
      axios
        .post(
          `${process.env.REACT_APP_FRONTEND_LOCALHOST}/createCertificadoPdf`,
          { dataCertificadoPdf }
        )
        .then(() => {
          axios({
            url: `${process.env.REACT_APP_FRONTEND_LOCALHOST}/getCertificadoPdf`,
            method: "post",
            responseType: "blob",
            data:{nit},
          }).then((responsePdf) => {
            const url = window.URL.createObjectURL(
              new Blob([responsePdf.data])
            );
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "Certificado.pdf");
            document.body.appendChild(link);
            link.click();
          });
        });
    });
};
