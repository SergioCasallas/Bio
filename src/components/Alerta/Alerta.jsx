import React, { useContext } from "react";

// Import Context Alerta
import AlertaContext from "../../context/Alerta/AlertaContext";

const Alerta = () => {
  const { mensaje } = useContext(AlertaContext);
  return (
    <>
      {mensaje ? (
        <div className="alerta">
          <p className="alerta__mensaje">{mensaje}</p>
        </div>
      ) : null}
    </>
  );
};

export default Alerta;
