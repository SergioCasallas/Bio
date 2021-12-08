import React, { useContext } from "react";
import { sendDatosPdf } from "../../services/apiReportesPagosPdf/apiReportesPagosPdf.js";
import pkClienteContext from "../../context/Login/PkClientesContext";

const TablaReportesPagos = ({ datos, fechas }) => {
  const { nombreCliente, nit } = useContext(pkClienteContext);

  const titles = [
    "forma de pago",
    "no. pago",
    "rc. axiliar",
    "fecha pg.",
    "no. fact.",
    "fecha fact.",
    "vr factura",
    "vr. recaudo",
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
  };

  // const sendAllDatos = (index) => {
  // }

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
                    <td className="table__tbody-tr-td">{item.Metodo_Pago}</td>
                    <td className="table__tbody-tr-td">{item.Cuenta}</td>
                    <td className="table__tbody-tr-td">{item.Recibo}</td>
                    <td className="table__tbody-tr-td">
                      {item.Fecha_Pago.substr(0, 10)}
                    </td>
                    <td className="table__tbody-tr-td">{item.Numero}</td>
                    <td className="table__tbody-tr-td">
                      {item.Fecha.substr(0, 10)}
                    </td>
                    <td className="table__tbody-tr-td">
                      {separadorMiles(item.Valor)}
                    </td>
                    <td className="table__tbody-tr-td">
                      {/* {item.Valor - item.Saldo} */}
                      {separadorMiles(item.Valor - item.Saldo)}
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
          </tbody>
        </table>
      </>
    </div>
  );
};

export default TablaReportesPagos;
