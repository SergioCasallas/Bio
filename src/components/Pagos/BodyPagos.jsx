import React, { useContext, useState, useRef } from "react";
import SideBar from "../layout/SideBar/SideBar";
import pkClienteContext from "../../context/Login/PkClientesContext";

import TablaReportesPagos from "../TableReportesPagos/TablaReportesPagos";
import { getReportesPagosDatos } from "../../services/apiReportesPagosDatos/apiReportesPagosDatos";
import AlertaContext from "../../context/Alerta/AlertaContext";

const BodyPagos = () => {
  const { pkClienteInicial, UUIDSedes } = useContext(pkClienteContext);
  const { MostrarAlerta } = useContext(AlertaContext);
  const formRef = useRef();
  const [datos, setDatos] = useState({
    fechaInicial: null,
    fechaFinal: null,
    numeroReporte: null,
    residue: null,
    // tipoReporte: null,
    UUIDSede: UUIDSedes,
    pkClienteInicial,
  });

  const [datosReportes, setDatosReportes] = useState(null);

  const guardarDatos = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const buscar = async (e) => {
    e.preventDefault();

    const dataReportesPagos = await getReportesPagosDatos(datos);

    if (await dataReportesPagos.mensaje) {
      MostrarAlerta(dataReportesPagos.mensaje);
    } else {
      setDatosReportes(await dataReportesPagos);
    }
  };

  return (
    <>
      <div className="contenedor-app">
        <SideBar />
        <div className="seccion-principal">
          <form className="form-date" ref={formRef} onSubmit={buscar}>
            <div className="contenedor">
              <div>
                <label>Fecha Inicial</label>
                <br />
                <input
                  //   required
                  type="date"
                  name="fechaInicial"
                  id="finicialbuscar"
                  onChange={guardarDatos}
                />
              </div>
              <div>
                <label>Fecha Final</label>
                <br />
                <input
                  //   required
                  type="date"
                  name="fechaFinal"
                  id="ffinalbuscar"
                  onChange={guardarDatos}
                />
              </div>

              <div>
                <label>No de Factura</label>
                <br />
                <input
                  name="numeroReporte"
                  type="text"
                  onChange={guardarDatos}
                />
              </div>
            </div>

            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Buscar"
            />
          </form>

          {datosReportes ? (
            <TablaReportesPagos
              datos={datosReportes}
              fechas={[
                {
                  fechaFinal: datos.fechaFinal,
                  fechaInicial: datos.fechaInicial,
                },
              ]}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default BodyPagos;
