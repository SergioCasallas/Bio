import React from "react";

const TablaFacturacion = ({ datos }) => {
  let valorTotalFacturas = 0;
  let numeroTotalFacturas = 0;
  let saldoPendiente = 0;

  datos.data.map(
    (item) => (
      // eslint-disable-next-line
      (valorTotalFacturas += item.Valor),
      (numeroTotalFacturas += 1),
      item.Estado !== "Por_Pagar" ? (saldoPendiente += item.Valor) : null
    )
  );

  const separadorMiles = (numero, separador = ".") => {
    if (typeof numero !== "number" || !Number.isInteger(numero)) {
      return null;
    }
    numero = String(numero);
    return numero.replace(/\B(?=(\d{3})+(?!\d))/g, separador);
  };

  console.log(valorTotalFacturas);
  console.log(numeroTotalFacturas);
  console.log(saldoPendiente);

  const titles = ["factura", "estado", "valor", "fecha facturacion", "saldo"];
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
                <tr
                  className="table-container__tr"
                  key={item.Fecha}
                >
                  <td className="table__tbody-tr-td">{item.Numero}</td>
                  <td className="table__tbody-tr-td">{item.Estado}</td>
                  <td className="table__tbody-tr-td">
                    {separadorMiles(item.Valor)}
                  </td>
                  <td className="table__tbody-tr-td">
                    {item.Fecha.substr(0, 10)}
                  </td>
                  <td className="table__tbody-tr-td">
                    {separadorMiles(item.Saldo)}
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
      <br />
      <table className="table-container-total">
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
      </table>
    </>
  );
};

export default TablaFacturacion;
