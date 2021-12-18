import React, { useContext } from "react";
import { getCertificadoPdf } from "../../services/apiCertificadosPdf/apiCertificadosPdf";
import pkClienteContext from "../../context/Login/PkClientesContext";
import AlertaContext from "../../context/Alerta/AlertaContext";

const TablaCertificados = ({ datos, datosBusqueda }) => {
  // console.log(datosBusqueda);
  // console.log(datos);
  const { nit, nombreCliente, UUIDSedes, bloqueado } =
    useContext(pkClienteContext);
  const { MostrarAlerta } = useContext(AlertaContext);
  const titles = [
    "Plan de Trabajo",
    "Residuo",
    "Direccion",
    "Fecha",
    "Peso Confirmado",
    "Cantidad Confirmado",
    "Descargar",
  ];

  // !Fechas
  const date = new Date();

  const sendDatos = async () => {
    if (bloqueado === "0") {
      let sedeName = "";

      // console.log(UUIDSedes);

      await UUIDSedes.map((item) =>
        item.UUID === datos[0].UUID_Sede ? (sedeName += item.Nombre_Sede) : null
      );

      // console.log(datos[0].UUID_Sede);
      // console.log(sedeName);

      const datosCertificadoPdf = {
        fechaActual: `${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`,
        nombreCompania: nombreCliente,
        nit,
        fechaInicial: datosBusqueda.fechaInicial,
        fechaFinal: datosBusqueda.fechaFinal,
        sede: datosBusqueda.UUIDSede,
        sedeName: await sedeName,
      };

      // console.log(datosCertificadoPdf);

      getCertificadoPdf( await datosCertificadoPdf);
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
            <tr>
              {titles.map((item, index) => (
                <th key={index}>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="table-container__tr">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="table__tbody-tr-td">
                <button
                  className="table__tbody-tr-button"
                  onClick={() => {
                    sendDatos(`all`);
                  }}
                >
                  Descargar Todos
                </button>
              </td>
            </tr>

            {datos
              ? datos.map((item, index) => (
                  <tr className="table-container__tr" key={index}>
                    <td className="table__tbody-tr-td">{item.work_plan_no}</td>
                    <td className="table__tbody-tr-td">{item.residue}</td>
                    <td className="table__tbody-tr-td">
                      {item.company_address}
                    </td>
                    <td className="table__tbody-tr-td">
                      {item.created_date
                        ? item.created_date.substr(0, 10)
                        : item.created_date}
                    </td>
                    <td className="table__tbody-tr-td">
                      {item.confirmed_weight}
                    </td>
                    <td className="table__tbody-tr-td">
                      {item.confirmed_quantity}
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

export default TablaCertificados;
