import React, { useRef, useState, useContext } from "react";
import SideBar from "../layout/SideBar/SideBar";
import pkClienteContext from "../../context/Login/PkClientesContext";
import { getRecolecciones } from "../../services/apiRecolecciones/apiRecolecciones.js";
import TableReportesManifiestos from "../TablaReportesManifiestos/TablaReportesManifiestos";

const BodyManifiestos = () => {
  const { pkClienteInicial, UUIDSedes } = useContext(pkClienteContext);
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
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const buscar = async (e) => {
    e.preventDefault();
    const recoleccionesDatos = await getRecolecciones(datos);
    setDatosReportes(await recoleccionesDatos);
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
                <label>No Reporte de Manifiestos</label>
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
            <TableReportesManifiestos datos={datosReportes} />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default BodyManifiestos;