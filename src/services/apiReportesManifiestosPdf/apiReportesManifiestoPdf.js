import axios from "axios";
export const createManifiestoPdf = async (datosManifiesto) => {
  // const pedirDatosManifiestoPdf = await axios.post(
  //   "http://www.server.iprocess.co:4000/reportesManifiesto",
  //   {
  //     datosManifiesto,
  //   }
  // );

  // console.log(await pedirDatosManifiestoPdf);

  // const createManifiestoPdf = await axios.post(
  //   "http://www.server.iprocess.co:4000/createManifiestoPdf",
  //   await pedirDatosManifiestoPdf
  // );

  // console.log(await createManifiestoPdf);

  // const getManifiestoPDF = await axios({
  //   url: "http://www.server.iprocess.co:4000/getManifiestoPdf",
  //   method: "GET",
  //   responseType: "blob",
  // });

  // const pdfManifiesto = await getManifiestoPDF;

  // const url = window.URL.createObjectURL(new Blob([await pdfManifiesto.data]));
  // const link = document.createElement("a");
  // link.href = url;
  // link.setAttribute("download", "ReporteManifiesto.pdf");
  // document.body.appendChild(link);
  // link.click();

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
