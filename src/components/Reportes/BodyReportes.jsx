import React, { useState, useContext, useRef } from "react";
import SideBar from "../layout/SideBar/SideBar";
import TableReportesManifiestos from "../TablaReportesManifiestos/TablaReportesManifiestos";
import { getRecolecciones } from "../../services/apiRecolecciones/apiRecolecciones";


import TablaReportesPagos from "../TableReportesPagos/TablaReportesPagos";
import { getReportesPagosDatos } from "../../services/apiReportesPagosDatos/apiReportesPagosDatos.js";

import TablaReportesSaldos from "../TablaReportesSaldos/TablaReportesSaldos";
import { getReportesSaldosDatos } from "../../services/apiReportesSaldos/apiReportesSaldos";

import pkClienteContext from "../../context/Login/PkClientesContext";

const BodyReportes = () => {
  const { pkClienteInicial, UUIDSedes } = useContext(pkClienteContext);

  const formRef = useRef(null);

  const [datos, setDatos] = useState({
    fechaInicial: null,
    fechaFinal: null,
    numeroReporte: null,
    residue: null,
    tipoReporte: null,
    UUIDSede: UUIDSedes,
    pkClienteInicial,
  });

  const [datosReportes, setDatosReportes] = useState(null);

  const guardarDatos = (e) => {
    if (
      e.target.name === "tipoReporte" &&
      e.target.value !== datos.tipoReporte &&
      datosReportes !== null
    ) {
      setDatosReportes(null);
    }
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const buscar = async (e) => {
    e.preventDefault();
    if (datos.tipoReporte === "Pagos") {
      const dataReportesPagos = await getReportesPagosDatos(datos);
      setDatosReportes(await dataReportesPagos);
      formRef.current.reset();
    } else if (datos.tipoReporte === "Saldos") {
      const dataReportesSaldos = await getReportesSaldosDatos(datos);
      setDatosReportes(await dataReportesSaldos);
      formRef.current.reset();
    } else if (datos.tipoReporte === "Manifiestos") {
      const recoleccionesDatos = await getRecolecciones(datos);
      setDatosReportes(await recoleccionesDatos);
      formRef.current.reset();
    }
  };
  return (
    <>
      <div className="contenedor-app">
        <SideBar />

        <div className="seccion-principal">
          <form ref={formRef} onSubmit={buscar}>
            <div className="contenedor">
              <div>
                <label>Fecha Inicial</label>
                <br />
                <input
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
                  type="date"
                  name="fechaFinal"
                  id="ffinalbuscar"
                  onChange={guardarDatos}
                />
              </div>

              {datos.tipoReporte === "Pagos" ? (
                <div>
                  <label>No Reporte de Pagos</label>
                  <br />
                  <input
                    name="numeroReporte"
                    type="text"
                    onChange={guardarDatos}
                  />
                </div>
              ) : null}

              {datos.tipoReporte === "Saldos" ? (
                <div>
                  <label>No Reporte de Saldos</label>
                  <br />
                  <input
                    name="numeroReporte"
                    type="text"
                    onChange={guardarDatos}
                  />
                </div>
              ) : null}

              {datos.tipoReporte === "Manifiestos" ? (
                <div>
                  <label>No Reporte de Manifiestos</label>
                  <br />
                  <input
                    name="numeroReporte"
                    type="text"
                    onChange={guardarDatos}
                  />
                </div>
              ) : null}

              <div>
                <label htmlFor="">Reportes</label>
                <br />
                <select
                  required
                  name="tipoReporte"
                  id=""
                  onChange={guardarDatos}
                >
                  <option value="">Seleccionar</option>
                  <option value="Pagos">Pagos</option>
                  <option value="Saldos">Saldos</option>
                  <option value="Manifiestos">Manifiestos</option>
                </select>
              </div>
            </div>

            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Buscar"
            />
          </form>

          {datosReportes && datos.tipoReporte === "Pagos" ? (
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

          {datosReportes && datos.tipoReporte === "Saldos" ? (
            <TablaReportesSaldos
              datos={datosReportes}
              fechas={[
                {
                  fechaFinal: datos.fechaFinal,
                  fechaInicial: datos.fechaInicial,
                },
              ]}
            />
          ) : null}

          {datosReportes && datos.tipoReporte === "Manifiestos" ? (
            <TableReportesManifiestos datos={datosReportes} />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default BodyReportes;
