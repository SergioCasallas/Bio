import React, { useContext } from "react";
import { sendDatosPdf } from "../../services/apiReportesPagosPdf/apiReportesPagosPdf.js";
import pkClienteContext from "../../context/Login/PkClientesContext";
import AlertaContext from "../../context/Alerta/AlertaContext";
const TablaReportesPagos = ({ datos, fechas }) => {
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

  const titles = [
    "factura",
    "ValorBruto",
    "Iva",
    "ValorTotal",
    "FechaFactura",
    "FechaPago",
    "ValorRecaudo",
    "Dedecciones",
    "ReteIca",
    "ReteFuente",
    "Otros",
  ];

  const separadorMiles = (numero, separador = ".") => {
    if (typeof numero !== "number" || !Number.isInteger(numero)) {
      return null;
    }
    numero = String(numero);
    return numero.replace(/\B(?=(\d{3})+(?!\d))/g, separador);
  };

  // !Fechas
  const date = new Date();

  const sendDatos = (index) => {
    if (bloqueado === "0") {
      if (index === "all") {
        const datosReciboPagosPdf = {
          fechaInicial: fechas[0].fechaInicial,
          fechaFinal: fechas[0].fechaFinal,
          fechaActual: `${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()}`,
          nombreCompania: nombreCliente,
          nit: nit,
          pago: [datos],
        };

        sendDatosPdf(datosReciboPagosPdf);
      } else {
        const datosReciboPagosPdf = {
          fechaActual: `${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()}`,
          nombreCompania: nombreCliente,
          nit: nit,
          pago: [
            {
              Metodo_Pago: datos[index].Metodo_Pago,
              Cuenta: datos[index].Cuenta,
              Recibo: datos[index].Recibo,
              Fecha_Pago: datos[index].Fecha_Pago,
              Numero: datos[index].Numero,
              Fecha: datos[index].Fecha,
              Valor: datos[index].Valor,
              Saldo: datos[index].Saldo,
            },
          ],
        };

        sendDatosPdf(datosReciboPagosPdf);
      }
    } else {
      MostrarAlerta(
        "Por favor pague sus ultimas facturas para poder descargar los Pdfs"
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
            <tr className="table-container__tr">
              <td className="table__tbody-tr-td"></td>
              <td className="table__tbody-tr-td"></td>
              <td className="table__tbody-tr-td"></td>
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
                    Descargar Todos
                  </button>
                ) : null}
              </td>
            </tr>

            {!datos.mensaje
              ? datos.map((item, index) => (
                  <tr className="table-container__tr" key={index}>
                    <td className="table__tbody-tr-td">{item.Numero}</td>
                    <td className="table__tbody-tr-td">{item.Valor_Bruto}</td>
                    <td className="table__tbody-tr-td">{item.Valor_IVA}</td>
                    <td className="table__tbody-tr-td">{item.Valor}</td>
                    <td className="table__tbody-tr-td">{item.Fecha}</td>
                    <td className="table__tbody-tr-td">{item.Fecha_Pago}</td>
                    <td className="table__tbody-tr-td">{item.Neto}</td>

                    <td className="table__tbody-tr-td">{item.Neto}</td>
                    <td className="table__tbody-tr-td">
                      {item.Valor_Bruto * item.ICA}
                    </td>
                    <td className="table__tbody-tr-td">
                      {item.Valor_Bruto * item.Retefuente}
                    </td>
                    <td className="table__tbody-tr-td">{item.Neto}</td>
                  </tr>
                ))
              : null}
          </tbody>
          <tfoot className="table__tfooter">
            <tr>
              <th>TotalFacturas</th>
              <th>Total Valor Facturas</th>
              <th>Saldo Pendiente</th>
            </tr>
            <tr>
              <td>{numeroTotalFacturas}</td>
              <td>{separadorMiles(valorTotalFacturas)}</td>
              <td>{separadorMiles(saldoPendiente)}</td>
            </tr>
          </tfoot>
        </table>

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

export default TablaReportesPagos;
