import React, { useContext } from "react";
import AlertaContext from "../../context/Alerta/AlertaContext";
import pkClienteContext from "../../context/Login/PkClientesContext";
import { createReportesSaldosPdf } from "../../services/apiReportesSaldosPdf/apiReportesSaldosPdf.js";

const TablaReportesSaldos = ({ datos, fechas }) => {
  const { nombreCliente, nit, bloqueado } = useContext(pkClienteContext);
  const { MostrarAlerta } = useContext(AlertaContext);

  let valorTotalFacturas = 0;
  let numeroTotalFacturas = 0;
  let saldoPendiente = 0;

  datos.map(
    (item) => (
      // eslint-disable-next-line
      (valorTotalFacturas += item.Valor),
      (numeroTotalFacturas += 1),
      item.Valor === item.Saldo ? (saldoPendiente += item.Valor) : null
    )
  );

  const separadorMiles = (numero, separador = ".") => {
    if (typeof numero !== "number" || !Number.isInteger(numero)) {
      return null;
    }
    numero = String(numero);
    return numero.replace(/\B(?=(\d{3})+(?!\d))/g, separador);
  };

  const titles = [
    "no. factura",
    "fecha factura",
    "cliente",
    "fecha vencimiento",
    "valor total factura",
    "valor saldo",
  ];

  const sendDatos = (index) => {
    const date = new Date();
    // if (bloqueado === "0") {
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
    // } else {
    //   MostrarAlerta(
    //     "Por favor pague sus ultimas facturas para poder descargar los pdfs"
    //   );
    // }
  };

  const eliminadorSeparadores = (string) => {
    return string.replace(/_/g, " ");
  };

  return (
    <div>
      <>
        <table className="table-container">
          <thead className="table__title-header">
            <tr>
              {titles
                ? titles.map((item, index) => <th key={index}>{item}</th>)
                : null}
            </tr>
          </thead>
          <tbody>
            {/* <tr className="table-container__tr">
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
            </tr> */}

            {!datos.mensaje
              ? datos.map((item, index) => (
                  <tr className="table-container__tr" key={index}>
                    <td className="table__tbody-tr-td">
                      {eliminadorSeparadores(item.Numero)}
                    </td>
                    <td className="table__tbody-tr-td">
                      {item.Fecha ? item.Fecha.substr(0, 10) : null}
                    </td>
                    <td width="200px" className="table__tbody-tr-td">
                      {nombreCliente}
                    </td>
                    <td className="table__tbody-tr-td">
                      {item.Limite_Pago
                        ? item.Limite_Pago.substring(0, 10)
                        : null}
                    </td>
                    <td className="table__tbody-tr-td">
                      {`$ ${separadorMiles(item.Valor)}`}
                    </td>
                    <td className="table__tbody-tr-td">
                      {`$ ${separadorMiles(item.Saldo)}`}
                    </td>
                    {/* <td className="table__tbody-tr-td">
                      <button
                        className="table__tbody-tr-button"
                        onClick={(e) => {
                          sendDatos(index);
                        }}
                      >
                        Descarga
                      </button>
                    </td> */}
                  </tr>
                ))
              : null}
          </tbody>

          <tfoot className="table__tfooter">
            <tr>
              <th>TotalFacturas</th>
              <th></th>
              <th></th>
              <th></th>
              <th>Total Valor Facturas</th>
              <th>Saldo Pendiente</th>
            </tr>
            <tr>
              <td>{numeroTotalFacturas}</td>
              <td></td>
              <td></td>
              <td></td>
              <td>{`$ ${separadorMiles(valorTotalFacturas)}`}</td>
              <td>{`$ ${separadorMiles(saldoPendiente)}`}</td>
            </tr>
          </tfoot>
        </table>

        <div className="container-button">

        <button
          className="table__tbody-tr-button"
          onClick={(e) => {
            sendDatos("all");
          }}
          >
          Descarga Todos
        </button>
          </div>

        {/* <table className="table-container-total">
          <thead>
            <tr>
              <th>Total Valor Facturas</th>
              <th>TotalFacturas</th>
              <th>Saldo Pendiente</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{separadorMiles(valorTotalFacturas)}</td>
              <td>{numeroTotalFacturas}</td>
              <td>{separadorMiles(saldoPendiente)}</td>
            </tr>
          </tbody>
        </table> */}
      </>
    </div>
  );
};

export default TablaReportesSaldos;
