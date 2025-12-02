import React, { useEffect, useState } from "react";
import { UserAPI } from "../../api/user.api";

const DashboardAdmin = () => { // Dashboard Administrativo
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await UserAPI.viewDashboard();
        setDashboardData(response.data);
      } catch (err) {
        setError(err.message || "Error al cargar el dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading)
    return (
      <div className="p-8 bg-base-200 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-lg">Cargando dashboard...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="p-8 bg-base-200 min-h-screen flex items-center justify-center">
        <div className="alert alert-error max-w-md">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error: {error}</span>
        </div>
      </div>
    );

  const {
    totalUsuarios,
    usuariosActivos,
    pacientes,
    psicologos,
    posts,
    comentarios,
    rolesDistribucion,
    comentariosPorPost,
  } = dashboardData;

  const rolMap = {
    0: "Paciente",
    1: "Administrador",
    2: "Psicólogo",
  };

  const getRoleColor = (rol) => {
    const colors = {
      0: "text-green-600 bg-green-100",
      1: "text-red-600 bg-red-100",
      2: "text-blue-600 bg-blue-100",
    };
    return colors[rol] || "text-gray-600 bg-gray-100";
  };

  return (
    <div className="p-8 bg-base-200 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary">
            Dashboard Administrativo
          </h1>
          <p className="text-gray-600 mt-2">Resumen general de la plataforma</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-figure text-primary">
              <i className="fa-solid fa-users text-3xl"></i>
            </div>
            <div className="stat-title">Total Usuarios</div>
            <div className="stat-value text-primary">{totalUsuarios}</div>
            <div className="stat-desc">{usuariosActivos} activos</div>
          </div>
        </div>

        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <i className="fa-solid fa-user-injured text-3xl"></i>
            </div>
            <div className="stat-title">Pacientes</div>
            <div className="stat-value text-secondary">{pacientes}</div>
            <div className="stat-desc">Usuarios registrados</div>
          </div>
        </div>

        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-figure text-accent">
              <i className="fa-solid fa-user-md text-3xl"></i>
            </div>
            <div className="stat-title">Psicólogos</div>
            <div className="stat-value text-accent">{psicologos}</div>
            <div className="stat-desc">Profesionales activos</div>
          </div>
        </div>

        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-figure text-info">
              <i className="fa-solid fa-file-lines text-3xl"></i>
            </div>
            <div className="stat-title">Posts</div>
            <div className="stat-value text-info">{posts}</div>
            <div className="stat-desc">Publicaciones creadas</div>
          </div>
        </div>

        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-figure text-success">
              <i className="fa-solid fa-comments text-3xl"></i>
            </div>
            <div className="stat-title">Comentarios</div>
            <div className="stat-value text-success">{comentarios}</div>
            <div className="stat-desc">Interacciones totales</div>
          </div>
        </div>

        <div className="stats shadow bg-base-100">
          <div className="stat">
            <div className="stat-figure text-warning">
              <i className="fa-solid fa-chart-pie text-3xl"></i>
            </div>
            <div className="stat-title">Actividad</div>
            <div className="stat-value text-warning">{usuariosActivos}</div>
            <div className="stat-desc">Usuarios en línea</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title text-primary">
              <i className="fa-solid fa-chart-pie mr-2"></i>
              Distribución de Roles
            </h2>
            <div className="overflow-x-auto mt-4">
              <table className="table">
                <thead>
                  <tr>
                    <th>Rol</th>
                    <th>Cantidad</th>
                    <th>Porcentaje</th>
                  </tr>
                </thead>
                <tbody>
                  {rolesDistribucion.map((r) => {
                    const porcentaje = (
                      (r.cantidad / totalUsuarios) *
                      100
                    ).toFixed(1);
                    return (
                      <tr key={r.rol}>
                        <td>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(
                              r.rol
                            )}`}
                          >
                            {rolMap[r.rol]}
                          </span>
                        </td>
                        <td className="font-semibold">{r.cantidad}</td>
                        <td>
                          <div className="flex items-center gap-3">
                            <progress
                              className="progress progress-primary w-20"
                              value={porcentaje}
                              max="100"
                            ></progress>
                            <span className="text-sm text-gray-600">
                              {porcentaje}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title text-primary">
              <i className="fa-solid fa-comment-dots mr-2"></i>
              Posts más Comentados
            </h2>
            <div className="overflow-x-auto mt-4">
              <table className="table">
                <thead>
                  <tr>
                    <th>Post</th>
                    <th>Comentarios</th>
                    <th>Interacción</th>
                  </tr>
                </thead>
                <tbody>
                  {comentariosPorPost.slice(0, 5).map((p, index) => (
                    <tr key={index}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center">
                            <div className="avatar placeholder">
                              <div className="bg-neutral text-neutral-content rounded-full w-10 flex items-center justify-center">
                                <span className="text-xs">#{index + 1}</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <div className="font-bold line-clamp-1">
                              {p.titulo}
                            </div>
                            <div className="text-sm opacity-50">
                              Post destacado
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="font-semibold text-center">{p.count}</td>
                      <td>
                        <div className="flex justify-center">
                          {p.count > 10 ? (
                            <span className="badge badge-success badge-sm">
                              Alta
                            </span>
                          ) : p.count > 5 ? (
                            <span className="badge badge-warning badge-sm">
                              Media
                            </span>
                          ) : (
                            <span className="badge badge-error badge-sm">
                              Baja
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {comentariosPorPost.length > 5 && (
              <div className="card-actions justify-end mt-4">
                <button className="btn btn-sm btn-outline btn-primary">
                  Ver todos los posts
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-md mt-8">
        <div className="card-body">
          <h2 className="card-title text-primary">
            <i className="fa-solid fa-gauge-high mr-2"></i>
            Resumen Rápido
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {totalUsuarios}
              </div>
              <div className="text-sm text-gray-600">Usuarios Totales</div>
            </div>
            <div className="text-center p-4 bg-secondary/10 rounded-lg">
              <div className="text-2xl font-bold text-secondary">
                {pacientes + psicologos}
              </div>
              <div className="text-sm text-gray-600">Usuarios Activos</div>
            </div>
            <div className="text-center p-4 bg-accent/10 rounded-lg">
              <div className="text-2xl font-bold text-accent">{posts}</div>
              <div className="text-sm text-gray-600">Contenido Creado</div>
            </div>
            <div className="text-center p-4 bg-info/10 rounded-lg">
              <div className="text-2xl font-bold text-info">{comentarios}</div>
              <div className="text-sm text-gray-600">Interacciones</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
