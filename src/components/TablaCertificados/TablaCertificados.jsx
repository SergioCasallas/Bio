import React, { useContext } from "react";
import { getCertificadoPdf } from "../../services/apiCertificadosPdf/apiCertificadosPdf";
import pkClienteContext from "../../context/Login/PkClientesContext";

const TablaCertificados = ({ datos }) => {
  const { nit, nombreCliente, UUIDSedes } = useContext(pkClienteContext);
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

  const sendDatos = (index) => {
    let sedeName = "";

    UUIDSedes.map((item) =>
      item.UUID === datos[index].UUID_Sede
        ? (sedeName += item.Nombre_Sede)
        : null
    );

    const datosCertificadoPdf = {
      fechaActual: `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`,
      nombreCompania: nombreCliente,
      nit,
      numeroWorkPlan: datos[index].work_plan_no,
      sede: datos[index].UUID_Sede,
      sedeName,
    };
    getCertificadoPdf(datosCertificadoPdf);
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
                    <td className="table__tbody-tr-td">
                      <button
                        onClick={() => {
                          sendDatos(index);
                        }}
                      >
                        Descargar
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

export default TablaCertificados;
