import React from "react";

const TablaFacturacion = ({ datos }) => {
  console.log(datos);

  let valorTotalFacturas = 0;
  let numeroTotalFacturas = 0;
  let saldoPendiente = 0;

  datos.data.map(
    (item) => (
      // eslint-disable-next-line
      (valorTotalFacturas += item.Valor),
      (numeroTotalFacturas += 1),
      item.Estado === "Por_Pagar" ? (saldoPendiente += item.Valor) : null,
      console.log(saldoPendiente)
    )
  );

  const separadorMiles = (numero, separador = ".") => {
    if (typeof numero !== "number" || !Number.isInteger(numero)) {
      console.log(numero);
      return null;
    }
    numero = String(numero);
    return numero.replace(/\B(?=(\d{3})+(?!\d))/g, separador);
  };

  const eliminadorSeparadores = (string) => {
    return string.replace(/_/g, " ");
  };

  console.log(typeof 0 !== "number" || !Number.isInteger(0));

  const titles = [
    "factura",
    "estado",
    "valor",
    "fecha facturacion",
    "fecha vencimiento",
    "saldo",
  ];
  return (
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
                  <td className="table__tbody-tr-td" width="200px">
                    {eliminadorSeparadores(item.Numero)}
                  </td>
                  <td className="table__tbody-tr-td" width="200px">
                    {eliminadorSeparadores(item.Estado)}
                  </td>
                  <td className="table__tbody-tr-td" width="200px">
                    {`$ ${separadorMiles(item.Valor)}`}
                  </td>
                  <td className="table__tbody-tr-td" width="200px">
                    {item.Fecha.substr(0, 10)}
                  </td>
                  <td className="table__tbody-tr-td" width="200px">
                    {item.Limite_Pago.substr(0, 10)}
                  </td>
                  <td className="table__tbody-tr-td" width="200px">
                    {item.Saldo >= 0
                      ? `$ ${separadorMiles(item.Saldo)}`
                      : `$ 0`}
                  </td>
                </tr>
              ))
            : null}
        </tbody>
        <tfoot className="table__tfooter">
          <tr>
            <th width="200">TotalFacturas</th>
            <th width="200px"></th>
            <th width="200px">Total Valor Facturas</th>
            <th width="200px"></th>
            <th width="200px"></th>
            <th width="200px">Saldo Pendiente</th>
          </tr>
          <tr>
            <td>{numeroTotalFacturas}</td>
            <td></td>
            <td>{`$ ${separadorMiles(valorTotalFacturas)}`}</td>
            <td></td>
            <td></td>
            <td>{`$ ${separadorMiles(saldoPendiente)}`}</td>
          </tr>
        </tfoot>
      </table>
      {/* <br />
      <table className="table-container-total">
        <thead>
          <tr>
            <th width="200px">TotalFacturas</th>
            <th width="200px"></th>
            <th width="200px">Total Valor Facturas</th>
            <th width="200px"></th>
            <th width="200px"></th>
            <th width="200px">Saldo Pendiente</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{numeroTotalFacturas}</td>
            <td></td>
            <td>{separadorMiles(valorTotalFacturas)}</td>
            <td></td>
            <td></td>
            <td>{separadorMiles(saldoPendiente)}</td>
          </tr>
        </tbody>
      </table> */}
    </>
  );
};

export default TablaFacturacion;
