import React, { useContext, useState } from "react";
import SideBar from "../layout/SideBar/SideBar";
import LoginContext from "../../context/Login/PkClientesContext";
import { getRecolecciones } from "../../services/apiRecolecciones/apiRecolecciones.js";
import TablaCertificados from "../TablaCertificados/TablaCertificados";

const BodyCertificados = () => {
  const { UUIDSedes, pkClienteInicial } = useContext(LoginContext);
  const [datos, setDatos] = useState({
    fechaInicial: null,
    fechaFinal: null,
    UUIDSede: null,
    pkClienteInicial,
  });

  const [datosRecolecciones, setDatosRecolecciones] = useState(null);
  const guardarDatos = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const sendDatos = async (e) => {
    e.preventDefault();
    const datosObtenidos = await getRecolecciones(datos);
    setDatosRecolecciones(await datosObtenidos.data);
  };

  return (
    <div className="contenedor-app">
      <SideBar />
      <div className="seccion-principal">
        <form className="form-date" onSubmit={sendDatos}>
          <div className="contenedor">
            <div>
              <label>Fecha Inicial</label>
              <br />
              <input
                required
                onChange={guardarDatos}
                type="date"
                name="fechaInicial"
              />
            </div>
            <div>
              <label>Fecha Final</label>
              <br />

              <input
                required
                onChange={guardarDatos}
                type="date"
                name="fechaFinal"
              />
            </div>
            <div>
              <label>Sedes</label>
              <br />
              <select
                required
                name="UUIDSede"
                id="UUIDSede"
                onChange={guardarDatos}
              >
                <option value="">Todas las sedes</option>

                {UUIDSedes.map((item) => (
                  <option value={item.UUID} key={item.UUID}>
                    {item.Nombre_Sede}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <input
            type="submit"
            className="btn btn-primario btn-block"
            value="Buscar"
          />
        </form>
        {datosRecolecciones ? (
          <TablaCertificados datos={datosRecolecciones} datosBusqueda={datos} />
        ) : (
          <h1>Sin Datos</h1>
        )}
      </div>
    </div>
  );
};

export default BodyCertificados;
