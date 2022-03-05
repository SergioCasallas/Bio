import React, { useContext } from "react";
import SideBar from "../layout/SideBar/SideBar";

import PkClientesContext from "../../context/Login/PkClientesContext";

const BodyHome = () => {
  const {
    nombreCliente,
    ciudadCliente,
    direccionCliente,
    correoPersonalCliente,
    correoPagosCliente,
    UUIDSedes,
    nit,
  } = useContext(PkClientesContext);



  return (
    <>
      <div className="contenedor-app">
        <SideBar />

        <div className="seccion-principal">
          <main>
            <section className="body_home">
              <div>
                <div className="info_cliente">
                  <h3>Cliente</h3>
                  <p>
                    <b>Nombre: </b>
                    <br />
                    {nombreCliente}
                  </p>
                  <p>
                    <b>Ciudad:</b>
                    <br />
                    {ciudadCliente}
                  </p>

                  <p>
                    <b>Nit:</b>
                    <br />
                    {nit}
                  </p>
                </div>

                <div className="info_cliente">
                  {/* <h3>Dirección</h3> */}
                  <p>
                    <b>Dirrección cliente: </b>
                    <br />
                    {direccionCliente}
                  </p>
                </div>

                <div className="info_cliente">
                  {/* <h3>Correo</h3> */}
                  <p>
                    <b>Correo cliente: </b>
                    <br />
                    {correoPersonalCliente}
                  </p>
                  <p>
                    <b>Correo de pagos: </b>
                    <br />
                    {correoPagosCliente}
                  </p>
                </div>

                <div className="info_cliente">
                  <h3>Sedes</h3>
                  <table className="table-info" border="1">
                    <thead>
                      <tr className="table-info__tr">
                        <th className="table-info__th">Sede</th>
                        <th className="table-info__th">
                          Frecuencia de recolección
                        </th>
                        <th className="table-info__th">L</th>
                        <th className="table-info__th">M</th>
                        <th className="table-info__th">X</th>
                        <th className="table-info__th">J</th>
                        <th className="table-info__th">V</th>
                        <th className="table-info__th">S</th>
                        <th className="table-info__th">D</th>
                      </tr>
                    </thead>
                    <tbody>
                      {UUIDSedes
                        ? UUIDSedes.map((item, index) => (
                            <tr className="table-info__tr" key={index}>
                              <td className="table-info__td">
                                {item.Nombre_Sede}
                              </td>
                              <td className="table-info__td">
                                {item.Frecuencia}
                              </td>
                              <td className="table-info__td">{item.Lunes}</td>
                              <td className="table-info__td">{item.Martes}</td>
                              <td className="table-info__td">{item.Miercoles}</td>
                              <td className="table-info__td">{item.Jueves}</td>
                              <td className="table-info__td">{item.Viernes}</td>
                              <td className="table-info__td">{item.Sabado}</td>
                              <td className="table-info__td">{item.Domingo}</td>
                            </tr>
                          ))
                        : null}
                    </tbody>
                  </table>

                  {/* {UUIDSedes
                    ? UUIDSedes.map((item) => (
                        <p key={item.UUID} value={item.UUID}>
                          <b> {item.Nombre_Sede}: </b>
                          {item.Frecuencia}
                        </p>
                      ))
                    : null} */}
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
};

export default BodyHome;
