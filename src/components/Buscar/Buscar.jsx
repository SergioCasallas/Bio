// import { useState } from "react";
// import { useLocation } from "react-router-dom";

// const Buscar = () => {
//   const [busqueda, setBusqueda] = useState({
//     fechasInicial: "",
//     fechaFinal: "",
//     factura: "",
//   });
//   const usePathName = useLocation();

//   const guardarDatos = (e) => {
//     setBusqueda({
//       ...busqueda,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const buscar = (e) => {
//     e.preventDefault();
//   };

//   return (
//     <form className="form-date" onSubmit={buscar}>
//       <div className="contenedor">
//         <div>
//           <label>Fecha Inicial</label>
//           <input
//             type="date"
//             name="fechasInicial"
//             id="finicialbuscar"
//             placeholder="Buscar por Fecha"
//             onChange={guardarDatos}
//           />
//         </div>
//         <div>
//           <label>Fecha Final</label>
//           <input
//             type="date"
//             name="fechaFinal"
//             id="ffinalbuscar"
//             placeholder="Buscar por Fecha"
//             onChange={guardarDatos}
//           />
//         </div>
//         <div>
//           <label>No. Factura</label>
//           <input
//             name="factura"
//             id="facturabuscar"
//             placeholder="Buscar Factura"
//             onChange={guardarDatos}
//           />
//         </div>
//       </div>
//       <input
//         type="submit"
//         className="btn btn-primario btn-block"
//         value="Buscar"
//       />
//     </form>
//   );
// };

// export default Buscar;
