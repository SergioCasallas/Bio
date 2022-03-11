import axios from "axios";
export const sendDatosPdf = async (datos) => {
  axios
    .post(
      `${process.env.REACT_APP_FRONTEND_LOCALHOST}/createPdfRecolecciones`,
      { datos }
    )
    .then(() => {
      axios
        .post(
          `${process.env.REACT_APP_FRONTEND_LOCALHOST}/getRecoleccionesPdf`,
          { datos },
          {
            responseType: "blob",
          }
        )
        .then((responsePdf) => {
          const url = window.URL.createObjectURL(new Blob([responsePdf.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Recolecciones.pdf");
          document.body.appendChild(link);
          link.click();
        });
    });

  // const {
  //   fechaActual,
  //   nombreCompania,
  //   nit,
  //   numeroWorkPlan,
  //   sede,
  //   sedeName,
  //   recolecciones,
  // } = data;

  // axios
  //   .post(`${process.env.REACT_APP_FRONTEND_LOCALHOST}/recoleccionesDatosPdf`, {
  //     fechaActual,
  //     nombreCompania,
  //     nit,
  //     numeroWorkPlan,
  //     sede,
  //     recolecciones,
  //   })
  // .then((responseData) => {
  //   console.log(responseData);
  //   responseData.data[0].sedeName = sedeName;
  //   responseData.data[0].fechaActual = fechaActual;
  //   responseData.data[0].nombreCompania = nombreCompania;
  //   responseData.data[0].nit = nit;
  //   const dataPdf = responseData.data;
  // axios
  //   .post(
  //     `${process.env.REACT_APP_FRONTEND_LOCALHOST}/createPdfRecolecciones`,
  //     { datos }
  //   )
  //   .then(() => {
  //     axios({
  //       url: `${process.env.REACT_APP_FRONTEND_LOCALHOST}/getRecoleccionesPdf`,
  //       method: "GET",
  //       responseType: "blob",
  //     }).then((responsePdf) => {
  //       const url = window.URL.createObjectURL(
  //         new Blob([responsePdf.data])
  //       );
  //       const link = document.createElement("a");
  //       link.href = url;
  //       link.setAttribute("download", "Recolecciones.pdf");
  //       document.body.appendChild(link);
  //       link.click();
  //     });
  //   });
  // });
};

// import axios from "axios";
// export const sendDatosPdf = async (data) => {
//   const {
//     fechaActual,
//     nombreCompania,
//     nit,
//     numeroWorkPlan,
//     sede,
//     sedeName,
//     recolecciones,
//   } = data;

//   axios
//     .post(`${process.env.REACT_APP_FRONTEND_LOCALHOST}/recoleccionesDatosPdf`, {
//       fechaActual,
//       nombreCompania,
//       nit,
//       numeroWorkPlan,
//       sede,
//       recolecciones,
//     })
//     .then((responseData) => {
//       console.log(responseData);
//       responseData.data[0].sedeName = sedeName;
//       responseData.data[0].fechaActual = fechaActual;
//       responseData.data[0].nombreCompania = nombreCompania;
//       responseData.data[0].nit = nit;
//       const dataPdf = responseData.data;
//       axios
//         .post(
//           `${process.env.REACT_APP_FRONTEND_LOCALHOST}/createPdfRecolecciones`,
//           { dataPdf }
//         )
//         .then(() => {
//           axios({
//             url: `${process.env.REACT_APP_FRONTEND_LOCALHOST}/getRecoleccionesPdf`,
//             method: "GET",
//             responseType: "blob",
//           }).then((responsePdf) => {
//             const url = window.URL.createObjectURL(
//               new Blob([responsePdf.data])
//             );
//             const link = document.createElement("a");
//             link.href = url;
//             link.setAttribute("download", "Recolecciones.pdf");
//             document.body.appendChild(link);
//             link.click();
//           });
//         });
//     });
// };
