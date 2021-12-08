import React, { useState, useContext } from "react";
import SideBar from "../layout/SideBar/SideBar";
import pkClienteContext from "../../context/Login/PkClientesContext";
import { getRecolecciones } from "../../services/apiRecolecciones/apiRecolecciones";
import TablaRecolecciones from "../TablaRecolecciones/TablaRecolecciones";
import AlertaContext from "../../context/Alerta/AlertaContext";

const BodyRecolecciones = () => {
  const { MostrarAlerta } = useContext(AlertaContext);
  const { pkClienteInicial, UUIDSedes } = useContext(pkClienteContext);

  const [datosRecoleccion, setDatosRecoleccion] = useState(null);

  const [datosBusqueda, setDatosBusqueda] = useState({
    fechaInicial: null,
    fechaFinal: null,
    residue: null,
    UUIDSede: UUIDSedes,
    pkClienteInicial,
  });

  const guardarDatos = (e) => {
    e.preventDefault();


    if (e.target.name === "UUIDSede" && e.target.value === "") {
      setDatosBusqueda({
        ...datosBusqueda,
        [e.target.name]: UUIDSedes,
      });
    }else if (e.target.value === "") {
      setDatosBusqueda({
        ...datosBusqueda,
        [e.target.name]: null,
      });
    } else {
      setDatosBusqueda({
        ...datosBusqueda,
        [e.target.name]: e.target.value,
      });
    }
  };

  const buscar = async (e) => {
    e.preventDefault();
    if (
      datosBusqueda.residue ||
      (datosBusqueda.fechaInicial && datosBusqueda.fechaFinal) ||
      datosBusqueda.UUIDSede
    ) {
      const recoleccionesDatos = await getRecolecciones(datosBusqueda);
      if (
        (await recoleccionesDatos.mensaje) ||
        (await recoleccionesDatos.data.mensaje)
      ) {
        MostrarAlerta(
          (await recoleccionesDatos.mensaje) ||
            (await recoleccionesDatos.data.mensaje)
        );
      } else {
        setDatosRecoleccion(await recoleccionesDatos);
      }
    } else {
      console.log(`Completa los datos`);
    }
  };

  return (
    <>
      <div className="contenedor-app">
        <SideBar />

        <div className="seccion-principal">
          <form onSubmit={buscar}>
            <div className="contenedor">
              <div>
                <label>Fecha Inicial</label>
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
                <input
                  type="date"
                  name="fechaFinal"
                  id="ffinalbuscar"
                  placeholder="Buscar por Fecha"
                  onChange={guardarDatos}
                />
              </div>

              <div>
                <label htmlFor="residue">Tipo de Residuo</label>
                <select name="residue" id="residue" onChange={guardarDatos}>
                  <option value="">Todos los Residuos</option>
                  <option value="Biosanitarios">Biosanitarios</option>
                  <option value="Cortopunzantes">Cortopunzantes</option>
                  <option value="Anatomopatologicos">Anatomopatologicos</option>
                  <option value="Animales">Animales</option>
                  <option value="Medicamentos o Fármacos">
                    Medicamentos o Fármacos
                  </option>
                  <option value="Reactivos">Reactivos</option>
                  <option value="Metales Pesados (Luminarías,Baterías,Amalgamas)">
                    Metales Pesados (Luminarías,Baterías,Amalgamas)
                  </option>
                  <option value="LIQUIDOS REVELADORES O FIJADORES">
                    LIQUIDOS REVELADORES O FIJADORES
                  </option>
                  <option value="Aceites usados, Lodos Aceitodos,borras, pinturas,estopa,Mezcla de hidrocarburos y/o aceites">
                    Aceites usados, Lodos Aceitodos,borras,
                    pinturas,estopa,Mezcla de hidrocarburos y/o aceites
                  </option>
                  <option value="Equipos médicos, televisores, computadores, impresoras, otros">
                    Equipos médicos, televisores, computadores, impresoras,
                    otros
                  </option>
                  <option value="Ordinarios, reciclables">
                    Ordinarios, reciclables
                  </option>
                  <option value="METALES PESADOS (PLOMO)">
                    METALES PESADOS (PLOMO)
                  </option>
                  <option value="Mezclas y emulsiones de desechos de aceite y agua o derhidrocarburos y agua">
                    Mezclas y emulsiones de desechos de aceite y agua o
                    derhidrocarburos y agua
                  </option>
                  <option value="COLCHON O COLCHONETA">
                    COLCHON O COLCHONETA
                  </option>
                  <option value="LODOS, BORAS O ESTOPAS">
                    LODOS, BORAS O ESTOPAS
                  </option>
                  <option value="FARMACOS">FARMACOS</option>
                  <option value="LAMPARAS O LUMINARIAS">
                    LAMPARAS O LUMINARIAS
                  </option>
                  <option value="RES. HOSP PELIGROSO Q">
                    RES. HOSP PELIGROSO Q
                  </option>
                  <option value="RES.  PELIGROSO I">RES. PELIGROSO I</option>
                  <option value="RES. HOSP PELIGROSO I">
                    RES. HOSP PELIGROSO I
                  </option>
                  <option value="RES. HOSP PELIGROSO L">
                    RES. HOSP PELIGROSO L
                  </option>
                  <option value="RES. HOSP PELIGROSO R">
                    RES. HOSP PELIGROSO R
                  </option>
                  <option value="CITOTOXICO">CITOTOXICO</option>
                  <option value="Biosanitarios VacCovid19">
                    Biosanitarios VacCovid19
                  </option>
                  <option value="Cortopunzantes VacCovid19">
                    Cortopunzantes VacCovid19
                  </option>
                  <option value="Medicamentos VacCovid19">
                    Medicamentos VacCovid19
                  </option>
                  <option value="Farmacos VacCovid19">
                    Farmacos VacCovid19
                  </option>
                  <option value="BIOSANITARIOS COVID19">
                    BIOSANITARIOS COVID19
                  </option>
                </select>
              </div>

              <div>
                <label htmlFor="UUIDSede">Elige la sede</label>
                <select name="UUIDSede" id="UUIDSede" onChange={guardarDatos}>
                  <option value="">Todas las sedes</option>
                  {UUIDSedes.map((item) => (
                    <option key={item.UUID} value={item.UUID}>
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
          {datosRecoleccion && <TablaRecolecciones datos={datosRecoleccion} />}
        </div>
      </div>
    </>
  );
};

export default BodyRecolecciones;
