import React, { useContext } from "react";
import { createManifiestoPdf } from "../../services/apiReportesManifiestosPdf/apiReportesManifiestoPdf";
import pkClienteContext from "../../context/Login/PkClientesContext";
import AlertaContext from "../../context/Alerta/AlertaContext";

const TablaReportesManifiestos = ({ datos }) => {
  const { bloqueado, UUIDSedes } = useContext(pkClienteContext);
  const { MostrarAlerta } = useContext(AlertaContext);
  const titles = [
    "N° RECIBO",
    "Sede",
    "Direccion",
    "Peso Total (KG)",
    "Descarga",
  ];

  const sendDatos = (index) => {
    if (bloqueado === "0") {
      const datosManifiesto = {
        numeroReporte: datos.data[index].work_plan_no,
        UUIDSede: datos.data[index].UUID_Sede,
      };
      createManifiestoPdf(datosManifiesto);
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
              {titles
                ? titles.map((item, index) => (
                    <th key={index}>{item.toUpperCase()}</th>
                  ))
                : null}
            </tr>
          </thead>
          <tbody>
            {datos.data.mensaje
              ? null
              : datos.data.map((item, index) => (
                  <tr className="table-container__tr" key={index}>
                    <td className="table__tbody-tr-td">{item.work_plan_no}</td>
                    <td className="table__tbody-tr-td">
                      {UUIDSedes.map((sede) =>
                        sede.UUID === item.UUID_Sede
                          ? sede.Nombre_Sede
                          : null
                      )}
                    </td>
                    <td className="table__tbody-tr-td">
                      {item.company_address}
                    </td>
                    {/* <td className="table__tbody-tr-td">
                      {item.created_date
                        ? item.created_date.substr(0, 10)
                        : item.created_date}
                    </td> */}

                    <td className="table__tbody-tr-td">
                      {item.confirmed_weight}
                    </td>
                    {/* <td className="table__tbody-tr-td">
                      {item.confirmed_quantity}
                    </td> */}
                    <td className="table__tbody-tr-td">
                      <button
                        className="table__tbody-tr-button"
                        onClick={(e) => {
                          sendDatos(index);
                        }}
                      >
                        Descarga
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </>
    </div>
  );
};

export default TablaReportesManifiestos;
