import React, { useContext } from "react";
import pkClienteContext from "../../context/Login/PkClientesContext";
import { createReportesSaldosPdf } from "../../services/apiReportesSaldosPdf/apiReportesSaldosPdf.js";

const TablaReportesSaldos = ({ datos, fechas }) => {
  const { nombreCliente, nit } = useContext(pkClienteContext);

  const separadorMiles = (numero, separador = ".") => {
    if (typeof numero !== "number" || !Number.isInteger(numero)) {
      return null;
    }
    numero = String(numero);
    return numero.replace(/\B(?=(\d{3})+(?!\d))/g, separador);
  };

  const titles = [
    "no. fact",
    "fecha fact.",
    "cliente",
    "fecha vencimiento",
    "vr total factura",
    "Saldo",
  ];

  const sendDatos = (index) => {
    const date = new Date();
    if (index === "all") {
      const datosReciboSaldosPdf = {
        fechaInicial: fechas[0].fechaInicial,
        fechaFinal: fechas[0].fechaFinal,
        fechaActual: `${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`,
        nit,
        nombreCliente,
        saldos: [datos],
      };
      createReportesSaldosPdf(datosReciboSaldosPdf);
    } else {
      const datosReciboSaldosPdf = {
        fechaActual: `${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`,
        nit,
        nombreCliente,
        saldos: [
          {
            numeroFactura: datos[index].Numero,
            fecha: datos[index].Fecha,
            limitePago: datos[index].Limite_Pago,
            valor: datos[index].Valor,
            saldo: datos[index].Saldo,
          },
        ],
      };
      createReportesSaldosPdf(datosReciboSaldosPdf);
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
            {!datos.mensaje
              ? datos.map((item, index) => (
                  <tr className="table-container__tr" key={index}>
                    <td className="table__tbody-tr-td">{item.Numero}</td>
                    <td className="table__tbody-tr-td">
                      {item.Fecha.substr(0, 10)}
                    </td>
                    <td className="table__tbody-tr-td">{nombreCliente}</td>
                    <td className="table__tbody-tr-td">
                      {item.Limite_Pago.substring(0, 10)}
                    </td>
                    <td className="table__tbody-tr-td">
                      {separadorMiles(item.Valor)}
                    </td>
                    <td className="table__tbody-tr-td">
                      {separadorMiles(item.Saldo)}
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

            <tr className="table-container__tr">
              <td className="table__tbody-tr-td"></td>
              <td className="table__tbody-tr-td"></td>
              <td className="table__tbody-tr-td"></td>
              <td className="table__tbody-tr-td"></td>
              <td className="table__tbody-tr-td"></td>
              <td className="table__tbody-tr-td">
                {datos.length > 1 ? (
                  <button
                    className="table__tbody-tr-button"
                    onClick={(e) => {
                      sendDatos("all");
                    }}
                  >
                    Descarga Todos
                  </button>
                ) : null}
              </td>
            </tr>
          </tbody>
        </table>
      </>
    </div>
  );
};

export default TablaReportesSaldos;
