import React, { useState, useContext, useRef } from "react";
import pkClienteContext from "../../context/Login/PkClientesContext";
import SideBar from "../layout/SideBar/SideBar";
import { getReportesSaldosDatos } from "../../services/apiReportesSaldos/apiReportesSaldos.js";
import TablaReportesSaldos from "../TablaReportesSaldos/TablaReportesSaldos";
import AlertaContext from "../../context/Alerta/AlertaContext";

const BodySaldos = () => {
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

    // ! Verificaciones de datos

    const dataReportesSaldos = await getReportesSaldosDatos(datos);

    if (await dataReportesSaldos.mensaje) {
      MostrarAlerta(dataReportesSaldos.mensaje);
    } else {
      setDatosReportes(await dataReportesSaldos);
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
                <label>No Reporte de Pagos</label>
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
        </div>
      </div>
    </>
  );
};

export default BodySaldos;
