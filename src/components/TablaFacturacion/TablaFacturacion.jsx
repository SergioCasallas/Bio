import React from "react";

const TablaFacturacion = ({ datos }) => {

  const separadorMiles = (numero, separador = ".") => {
    if (typeof numero !== "number" || !Number.isInteger(numero)) {
      return null;
    }
    numero = String(numero);
    return numero.replace(/\B(?=(\d{3})+(?!\d))/g, separador);
  };

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
                <tr key={item.Fecha}>
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
    </>
  );
};

export default TablaFacturacion;
