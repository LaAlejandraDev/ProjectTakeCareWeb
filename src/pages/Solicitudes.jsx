import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axiosClient from "../api/axiosClient";

export default function Solicitudes() {
  const { user, loading: authLoading } = useContext(AuthContext);

  const [notifs, setNotifs] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      loadNotifs();
    }
  }, [user, authLoading]);

  const loadNotifs = async () => {
    setLoadingData(true);

    const currentUserId = user.id || user.Id || user.idUsuario;

    if (!currentUserId) {
      setLoadingData(false);
      return;
    }

    try {
      const { data } = await axiosClient.get("/Notificacions");

      const mine = (data || [])
        .filter((n) => {
          const destinoId = n.idUsuario || n.IdUsuario;
          return Number(destinoId) === Number(currentUserId);
        })
        .reverse();

      setNotifs(mine);
    } catch (err) {
      console.error("Error al cargar notificaciones:", err);
    } finally {
      setLoadingData(false);
    }
  };

  const parseMensaje = (mensajeRaw) => {
    if (!mensajeRaw)
      return { pacienteNombre: "Desconocido", texto: "...", pacienteId: 0 };

    try {
      const obj = JSON.parse(mensajeRaw);
      return {
        pacienteNombre: obj.pacienteNombre || "Paciente",
        texto: obj.texto || "Solicitud de cita",
        pacienteId: obj.pacienteId || 0,
      };
    } catch {
      return {
        pacienteNombre: "Paciente (Texto Plano)",
        texto: mensajeRaw,
        pacienteId: 0,
      };
    }
  };

  const setLeida = async (notif) => {
    const idNotif = notif.id || notif.Id;
    try {
      const { data } = await axiosClient.get(`/Notificacions/${idNotif}`);
      const updated = { ...data, leida: true };
      await axiosClient.put(`/Notificacions/${idNotif}`, updated);

      loadNotifs();
      return true;
    } catch (err) {
      console.error("Error al marcar leído:", err);
      return false;
    }
  };

  const handleAceptar = async (n) => {
    const info = parseMensaje(n.mensaje || n.Mensaje);
    const currentUserId = user.id || user.Id;

    if (!info.pacienteId) {
      alert("Error: No se detectó ID del paciente en el mensaje.");
      return;
    }

    try {
      const success = await setLeida(n);
      if (!success) return;
      const pacientePayload = {
        id: 0,
        idPsicologo: currentUserId,
        idUsuario: info.pacienteId,
        estado: "Activo",
        fechaAsignacion: new Date().toISOString(),
      };

      await axiosClient.post("/Pacientes", pacientePayload);
      const respuesta = {
        idUsuario: info.pacienteId,
        titulo: `Solicitud Aceptada`,
        mensaje: JSON.stringify({
          psicologoId: currentUserId,
          psicologoNombre: user.nombre || "Tu Psicólogo",
          texto: "Tu solicitud fue aceptada. Ya eres mi paciente.",
        }),
        leida: false,
        fecha: new Date().toISOString(),
      };

      await axiosClient.post("/Notificacions", respuesta);
      alert("Solicitud aceptada exitosamente.");
    } catch (err) {
      console.error("Error al aceptar:", err);
      alert("Error al procesar la solicitud.");
    }
  };

  const handleRechazar = async (n) => {
    const info = parseMensaje(n.mensaje || n.Mensaje);
    const currentUserId = user.id || user.Id;

    if (!info.pacienteId) {
      alert("No se puede responder sin ID de paciente.");
      return;
    }

    try {
      const success = await setLeida(n);
      if (!success) return;

      const respuesta = {
        idUsuario: info.pacienteId,
        titulo: `Solicitud Rechazada`,
        mensaje: JSON.stringify({
          psicologoId: currentUserId,
          psicologoNombre: user.nombre || "Psicólogo",
          texto: "Lo siento, no puedo aceptar tu solicitud en este momento.",
        }),
        leida: false,
        fecha: new Date().toISOString(),
      };

      await axiosClient.post("/Notificacions", respuesta);
      alert("Solicitud rechazada.");
    } catch (err) {
      console.error(err);
      alert("Error al rechazar.");
    }
  };

  // Renderizado condicional
  if (authLoading) return <div className="p-4">Verificando sesión...</div>;
  if (!user)
    return <div className="p-4">Debes iniciar sesión para ver esto.</div>;
  if (loadingData)
    return <div className="p-4 text-center">Cargando solicitudes...</div>;

  const unreadNotifs = notifs.filter((n) => {
    const isLeida = n.leida !== undefined ? n.leida : n.Leida;
    return isLeida === false;
  });

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">
        Solicitudes de Pacientes
      </h2>

      {unreadNotifs.length === 0 ? (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
          No tienes solicitudes pendientes.
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
          <ul className="divide-y divide-gray-200">
            {unreadNotifs.map((n) => {
              const info = parseMensaje(n.mensaje || n.Mensaje);
              const notifId = n.id || n.Id;

              return (
                <li key={notifId} className="p-4 hover:bg-gray-50 transition">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-indigo-600">
                        {info.pacienteNombre}
                      </p>
                      <p className="mt-1 text-sm text-gray-600">{info.texto}</p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAceptar(n)}
                        className="px-3 py-2 text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                      >
                        Aceptar
                      </button>
                      <button
                        onClick={() => handleRechazar(n)}
                        className="px-3 py-2 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                      >
                        Rechazar
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
