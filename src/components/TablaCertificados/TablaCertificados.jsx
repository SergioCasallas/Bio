import React, { useState,useContext, useEffect } from "react";
import AlertaContext from "../../context/Alerta/AlertaContext";
import pkClienteContext from "../../context/Login/PkClientesContext";
import { getCertificadoPdf } from "../../services/apiCertificadosPdf/apiCertificadosPdf";

const TablaCertificados = ({ datos, datosBusqueda }) => {

  const [datosTable, setDatosTable]=useState(null);


  useEffect(() => {
    if (datos) {
      const dataAsynchronously = async () => {
        const datosGroupBy = (miarray, prop) => {
          return miarray.reduce((groups, item) => {
            const val = item[prop];

            groups[val] = groups[val] || {
              ID: item.ID,
              Mes: item.Mes,
              Observaciones: item.Observaciones,
              Peso: item.Peso,
              Peso_Adicional: item.Peso_Adicional,
              Peso_Total: item.Peso_Total,
              Residuo: item.Residuo,
              Residuo_Tipo: item.Residuo_Tipo,
              SQL: item.SQL,
              Unidad: item.Unidad,
              UUID_Factura: item.UUID_Factura,
              Valor_Total: item.Valor_Total,
              Valor_Unico: item.Valor_Unico,
              Bimensual: item.Bimensual,
              Fecha_Recoleccion: item.Fecha_Recoleccion,
              Plan_Trabajo: item.Plan_Trabajo,
              Periodo: item.Periodo,
              Factura: item.Factura,
              UUID_Sede: item.UUID_Sede,
              Sede: item.Sede,
              Cliente: item.Cliente,
              UUID_Cliente: item.UUID_Cliente,
              Tipo_Cliente: item.Tipo_Cliente,
            };

            // if (!isNaN(parseFloat(item.Valor_Total))) {
            //   groups[val].Valor_Total += parseFloat(item.Valor_Total);
            // } else {
            //   groups[val].Valor_Total += 0;
            // }

            return groups;
          }, {});
        };

        const dataUnified = await Object.values(
          datosGroupBy(datos, "UUID_Factura")
        );

        setDatosTable(dataUnified);
      };

      dataAsynchronously();
    }
  }, [datos]);




  const { nit, nombreCliente, UUIDSedes, bloqueado } =
    useContext(pkClienteContext);
  const { MostrarAlerta } = useContext(AlertaContext);
  const titles = ["Factura", "Fecha", "Sede", "Valor Factura","Descarga"];


   const separadorMiles = (numero, separador = ".") => {
     if (typeof numero !== "number" || !Number.isInteger(numero)) {
       var parts = numero.toString().split(".");
       parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
       return parts.join(",");
     }
     numero = String(numero);
     return numero.replace(/\B(?=(\d{3})+(?!\d))/g, separador);
   };

  // !Fechas
  const date = new Date();

  const sendDatos = async (UUID_Factura) => {
    if (bloqueado === "0") {
      let sedeName = "";

      await UUIDSedes.map((item) =>
        item.UUID === datos[0].UUID_Sede ? (sedeName += item.Nombre_Sede) : null
      );

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
        UUID_Factura,
      };

      getCertificadoPdf(await datosCertificadoPdf);
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
            {/* <tr className="table-container__tr">
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
            </tr> */}

            {datosTable !== null
              ? datosTable.map((item, index) => (
                  <tr className="table-container__tr" key={index}>
                    <td width="200px" className="table__tbody-tr-td">
                      {item.Factura}
                    </td>
                    <td width="200px" className="table__tbody-tr-td">
                      {item.Fecha_Recoleccion.substr(0, 10)}
                    </td>
                    <td width="300px" className="table__tbody-tr-td">
                      {item.Tipo_Cliente === "1" ||
                      item.Tipo_Cliente === "3" ||
                      item.Tipo_Cliente === "5" ||
                      item.Tipo_Cliente === null
                        ? item.Sede
                        : item.Cliente}
                    </td>
                    <td width="200px" className="table__tbody-tr-td">
                      {`$${separadorMiles(item.Valor_Total)}`}
                    </td>
                    <td width="100px" className="table__tbody-tr-td">
                      <button
                        className="table__tbody-tr-button"
                        onClick={() => {
                          sendDatos(item.UUID_Factura);
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
