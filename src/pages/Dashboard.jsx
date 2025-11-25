import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

export default function PsicologoDashboard() {
  const navigate = useNavigate();
  const storedId = localStorage.getItem("IdUsuario");
  const idPsicologo = storedId ? parseInt(storedId, 10) : null;

  const [pacientes, setPacientes] = useState([]);
  const [citas, setCitas] = useState([]);
  const [loadingPacientes, setLoadingPacientes] = useState(true);
  const [loadingCitas, setLoadingCitas] = useState(true);

  if (!idPsicologo) {
    console.warn("No hay IdUsuario en localStorage. Redirigiendo a /login");
    window.location.href = "/login";
    return null;
  }

  const fetchPacientes = async () => {
    setLoadingPacientes(true);
    if (!idPsicologo) return;

    try {
      const relationsResponse = await axiosClient.get(`/Pacientes`, {
        params: {
          idPsicologo: idPsicologo,
        },
      });

      const relaciones = relationsResponse.data || [];

      const pacientesConDetalles = await Promise.all(
        relaciones.map(async (relacion) => {
          const idUsuarioPaciente = relacion.idUsuario || relacion.IdUsuario;

          const userResponse = await axiosClient.get(
            `/Usuarios/${idUsuarioPaciente}`
          );
          const userData = userResponse.data;

          return {
            ...relacion,
            idPaciente: idUsuarioPaciente,
            nombrePaciente: userData.nombre || userData.Nombre || "Desconocido",
            apellidosPaciente:
              (userData.apellidoPaterno || userData.ApellidoPaterno || "") +
              " " +
              (userData.apellidoMaterno || userData.ApellidoMaterno || ""),
          };
        })
      );

      setPacientes(pacientesConDetalles);
    } catch (error) {
      console.error("Error cargando pacientes con detalles:", error);
      setPacientes([]);
    } finally {
      setLoadingPacientes(false);
    }
  };

  const fetchCitas = async () => {
    setLoadingCitas(true);
    if (!idPsicologo) return;

    try {
      const response = await axiosClient.get(`/Citas`, {
        params: {
          idPsicologo: idPsicologo,
        },
      });
      setCitas(response.data || []);
    } catch (error) {
      console.error("Error crítico cargando citas:", error);
      setCitas([]);
    } finally {
      setLoadingCitas(false);
    }
  };

  const getLastSessionStatus = (pacienteId) => {
    const citasPaciente = citas
      .filter((c) => c.idPaciente === pacienteId || c.IdPaciente === pacienteId)
      .sort(
        (a, b) =>
          new Date(b.fechaInicio || b.FechaInicio) -
          new Date(a.fechaInicio || a.FechaInicio)
      );

    if (citasPaciente.length === 0) return "Sin sesiones";

    return citasPaciente[0].estado || citasPaciente[0].Estado || "Desconocido";
  };

  const citasHoy = citas.filter((c) => {
    const fechaStr = c.fechaInicio || c.FechaInicio;
    if (!fechaStr) return false;

    const hoy = new Date().toISOString().split("T")[0];
    return fechaStr.startsWith(hoy);
  });

  useEffect(() => {
    if (idPsicologo) {
      fetchPacientes();
      fetchCitas();
    }
  }, [idPsicologo]);

  const goToSolicitudes = () => {
    navigate("solicitudes");
  };

  const totalLoading = loadingPacientes || loadingCitas;

  return (
    <div className="p-8 bg-base-200 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Panel del Psicólogo</h1>
        <div className="flex gap-4">
          <button className="btn btn-primary">Nueva cita</button>
          <NavLink to={"/index/schedule"} className={"btn btn-info"}>Definir Horario</NavLink>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded bg-blue-200">
          <p className="text-sm">Pacientes</p>
          <p className="text-2xl font-bold">
            {totalLoading ? "..." : pacientes.length}
          </p>
        </div>

        <div className="p-4 rounded bg-green-200">
          <p className="text-sm">Citas hoy</p>
          <p className="text-2xl font-bold">
            {totalLoading ? "..." : citasHoy.length}
          </p>
        </div>

        <div className="p-4 rounded bg-yellow-200">
          <p className="text-sm">Pendientes</p>
          <p className="text-2xl font-bold">
            {totalLoading
              ? "..."
              : citas.filter((c) => c.estado === "Pendiente").length}
          </p>
        </div>

        <div className="p-4 rounded bg-red-200">
          <p className="text-sm">Canceladas</p>
          <p className="text-2xl font-bold">
            {totalLoading
              ? "..."
              : citas.filter((c) => c.estado === "Cancelada").length}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-bold mb-2">Pacientes recientes</h2>

        {totalLoading ? (
          <p className="text-gray-500 py-4">
            Cargando datos de pacientes y citas...
          </p>
        ) : (
          <table className="table w-full">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Última sesión</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {pacientes.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No hay pacientes registrados
                  </td>
                </tr>
              ) : (
                pacientes.map((p) => {
                  const ultCita = citas
                    .filter(
                      (c) => (c.idPaciente || c.IdPaciente) === p.idPaciente
                    )
                    .sort(
                      (a, b) =>
                        new Date(b.fechaInicio || b.FechaInicio) -
                        new Date(a.fechaInicio || a.FechaInicio)
                    )[0];

                  return (
                    <tr key={p.idPaciente}>
                      <td>{p.nombrePaciente + " " + p.apellidosPaciente}</td>
                      <td>
                        {ultCita
                          ? new Date(
                              ultCita.fechaInicio || ultCita.FechaInicio
                            ).toLocaleDateString()
                          : "-"}
                      </td>

                      <td>{getLastSessionStatus(p.idPaciente)}</td>

                      <td>
                        <button
                          className="btn btn-sm btn-info"
                          onClick={() =>
                            navigate(`/expediente/${p.idPaciente}`)
                          }
                        >
                          Ver expediente
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-bold mb-2">Próximas citas</h2>
        {totalLoading ? (
          <p className="text-gray-500">Cargando citas...</p>
        ) : citasHoy.length === 0 ? (
          <p className="text-gray-500">No hay citas programadas para hoy.</p>
        ) : (
          <ul className="list-disc pl-5">
            {citasHoy.map((c, i) => (
              <li key={i}>
                {new Date(c.fechaInicio || c.FechaInicio).toLocaleTimeString(
                  "es-MX",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
                — Paciente {c.idPaciente || c.IdPaciente} —{" "}
                {c.estado || c.Estado}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
