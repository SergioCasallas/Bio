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
  } = useContext(PkClientesContext);

  return (
    <>
      <div className="contenedor-app">
        <SideBar />

        <div className="seccion-principal">
          <main>
            <section className="body.home">
              <div>
                <div className="info.cliente">
                  <h3>Cliente</h3>
                  <p>
                    Nombre:
                    <b>{nombreCliente}</b>
                  </p>
                  <p>
                    Ciudad:
                    <b>{ciudadCliente}</b>
                  </p>
                </div>

                <div className="info.cliente">
                  <h3>Dirección</h3>
                  <p>
                    Dirrección cliente:<b>{direccionCliente}</b>
                  </p>
                </div>

                <div className="info.cliente">
                  <h3>Correo</h3>
                  <p>
                    Correo cliente:
                    <b>{correoPersonalCliente}</b>
                  </p>
                  <p>
                    Correo de pagos:
                    <b>{correoPagosCliente}</b>
                  </p>
                </div>

                <div className="info.cliente">
                  <h3>Sedes</h3>
                  {UUIDSedes
                    ? UUIDSedes.map((item) => (
                        <p key={item.UUID} value={item.UUID}>
                          {item.Nombre_Sede}: <b>{item.Frecuencia}</b>
                        </p>
                      ))
                    : null}
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
