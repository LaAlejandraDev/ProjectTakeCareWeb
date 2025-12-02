import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PsicologoAPI } from "../../api/psicologo.api";

export default function Suscriptions() { // Gestión de Suscripciones de Psicólogos
  const [pendientes, setPendientes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPendientes = async () => {
    setLoading(true);
    try {
      const { data } = await PsicologoAPI.getPendientes();
      setPendientes(data.filter((p) => p.usuario));
    } catch (error) {
      toast.error("Error al obtener psicólogos pendientes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendientes();
  }, []);

  const handleAprobar = async (id) => {
    try {
      await PsicologoAPI.aprobarPsicologo(id);
      toast.success("Psicólogo aprobado");
      fetchPendientes();
    } catch {
      toast.error("Error al aprobar psicólogo");
    }
  };

  const handleRechazar = async (id) => {
    try {
      await PsicologoAPI.rechazarPsicologo(id);
      toast.success("Psicólogo rechazado");
      fetchPendientes();
    } catch {
      toast.error("Error al rechazar psicólogo");
    }
  };

  const handleCambiarPlan = async (id, plan) => {
    try {
      await PsicologoAPI.cambiarPlan(id, plan);
      toast.success("Plan actualizado");
      fetchPendientes();
    } catch {
      toast.error("Error al actualizar plan");
    }
  };

  if (loading) return <p>Cargando psicólogos pendientes...</p>;

  return (
    <div className="p-6 bg-base-100 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-primary">
            Psicólogos Pendientes
          </h2>
          <p className="text-base-content/70 mt-1">
            Revisa y gestiona las solicitudes de registro
          </p>
        </div>
        <div className="px-3 py-1 rounded-full text-sm font-medium bg-primary text-primary-content">
          {pendientes.length} pendientes
        </div>
      </div>

      {pendientes.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-base-content/30 mb-4">
            <svg
              className="mx-auto h-16 w-16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-base-content mb-2">
            No hay solicitudes pendientes
          </h3>
          <p className="text-base-content/70">
            Todas las solicitudes han sido revisadas
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {pendientes.map((p) => {
            const usuario = p.usuario;
            const planText = p.plan === 2 ? "Premium" : "Gratis";
            const estatusText =
              p.estatus === 1
                ? "Pendiente"
                : p.estatus === 2
                ? "Aprobado"
                : "Rechazado";

            const getPlanBadge = (plan) => {
              return plan === 2 ? (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                  Premium
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                  Gratis
                </span>
              );
            };

            const getStatusBadge = (estatus) => {
              const statusConfig = {
                1: {
                  class: "bg-yellow-100 text-yellow-800 border-yellow-200",
                  text: "Pendiente",
                },
                2: {
                  class: "bg-green-100 text-green-800 border-green-200",
                  text: "Aprobado",
                },
                3: {
                  class: "bg-red-100 text-red-800 border-red-200",
                  text: "Rechazado",
                },
              };
              const config = statusConfig[estatus] || {
                class: "bg-gray-100 text-gray-800 border-gray-200",
                text: "Desconocido",
              };
              return (
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${config.class}`}
                >
                  {config.text}
                </span>
              );
            };

            return (
              <div
                key={p.id}
                className="card bg-base-200 border border-base-300 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="card-body">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="avatar placeholder">
                          <div className="bg-primary text-primary-content rounded-full w-12 h-12 flex items-center justify-center">
                            <span className="text-sm font-bold">
                              {usuario?.nombre?.charAt(0) || "P"}
                              {usuario?.apellidoPaterno?.charAt(0) || "S"}
                            </span>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-base-content">
                            {usuario?.nombre || "Sin nombre"}{" "}
                            {usuario?.apellidoPaterno || ""}
                          </h3>
                          <p className="text-base-content/70">
                            {usuario?.correo || "Correo no disponible"}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-base-content/70">
                            Plan:
                          </span>
                          {getPlanBadge(p.plan)}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-base-content/70">
                            Estatus:
                          </span>
                          {getStatusBadge(p.estatus)}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-base-content/70">
                            ID:
                          </span>
                          <span className="text-sm font-mono text-base-content/70">
                            #{p.id}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="form-control">
                        <select
                          className="select select-bordered select-sm w-full"
                          value={p.plan}
                          onChange={(e) =>
                            handleCambiarPlan(p.id, parseInt(e.target.value))
                          }
                        >
                          <option value={1}>Plan Gratis</option>
                          <option value={2}>Plan Premium</option>
                        </select>
                      </div>

                      <div className="flex gap-2">
                        <button
                          className="btn btn-success btn-sm flex-1"
                          onClick={() => handleAprobar(p.id)}
                        >
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          Aprobar
                        </button>
                        <button
                          className="btn btn-error btn-sm flex-1"
                          onClick={() => handleRechazar(p.id)}
                        >
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                          Rechazar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
