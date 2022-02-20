import React, { useContext, useState, useEffect } from "react";
import { sendDatosPdf } from "../../services/apiPdf/apiPdf";
import pkClienteContext from "../../context/Login/PkClientesContext";
import AlertaContext from "../../context/Alerta/AlertaContext";

const TablaRecolecciones = ({ datos, datosBusqueda }) => {
  console.log(datos);
  const [datosTable, setDatosTable] = useState(null);

  useEffect(() => {
    if (datos) {
      const dataAsynchronously = async () => {
        const datosGroupBy = (miarray, prop) => {
          return miarray.reduce((groups, item) => {
            // console.log(Object.keys(groups).length);
            const val = item[prop];
            // console.log(val);
            // console.log("1");

            groups[val] = groups[val] || {
              UUID_Sede: item.UUID_Sede,
              company_address: item.company_address,
              confirmed_quantity: parseFloat(item.confirmed_quantity),
              confirmed_weight: 0,
              contact_name: item.contact_name,
              client_signature_timestamp: item.client_signature_timestamp,
              primary_secondary: item.primary_secondary,
              residue: item.residue,
              residue_physical_state: item.residue_physical_state,
              work_plan_detail_id: item.work_plan_detail_id,
              work_plan_no: item.work_plan_no,
            };

            // console.log(`${groups[val]} + 1`);

            if (!isNaN(parseFloat(item.confirmed_weight))) {
              groups[val].confirmed_weight += parseFloat(item.confirmed_weight);
            } else {
              groups[val].confirmed_weight += 0;
            }

            // console.log(`${groups[val]} + 2`);

            // console.log(Object.keys(groups).length);
            // console.log(Object.values(groups));

            return groups;
          }, {});
        };

        const dataUnified = await Object.values(
          datosGroupBy(datos.data, "work_plan_no")
        );

        setDatosTable(dataUnified);
      };

      dataAsynchronously();
    }
  }, [datos]);

  // var groupBy = function (miarray, prop) {
  // return miarray.reduce(function (groups, item) {
  // var val = item[prop];
  // groups[val] = groups[val] || { date: item.date, pv: 0, ac: 0, ev: 0 };
  // groups[val].pv += item.pv;
  // groups[val].ac += item.ac;
  // groups[val].ev += item.ev;
  // return groups;
  // }, {});
  // };

  // var rawtData = [
  //   { date: "2015-01-03", pv: 50, ac: 100, ev: 50 },
  //   { date: "2015-01-01", pv: 100, ac: 200, ev: 200 },
  //   { date: "2015-01-02", pv: 200, ac: 100, ev: 150 },
  //   { date: "2015-01-03", pv: 300, ac: 400, ev: 200 },
  //   { date: "2015-01-03", pv: 50, ac: 50, ev: 200 },
  //   { date: "2015-01-02", pv: 200, ac: 100, ev: 50 },
  //   { date: "2015-01-01", pv: 50, ac: 100, ev: 50 },
  //   { date: "2015-01-03", pv: 10, ac: 60, ev: 50 },
  //   { date: "2015-01-01", pv: 70, ac: 50, ev: 50 },
  //   { date: "2015-01-03", pv: 400, ac: 350, ev: 300 },
  // ];

  // var groupBy = (miarray, prop) => {
  //   return miarray.reduce((groups, item) => {
  //     const val = item[prop];
  //     groups[val] = groups[val] || { date: item.date, pv: 0, ac: 0, ev: 0 };
  //     groups[val].pv += item.pv;
  //     groups[val].ac += item.ac;
  //     groups[val].ev += item.ev;
  //     return groups;
  //   }, {});
  // };

  // console.log(groupBy(rawtData, "r"));

  // const dataloquesea =Object.values( groupBy(rawtData, "pv"));

  // console.log(dataloquesea);

  // const datosGroupBy = async (datosGruop, prop) => {
  //   const dataOrderBy = await datosGruop.reduce((group, item) => {
  //     let valor = item[prop];
  //     group[valor] = group[valor] || {
  //       date: item.work_plan_no,
  //       confirmed_weight: 0,
  //     };
  //     group[valor].confirmed_weight += parseFloat(item.confirmed_weight);
  //     return;
  //   }, {});

  //   console.log(dataOrderBy)

  // return Object.values(await dataOrderBy);
  // };

  // console.log(datosGroupBy(datos.data, "work_plan_no"));

  // const datosFinales=[]

  // const datosGruop = (group) => {
  //   group.map(
  //     (item) =>
  //       datosFinales.indexOf(item.work_plan_no) === -1 &&
  //       datosFinales.indexOf(item.UUID_Sede)===-1?
  //   );
  // };

  // console.log(datosGruop(datos.data));

  // const datosOrder = datosGroupBy(datos.data, "created_date");
  //!===================================================================================================================================================

  // const datosOrder = datos.data.sort((a, b) => a.created_date < b.created_date);

  // console.log(datos.data.sort((a, b) => a.created_date < b.created_date))

  const { nombreCliente, nit, UUIDSedes, bloqueado } =
    useContext(pkClienteContext);
  const { MostrarAlerta } = useContext(AlertaContext);
  const titles = [
    "Fecha de Recoleccion",
    "Direccion",
    "Sede",
    "PESO TOTAL (KG)",
    "Descarga",
  ];

  // !Fechas
  const date = new Date();
  // !Datos de Prueba

  const sendDatos = () => {

    datos.data.reverse();

    if (bloqueado === "0") {
      // let sedeName = "";
      // UUIDSedes.map((item) =>
      //   item.UUID === datos.data[index].UUID_Sede
      //     ? (sedeName += item.Nombre_Sede)
      //     : ""
      // );
      // const datosPrueba = {
      //   fechaActual: `${date.getDate()}/${
      //     date.getMonth() + 1
      //   }/${date.getFullYear()}`,
      //   nombreCompania: nombreCliente,
      //   nit: nit,
      //   numeroWorkPlan: datos.data[index].work_plan_no,
      //   sede: datos.data[index].UUID_Sede,
      //   sedeName,
      //   recolecciones: true,
      // };

      datos.data[0].fechaInicial = datosBusqueda.fechaInicial;
      datos.data[0].fechaFinal = datosBusqueda.fechaFinal;
      datos.data[0].nombreCliente = nombreCliente;
      datos.data[0].nit = nit;

      sendDatosPdf(datos);
    } else {
      MostrarAlerta(
        "Por favor pague sus ultimas facturas para poder descargar los pdfs"
      );
    }
  };

  return (
    <div>
      <>
        <table className="table-container">
          <thead className="table__title-header">
            <tr className="table__title-header-items">
              {titles
                ? titles.map((item, index) => (
                    <th key={index}>{item.toUpperCase()}</th>
                  ))
                : null}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="table__tbody-tr-td">
                <button
                  className="table__tbody-tr-button"
                  onClick={(e) => {
                    sendDatos();
                  }}
                >
                  Descarga
                </button>
              </td>
            </tr>
            {datosTable !== null
              ? datosTable.map((item, index) => (
                  <tr className="table-container__tr" key={index}>
                    <td className="table__tbody-tr-td">
                      {item.client_signature_timestamp}
                    </td>
                    <td className="table__tbody-tr-td">
                      {item.company_address}
                    </td>
                    <td className="table__tbody-tr-td">
                      {UUIDSedes.map((itemSede) =>
                        itemSede.UUID === item.UUID_Sede
                          ? itemSede.Nombre_Sede
                          : ""
                      )}
                    </td>
                    <td className="table__tbody-tr-td">
                      {item.confirmed_weight}
                    </td>
                    {/* <td className="table__tbody-tr-td">{item.residue}</td> */}
                    {/* <td className="table__tbody-tr-td"> */}
                    {/* {item.created_date
                        ? item.created_date.substr(0, 10)
                        : item.created_date} */}
                    {/* </td> */}
                    <td className="table__tbody-tr-td">
                      {/* <button
                        className="table__tbody-tr-button"
                        onClick={(e) => {
                          sendDatos();
                        }}
                      >
                        Descarga
                      </button> */}
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </>
    </div>
  );
};

export default TablaRecolecciones;
