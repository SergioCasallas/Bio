import React, { useState, useContext } from "react";
import SideBar from ".././layout/SideBar/SideBar";
import { getFacturas } from "../../services/apiFacturas/apiFacturas.js";
import pkClienteContext from "../../context/Login/PkClientesContext";
import TablaFacturacion from "../TablaFacturacion/TablaFacturacion";
import AlertaContext from "../../context/Alerta/AlertaContext";

const BodyFacturacion = () => {
  const { MostrarAlerta } = useContext(AlertaContext);

  const { pkClienteInicial } = useContext(pkClienteContext);
  const [datosBusqueda, setDatosBusqueda] = useState({
    fechaInicial: null,
    fechaFinal: null,
    factura: null,
    pkClienteInicial,
  });
  const [datosFactura, setDatosFactura] = useState(null);

  const guardarDatos = (e) => {
    setDatosBusqueda({
      ...datosBusqueda,
      [e.target.name]: e.target.value,
    });
  };

  const buscar = async (e) => {
    e.preventDefault();

    if (
      datosBusqueda.pkClienteInicial &&
      (datosBusqueda.factura ||
        (datosBusqueda.fechaFinal && datosBusqueda.fechaInicial))
    ) {
      const datosFacturaObtenidos = await getFacturas(datosBusqueda);
      if (await datosFacturaObtenidos.data.mensaje) {
        MostrarAlerta(await datosFacturaObtenidos.data.mensaje);
      } else {
        setDatosFactura(await datosFacturaObtenidos);
      }
    } else {
      MostrarAlerta(`completa los datos`);
    }
  };

  return (
    <>
      <div className="contenedor-app">
        <SideBar />

        <div className="seccion-principal">
          <form className="form-date" onSubmit={buscar}>
            <div className="contenedor">
              <div>
                <label>Fecha Inicial</label>
                <br />
                <input
                  type="date"
                  name="fechaInicial"
                  id="finicialbuscar"
                  placeholder="Buscar por Fecha"
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
                  placeholder="Buscar por Fecha"
                  onChange={guardarDatos}
                />
              </div>
              <div>
                <label>No. Factura</label>
                <br />
                <input
                  name="factura"
                  id="facturabuscar"
                  placeholder="Buscar Factura"
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
          {datosFactura && <TablaFacturacion datos={datosFactura} />}
        </div>
      </div>
    </>
  );
};

export default BodyFacturacion;
