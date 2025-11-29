import React, { useEffect, useState, useContext } from "react";
import axios from "../api/axiosClient";
import { AuthContext } from "../context/AuthContext";
import { useSignalR } from "../context/SignalContext";
import ToastTest from "../components/Toast/ToastTest";

export default function PsicologosCatalog() {
  const { user } = useContext(AuthContext);
  const { connection } = useSignalR();

  const [psicologos, setPsicologos] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [filtroEsp, setFiltroEsp] = useState("");
  const [qNombre, setQNombre] = useState("");
  const [seleccionado, setSeleccionado] = useState(null);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    loadPsicologos();
  }, []);

  const loadPsicologos = async () => {
    try {
      const { data } = await axios.get("/api/Psicologos");
      setPsicologos(data || []);
      // extraer especialidades
      const esp = Array.from(
        new Set((data || []).map((p) => p.especialidad).filter(Boolean))
      );
      setEspecialidades(esp);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelect = (p) => {
    setSeleccionado(p);
    setMensaje(""); // limpiar mensaje
    setQNombre(
      p.usuario
        ? `${p.usuario.nombre || ""} ${p.usuario.apellidoPaterno || ""}`.trim()
        : ""
    );
  };

  const handleEnviarSolicitud = async () => {
    if (!seleccionado) return alert("Selecciona un psicólogo");
    if (!mensaje || mensaje.trim().length < 5)
      return alert("Escribe un mensaje breve (min 5 caracteres).");

    // construir mensaje con información del paciente
    const payloadMensaje = JSON.stringify({
      pacienteId: user?.id || user?.Id || 0,
      pacienteNombre:
        user?.nombre ||
        user?.nombreCompleto ||
        (user && `${user.nombre} ${user.apellidoPaterno}`) ||
        "Paciente",
      texto: mensaje,
    });

    const notificacion = {
      idUsuario: seleccionado.usuario
        ? seleccionado.usuario.id ?? seleccionado.usuario.Id ?? 0
        : 0,
      titulo: `Solicitud de ${user?.nombre || "Paciente"}`,
      mensaje: payloadMensaje,
      leida: false,
      fecha: new Date().toISOString(),
    };

    try {
      await axios.post("/api/Notificacions", notificacion);
      if (connection && connection.invoke) {
        const sendPayload = {
          tipo: "Notificacion",
          destinatarioId: notificacion.idUsuario,
          desdeUsuarioId: user?.id ?? user?.Id ?? 0,
          titulo: notificacion.titulo,
          mensaje: payloadMensaje,
          fecha: notificacion.fecha,
        };
        connection
          .invoke("SendMessage", sendPayload)
          .catch((err) => console.error("SR send err", err));
      }

      ToastTest({
        message: "Solicitud enviada correctamente",
        type: "success",
      });
      setMensaje("");
    } catch (err) {
      console.error(err);
      ToastTest({ message: "Error al enviar la solicitud", type: "error" });
    }
  };

  const filtered = psicologos.filter((p) => {
    const matchEsp = filtroEsp
      ? (p.especialidad || "").toLowerCase() === filtroEsp.toLowerCase()
      : true;
    const matchName = qNombre
      ? ((p.usuario?.nombre || "") + " " + (p.usuario?.apellidoPaterno || ""))
          .toLowerCase()
          .includes(qNombre.toLowerCase())
      : true;
    return matchEsp && matchName;
  });

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Catálogo de Psicólogos</h2>

      <div className="mb-4 flex gap-2">
        <select
          value={filtroEsp}
          onChange={(e) => setFiltroEsp(e.target.value)}
        >
          <option value="">Todas las especialidades</option>
          {especialidades.map((e, i) => (
            <option key={i} value={e}>
              {e}
            </option>
          ))}
        </select>

        <input
          placeholder="Buscar por nombre (o escribe para autocompletar)"
          value={qNombre}
          onChange={(e) => setQNombre(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <ul>
            {filtered.map((p) => (
              <li
                key={p.id}
                className="p-2 border rounded mb-2 cursor-pointer"
                onClick={() => handleSelect(p)}
              >
                <div className="font-bold">
                  {p.usuario
                    ? `${p.usuario.nombre || ""} ${
                        p.usuario.apellidoPaterno || ""
                      }`
                    : "Psicólogo"}
                </div>
                <div className="text-sm">
                  {p.especialidad || "Especialidad no registrada"}
                </div>
                <div className="text-xs">{p.descripcion || ""}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-1">
          <div className="p-4 border rounded">
            <h3 className="font-semibold">Detalles</h3>
            {seleccionado ? (
              <>
                <div className="mt-2">
                  Nombre:{" "}
                  {seleccionado.usuario
                    ? `${seleccionado.usuario.nombre} ${seleccionado.usuario.apellidoPaterno}`
                    : "—"}
                </div>
                <div>Especialidad: {seleccionado.especialidad || "—"}</div>

                <textarea
                  className="w-full mt-2 p-2 border"
                  rows={6}
                  placeholder="Escribe brevemente tu problema para que el psicólogo vea si puede ayudarte..."
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                />

                <button
                  className="mt-2 px-4 py-2 rounded bg-blue-600 text-white"
                  onClick={handleEnviarSolicitud}
                >
                  Enviar solicitud
                </button>
              </>
            ) : (
              <div>
                Selecciona un psicólogo para ver detalles y enviar una
                solicitud.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
