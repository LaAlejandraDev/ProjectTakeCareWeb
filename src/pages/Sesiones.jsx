import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { citasAPI } from "../api/citas.api";
import axiosClient from "../api/axiosClient";
import { toast } from "react-toastify";

export default function Sesiones() {
  const navigate = useNavigate();
  const { id: pacienteIdURL } = useParams();

  const [pacienteInfo, setPacienteInfo] = useState(null);
  const [sesionesList, setSesionesList] = useState([]);
  const [selectedSesion, setSelectedSesion] = useState(null);
  const [comentario, setComentario] = useState("");
  const [comentarioId, setComentarioId] = useState(null);
  const [loading, setLoading] = useState(true);

  const pacienteId = parseInt(pacienteIdURL, 10);

  const [searchId, setSearchId] = useState("");
  const [searchDate, setSearchDate] = useState("");

  const loadComentarioDeCita = async (citaId) => {
    const { data } = await citasAPI.getComentarios();
    return data.find((x) => x.citaId === citaId) || null;
  };

  useEffect(() => {
    if (!pacienteId || isNaN(pacienteId)) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        // Info del paciente
        const { data: userData } = await axiosClient.get(
          `/Usuarios/${pacienteId}`
        );
        setPacienteInfo({
          Nombre: userData.nombre,
          ApellidoPaterno: userData.apellidoPaterno,
          ApellidoMaterno: userData.apellidoMaterno,
        });

        // Sesiones del paciente
        const { data: citasData } = await citasAPI.getCitasByPaciente(
          pacienteId
        );

        // Orden inverso: más recientes primero
        const citasOrdenadas = citasData.sort(
          (a, b) => new Date(b.fechaInicio) - new Date(a.fechaInicio)
        );
        setSesionesList(citasOrdenadas);
      } catch (error) {
        console.error(error);
        toast.error("Error al cargar la información");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pacienteId]);

  const openSesion = async (sesion) => {
    setSelectedSesion(sesion);

    try {
      const { data: citaFull } = await citasAPI.getCitaById(sesion.id);
      setSelectedSesion(citaFull);

      const comentarioEncontrado = await loadComentarioDeCita(sesion.id);

      if (comentarioEncontrado) {
        setComentario(comentarioEncontrado.comentario);
        setComentarioId(comentarioEncontrado.id);
      } else {
        setComentario("");
        setComentarioId(null);
      }
    } catch (error) {
      toast.error("Error al cargar detalles de la cita");
    }
  };

  const saveComentario = async () => {
    try {
      if (comentarioId) {
        await citasAPI.putComentario(comentarioId, {
          id: comentarioId,
          citaId: selectedSesion.id,
          comentario,
        });
        toast.success("Comentario actualizado");
      } else {
        const resp = await citasAPI.postComentario({
          citaId: selectedSesion.id,
          comentario,
        });
        setComentarioId(resp.data.id);
        toast.success("Comentario guardado");
      }
    } catch {
      toast.error("Error al guardar el comentario");
    }
  };

  // Filtrado
  const filteredSesiones = sesionesList.filter((s) => {
    const matchId = searchId ? s.id.toString().includes(searchId) : true;
    const matchDate = searchDate
      ? s.fechaInicio.slice(0, 10) === searchDate
      : true;
    return matchId && matchDate;
  });

  if (loading) {
    return (
      <div className="p-6 bg-base-200 min-h-screen">
        <div className="skeleton h-8 w-64 mb-6"></div>
        <div className="grid grid-cols-1 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card bg-white border p-4 shadow-md">
              <div className="skeleton h-5 w-32 mb-2"></div>
              <div className="skeleton h-4 w-56 mb-1"></div>
              <div className="skeleton h-4 w-44"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-base-200 min-h-screen">
      <h1 className="text-2xl font-bold text-primary mb-4">
        Sesiones de {pacienteInfo?.Nombre} {pacienteInfo?.ApellidoPaterno}{" "}
        {pacienteInfo?.ApellidoMaterno}
      </h1>

      <div className="flex gap-4 mb-4">
        <div>
          <label className="label">Buscar por número de sesión</label>
          <input
            type="number"
            className="input input-bordered"
            placeholder="Ej: 12"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
        </div>

        <div>
          <label className="label">Filtrar por fecha</label>
          <input
            type="date"
            className="input input-bordered"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredSesiones.map((s, index) => (
          <div
            key={s.id}
            className="card bg-white shadow-md border p-4 cursor-pointer hover:shadow-lg"
            onClick={() => openSesion(s)}
          >
            <h2 className="text-lg font-bold">Sesión #{index + 1}</h2>{" "}
            {/* ✅ Conteo local */}
            <p>
              <strong>Fecha Inicio:</strong>{" "}
              {new Date(s.fechaInicio).toLocaleString()}
            </p>
            <p>
              <strong>Motivo:</strong> {s.motivo}
            </p>
          </div>
        ))}
      </div>

      {selectedSesion && (
        <dialog open className="modal">
          <div className="modal-box max-w-3xl">
            <h3 className="font-bold text-xl mb-3">
              Sesión #
              {filteredSesiones.findIndex((s) => s.id === selectedSesion.id) +
                1}{" "}
              {/* Conteo local */}
            </h3>
            <div className="space-y-1 text-sm">
              <p>
                <strong>Motivo:</strong> {selectedSesion.motivo}
              </p>
              <p>
                <strong>Estado:</strong> {selectedSesion.estado}
              </p>
              <p>
                <strong>Ubicación:</strong> {selectedSesion.ubicacion}
              </p>
              <p>
                <strong>Fecha Inicio:</strong>{" "}
                {new Date(selectedSesion.fechaInicio).toLocaleString()}
              </p>
              <p>
                <strong>Fecha Fin:</strong>{" "}
                {new Date(selectedSesion.fechaFin).toLocaleString()}
              </p>
              <p>
                <strong>Expediente ID:</strong> {selectedSesion.expedienteId}
              </p>
            </div>

            <div className="mt-4">
              <label className="label">Comentario:</label>
              <textarea
                className="textarea textarea-bordered w-full h-32"
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                placeholder="Escribe un comentario..."
              />
            </div>

            <div className="modal-action">
              <button className="btn btn-success" onClick={saveComentario}>
                Guardar Comentario
              </button>
              <button
                className="btn btn-outline"
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
}
