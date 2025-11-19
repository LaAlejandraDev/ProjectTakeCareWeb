import React, { useEffect, useState } from "react";
import { PacientesAPI } from "../api/pacientes.api";
import { useNavigate } from "react-router-dom";
import { UserAPI } from "../api/user.api";

export default function PacientesDiario() {
  const [pacientes, setPacientes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadPacientes();
  }, []);

  const loadPacientes = async () => {
    try {
      const resp = await UserAPI.getUserInformation();
      setPacientes(resp.data);
    } catch (err) {
      console.log("Error cargando pacientes:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-primary mb-4">
        Diario emocional de pacientes
      </h1>

      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Fecha registro</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {pacientes.map((p) => (
            <tr key={p.id}>
              <td>
                {p.usuario?.nombre} {p.usuario?.apellidoPaterno}
              </td>
              <td>{p.usuario?.correo}</td>
              <td>{p.usuario?.fechaRegistro?.split("T")[0]}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => navigate(`/diario/paciente/${p.id}`)}
                >
                  Ver diario
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
