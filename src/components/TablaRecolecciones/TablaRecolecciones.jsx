import React, { useContext } from "react";
import { sendDatosPdf } from "../../services/apiPdf/apiPdf";
import pkClienteContext from "../../context/Login/PkClientesContext";
import AlertaContext from "../../context/Alerta/AlertaContext";

const TablaRecolecciones = ({ datos }) => {
  const { nombreCliente, nit, UUIDSedes, bloqueado } =
    useContext(pkClienteContext);
  const { MostrarAlerta } = useContext(AlertaContext);
  console.log(datos);
  const titles = [
    "Plan de Trabajo",
    "Residuo",
    "Direccion",
    "Fecha",
    "Peso Confirmado",
    "Cantidad Confirmado",
    "Descarga",
  ];

  // !Fechas
  const date = new Date();
  // !Datos de Prueba

  const sendDatos = (index) => {
    if (bloqueado === "0") {
      let sedeName = "";
      UUIDSedes.map((item) =>
        item.UUID === datos.data[index].UUID_Sede
          ? (sedeName += item.Nombre_Sede)
          : ""
      );
      const datosPrueba = {
        fechaActual: `${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`,
        nombreCompania: nombreCliente,
        nit: nit,
        numeroWorkPlan: datos.data[index].work_plan_no,
        sede: datos.data[index].UUID_Sede,
        sedeName,
      };

      sendDatosPdf(datosPrueba);
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
            {datos
              ? datos.data.map((item, index) => (
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
                ))
              : null}
          </tbody>
        </table>
      </>
    </div>
  );
};

export default TablaRecolecciones;
