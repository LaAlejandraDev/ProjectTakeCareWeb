import React, { useEffect, useState, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axiosClient from "../api/axiosClient";

const Expediente = () => {
  const navigate = useNavigate();
  // Obtener el usuario logueado
  const { user, loading: authLoading } = useContext(AuthContext);

  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Hook para cargar todos los datos al iniciar
  useEffect(() => {
    if (!authLoading && user) {
      loadExpedientes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, authLoading]);

  const loadExpedientes = async () => {
    setLoading(true);
    const psychologistId = user.id || user.Id;

    if (!psychologistId) {
      setLoading(false);
      return;
    }

    try {
      // 1. Obtener TODOS los registros de Pacientes
      // GET /api/Pacientes
      const { data: relacionesPacientes } = await axiosClient.get("/Pacientes");

      // 1.1 Filtrar las relaciones que pertenecen al psicólogo actual
      const myPatientsRelations = relacionesPacientes.filter(
        (r) => (r.idPsicologo || r.IdPsicologo) === psychologistId
      );

      // 2. Obtener TODAS las Citas/Sesiones
      // Usaremos la API más específica para el psicólogo, si existe: GET /api/Citas/psicologo/{idPsicologo}
      // Si esa API solo da el ID de cita, usaremos la general: GET /api/Citas
      // Usaremos la general y filtramos después para mayor compatibilidad:
      const { data: citas } = await axiosClient.get("/Citas");

      // 3. Mapear y obtener los detalles del usuario y sus sesiones
      const finalExpedientes = await Promise.all(
        myPatientsRelations.map(async (relacion) => {
          const userId = relacion.idUsuario || relacion.IdUsuario;

          // 3.1 Obtener datos personales del Usuario/Paciente
          // GET /api/Usuarios/{id}
          const { data: userData } = await axiosClient.get(
            `/Usuarios/${userId}`
          );

          // 3.2 Filtrar Sesiones (Citas) para este paciente
          const patientSessions = citas
            .filter((c) => (c.idUsuario || c.IdUsuario) === userId)
            // Aquí puedes agregar lógica para mapear Observaciones
            .map((c) => ({
              idSesion: c.id || c.Id,
              fecha: c.fecha || c.Fecha,
              // Asumimos que la tabla Citas tiene un campo 'observaciones' o 'motivo'
              observaciones:
                c.observaciones || c.motivo || "Sin observaciones registradas",
            }))
            .sort((a, b) => new Date(b.fecha) - new Date(a.fecha)); // Las más nuevas primero

          const lastSessionDate =
            patientSessions.length > 0 ? patientSessions[0].fecha : "N/A";

          // 3.3 Combinar toda la información en el formato del expediente
          return {
            id: userId,
            date: lastSessionDate,
            Nombre: userData.nombre || userData.Nombre || "Nombre Desconocido",
            ApellidoPaterno:
              userData.apellidoPaterno || userData.ApellidoPaterno || "",
            ApellidoMaterno:
              userData.apellidoMaterno || userData.ApellidoMaterno || "",
            edad: userData.edad || userData.Edad || "N/A",
            sexo: userData.sexo || userData.Sexo || "N/A",
            domicilio: userData.domicilio || userData.Domicilio || "N/A",
            telefono: userData.telefono || userData.Telefono || "N/A",
            sesiones: patientSessions,
            // Guardamos la relación por si se necesita
            relacionId: relacion.id || relacion.Id,
          };
        })
      );

      setPacientes(finalExpedientes);
    } catch (error) {
      console.error("Error al cargar expedientes:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filtrado por barra de búsqueda
  const filteredPatients = pacientes.filter((entry) => {
    const fullName =
      `${entry.Nombre} ${entry.ApellidoPaterno} ${entry.ApellidoMaterno}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  const handleClick = (entry) => {
    navigate(`/index/session/${entry.id}`, {
      state: { paciente: entry },
    });
  };

  if (loading || authLoading)
    return <div className="p-10 text-center">Cargando expedientes...</div>;
  if (!user)
    return (
      <div className="p-10 text-center text-red-500">
        Error: Usuario no autenticado.
      </div>
    );

  return (
    <div className="flex w-full min-h-screen bg-base-200">
      <Outlet />
      <main className="flex-1 p-6 flex flex-col gap-7">
        <h1 className="text-3xl font-bold text-black">
          Expedientes de Pacientes
        </h1>
        <input
          className="input input-bordered w-full"
          type="text"
          placeholder="Buscar expediente por nombre o apellido"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-5">
          {filteredPatients.length === 0 ? (
            <div className="text-center p-10 bg-white shadow rounded-lg">
              {pacientes.length === 0
                ? "Aún no tienes pacientes asignados"
                : "No se encontraron resultados para la búsqueda."}
            </div>
          ) : (
            filteredPatients.map((entry) => (
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
                      Última sesión:{" "}
                      {new Date(entry.date).toLocaleDateString() ===
                      "Invalid Date"
                        ? "N/A"
                        : new Date(entry.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm opacity-80">
                    Sesiones registradas: {entry.sesiones.length}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Expediente;
