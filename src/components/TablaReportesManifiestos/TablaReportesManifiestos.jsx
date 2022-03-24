import React, { useContext, useState, useEffect } from "react";
import { createManifiestoPdf } from "../../services/apiReportesManifiestosPdf/apiReportesManifiestoPdf";
import pkClienteContext from "../../context/Login/PkClientesContext";
import AlertaContext from "../../context/Alerta/AlertaContext";

const TablaReportesManifiestos = ({ datos }) => {
  const { bloqueado, UUIDSedes } = useContext(pkClienteContext);
  const { MostrarAlerta } = useContext(AlertaContext);

  const [datosTable, setDatosTable] = useState(null);

  const titles = [
    "Fecha",
    "Sede",
    "Direccion",
    "No Recibo",
    "Embalaje",
    "Peso Total (KG)",
    "Descarga",
  ];

  useEffect(() => {
    if (datos.data.mensaje) {
      setDatosTable(null)
      return;
    } else if (datos.data !== null && !datos.mensaje) {
      const dataAsynchronously = async () => {
        const datosGroupBy = (miarray, prop) => {
          return miarray.reduce((groups, item) => {
            const val = item[prop];

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
              package: item.package,
              destroy_buckets:item.destroy_buckets,
              WPUID: item.WPUID,
            };

            if (!isNaN(parseFloat(item.confirmed_weight))) {
              groups[val].confirmed_weight += parseFloat(item.confirmed_weight);
            } else {
              groups[val].confirmed_weight += 0;
            }

            return groups;
          }, {});
        };

        const dataUnified = await Object.values(
          datosGroupBy(datos.data, "WPUID")
        );

        setDatosTable(dataUnified);
      };

      dataAsynchronously();
    }
  }, [datos]);

  const sendDatos = (work_plan_no, UUID_Sede) => {
    // if (bloqueado === "0") {
      const datosManifiesto = {
        numeroReporte: work_plan_no,
        UUIDSede: UUID_Sede,
      };
      createManifiestoPdf(datosManifiesto);
    // } else {
    //   MostrarAlerta(
    //     "Por favor pague sus ultimas facturas para poder descargar los pdf`s"
    //   );
    // }
  };

  return (
    <div>
      <>
        <table className="table-container">
          <thead className="table__title-header">
            <tr>
              {titles
                ? titles.map((item, index) => (
                    <th key={index}>{item}</th>
                  ))
                : null}
            </tr>
          </thead>
          <tbody>
            {datosTable !== null
              ? datosTable.map((item, index) => (
                  <tr className="table-container__tr" key={index}>
                    <td className="table__tbody-tr-td">
                      {item.client_signature_timestamp
                        ? item.client_signature_timestamp.substring(0, 10)
                        : ""}
                    </td>
                    <td className="table__tbody-tr-td">
                      {UUIDSedes.map((sede) =>
                        sede.UUID === item.UUID_Sede ? sede.Nombre_Sede : null
                      )}
                    </td>
                    <td className="table__tbody-tr-td">
                      {item.company_address}
                    </td>
                    <td className="table__tbody-tr-td">
                      {item.work_plan_detail_id}
                    </td>

                    <td className="table__tbody-tr-td">{item.destroy_buckets}</td>
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
                          sendDatos(item.work_plan_no, item.UUID_Sede);
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

export default TablaReportesManifiestos;
