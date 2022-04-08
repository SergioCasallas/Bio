import React, { useContext } from "react";
// import AlertaContext from "../../context/Alerta/AlertaContext";
import pkClienteContext from "../../context/Login/PkClientesContext";
import { sendDatosPdf } from "../../services/apiReportesPagosPdf/apiReportesPagosPdf.js";
import "../../styles/components/_tableReportesPagos.scss";

const TablaReportesPagos = ({ datos, fechas }) => {
  const { nombreCliente, nit, bloqueado } = useContext(pkClienteContext);
  // const { MostrarAlerta } = useContext(AlertaContext);

  let valorTotalFacturas = 0;
  let numeroTotalFacturas = 0;
  let totalRecaudo = 0;

  datos.map(
    (item) => (
      // eslint-disable-next-line
      (valorTotalFacturas += item.Valor),
      (numeroTotalFacturas += 1),
      item.Neto > 0 ? (totalRecaudo += item.Neto) : null
    )
  );

  const titles = [
    "factura",
    "ValorBruto",
    "Iva",
    "ValorTotal",
    "FechaFactura (YY/MM/DD)",
    "FechaPago (YY/MM/DD)",
    "ValorRecaudo",
    "Saldo",
    "Deducciones",
    "Ret.Ica",
    "Ret.Fuente",
    "Otros",
  ];

  const separadorMiles = (numero, separador = ".") => {
    if (typeof numero !== "number" || !Number.isInteger(numero)) {
      var parts = numero.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(",");
    }
    numero = String(numero);
    return numero.replace(/\B(?=(\d{3})+(?!\d))/g, separador);
  };

  const eliminadorSeparadores = (string) => {
    return string.replace(/_/g, " ");
  };

  // const format = (num) => {
  //   String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1,");
  // };

  // console.log(12121212.12121212);

  // !Fechas
  const date = new Date();

  const sendDatos = (index) => {
    // if (bloqueado === "0") {
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
    // } else {
    //   MostrarAlerta(
    //     "Por favor pague sus ultimas facturas para poder descargar los Pdfs"
    //   );
    // }
  };

  return (
    <div>
      <>
        <table className="table-container">
          <thead className="table-pagos__title-header">
            <tr>
              {titles
                ? titles.map((item, index) => <th key={index}>{item}</th>)
                : null}
            </tr>
          </thead>
          <tbody className="table-pagos__tbody">
            {!datos.mensaje
              ? datos.map((item, index) => (
                  <tr className="table-container__tr" key={index}>
                    <td className="table__tbody-tr-td">
                      {eliminadorSeparadores(item.Numero)}
                    </td>
                    <td className="table__tbody-tr-td">
                      {`$ ${separadorMiles(item.Valor_Bruto)}`}
                    </td>
                    <td width="50px" className="table__tbody-tr-td">
                      {`$ ${separadorMiles(item.Valor_IVA)}`}
                    </td>
                    <td className="table__tbody-tr-td">
                      {`$ ${separadorMiles(item.Valor)}`}
                    </td>
                    <td className="table__tbody-tr-td">
                      {item.Fecha.substr(0, 10)}
                    </td>
                    <td className="table__tbody-tr-td">{item.Fecha_Pago}</td>
                    <td className="table__tbody-tr-td">
                      {`$ ${separadorMiles(item.Neto)}`}
                    </td>

                    <td className="table__tbody-tr-td">
                      {`$ ${separadorMiles(item.Saldo)}`}
                    </td>

                    <td width="50px" className="table__tbody-tr-td">
                      {`$ ${
                        item.Tipo_Pago === "Saldo"
                          ? separadorMiles(
                              (item.Valor_Bruto * parseFloat(item.Retefuente)) /
                                100 +
                                item.Valor_Bruto * parseFloat(item.ICA) +
                                item.Valor_IVA +
                                parseFloat(item.Otros)
                            )
                          : "0"
                      }`}
                    </td>
                    <td width="80px" className="table__tbody-tr-td">
                      {`$ ${
                        item.Tipo_Pago === "Saldo"
                          ? separadorMiles(
                              item.Valor_Bruto * parseInt(item.ICA)
                            )
                          : "0"
                      }`}
                    </td>
                    <td className="table__tbody-tr-td">
                      {`$ ${
                        item.Tipo_Pago === "Saldo"
                          ? separadorMiles(
                              (item.Valor_Bruto * parseInt(item.Retefuente)) /
                                100
                            )
                          : "0"
                      }`}
                    </td>
                    <td width="50px" className="table__tbody-tr-td">
                      {`$ ${
                        item.Otros.length > 4
                          ? item.Tipo_Pago === "Saldo"
                            ? parseFloat(item.Otros)
                            : "0"
                          : item.Otros
                      }`}
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
          <tfoot className="table__tfooter">
            <tr className="table-pagos__title-header">
              <th>TotalFacturas</th>
              <th></th>
              <th></th>
              <th>Total Valor Facturas</th>
              <th></th>
              <th></th>
              <th>Total Recaudo</th>

              {/* <th>Saldo Pendiente</th> */}
              <th></th>

              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
            <tr className="table-pagos__tbody">
              <td>{numeroTotalFacturas}</td>
              <td></td>
              <td></td>
              <td>{`$ ${separadorMiles(valorTotalFacturas)}`}</td>
              <td></td>
              <td></td>
              <td>{`$ ${separadorMiles(totalRecaudo)}`}</td>

              {/* <td>{`$ ${separadorMiles(saldoPendiente)}`}</td> */}
              <td></td>

              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tfoot>
        </table>

        <div className="container-button">
          {
            <button
              className="table__tbody-tr-button"
              onClick={(e) => {
                sendDatos("all");
              }}
            >
              Descargar Todos
            </button>
          }
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

export default TablaReportesPagos;
