import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Sesiones = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const paciente = location.state?.paciente;

  const [selectedSesion, setSelectedSesion] = useState(null);

  if (!paciente) {
    return (
      <div className="p-10">
        <p>No se ha seleccionado ningún paciente.</p>
        <button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>
          Regresar
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <h1 className="text-2xl font-bold text-primary mb-4">
        Sesiones de {paciente.Nombre} {paciente.ApellidoPaterno}{" "}
        {paciente.ApellidoMaterno}
      </h1>

      <input
        className="input input-bordered w-full"
        type="text"
        placeholder="Buscar sesión"
      />

      <div className="grid grid-cols-1 gap-4 mt-4">
        {paciente.sesiones
          .slice()
          .reverse()
          .map((sesion) => (
            <div
              key={sesion.idSesion}
              className="card bg-white border border-base-300 shadow-md hover:shadow-lg transition cursor-pointer"
              onClick={() => setSelectedSesion(sesion)}
            >
              <div className="card-body">
                <h2 className="text-lg font-semibold text-secondary">
                  Sesión {sesion.idSesion}
                </h2>
                <p className="text-sm opacity-80">Fecha: {sesion.fecha}</p>
              </div>
            </div>
          ))}
      </div>

      <button className="btn btn-primary mt-6" onClick={() => navigate(-1)}>
        ← Volver a Expedientes
      </button>
      {selectedSesion && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-primary">
              Sesión {selectedSesion.idSesion}
            </h3>
            <p className="py-3">
              <strong>Fecha:</strong> {selectedSesion.fecha}
            </p>
            <p className="py-2">
              <strong>Observaciones:</strong> {selectedSesion.observaciones}
            </p>

            <div className="modal-action">
              <button
                className="btn btn-error"
                onClick={() => setSelectedSesion(null)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Sesiones;
