import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Expediente = () => {
  const navigate = useNavigate();

  const [entries] = useState([
    {
      id: 1,
      date: "2025-11-08",
      Nombre: "Luis Antonio",
      ApellidoPaterno: "Cordova",
      ApellidoMaterno: "Leos",
      edad: 25,
      sexo: "Hombre",
      domicilio: "Pedro del Campillo #201",
      telefono: "4778505434",
      sesiones: [
        {
          idSesion: 1,
          fecha: "2025-11-01",
          observaciones: "Inicio de tratamiento, se nota ansiedad leve.",
        },
        {
          idSesion: 2,
          fecha: "2025-11-05",
          observaciones: "Mejoró notablemente su ánimo.",
        },
        {
          idSesion: 3,
          fecha: "2025-11-09",
          observaciones: "Tuvo recaida emocional",
        },
      ],
    },
    {
      id: 2,
      date: "2025-11-09",
      Nombre: "Jose Luis",
      ApellidoPaterno: "Peréz",
      ApellidoMaterno: "Mena",
      edad: 22,
      sexo: "Hombre",
      domicilio: "Barranquilla #309",
      telefono: "4775412415",
      sesiones: [
        {
          idSesion: 1,
          fecha: "2025-11-03",
          observaciones: "Dificultad para dormir, nerviosismo.",
        },
      ],
    },
  ]);

  const handleClick = (entry) => {
    navigate(`/index/session/${entry.id}`, {
      state: { paciente: entry },
    });
  };

  return (
    <div className="flex w-full min-h-screen bg-base-200">
      <Outlet />
      <main className="flex-1 p-6 flex flex-col gap-7">
        <h1 className="text-3xl font-bold text-black">Expedientes</h1>
        <input
          className="input input-bordered w-full"
          type="text"
          placeholder="Buscar expediente"
        />
        <div className="grid grid-cols-1 gap-5">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="card bg-base-100 shadow-md hover:shadow-lg transition border border-base-300 cursor-pointer"
              onClick={() => handleClick(entry)}
            >
              <div className="card-body">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="card-title text-lg font-semibold text-primary">
                    {entry.Nombre} {entry.ApellidoPaterno}{" "}
                    {entry.ApellidoMaterno}
                  </h2>
                  <span className="text-sm opacity-70">
                    Ultima sesión: {entry.date}
                  </span>
                </div>
                <p className="text-sm opacity-80">{entry.sesiones.idSesion}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Expediente;
