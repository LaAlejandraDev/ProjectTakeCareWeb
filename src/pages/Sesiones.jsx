import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../api/axiosClient";

const Sesiones = () => {
  const navigate = useNavigate();
  const { id: pacienteIdURL } = useParams();

  const [pacienteInfo, setPacienteInfo] = useState(null);
  const [sesionesList, setSesionesList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedSesion, setSelectedSesion] = useState(null);
  const [editObservations, setEditObservations] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const pacienteId = parseInt(pacienteIdURL, 10);

  useEffect(() => {
    if (!pacienteId || isNaN(pacienteId)) {
      setLoading(false);
      return;
    }

    const fetchDatosPaciente = async () => {
      try {
        const { data: userData } = await axiosClient.get(
          `/Usuarios/${pacienteId}`
        );
        setPacienteInfo({
          Nombre: userData.nombre || userData.Nombre,
          ApellidoPaterno:
            userData.apellidoPaterno || userData.ApellidoPaterno || "",
          ApellidoMaterno:
            userData.apellidoMaterno || userData.ApellidoMaterno || "",
        });

        const { data: citasData } = await axiosClient.get(`/Citas`);

        const pacienteCitas = citasData
          .filter((c) => (c.idUsuario || c.IdUsuario) === pacienteId)
          .map((c) => ({
            idSesion: c.id || c.Id,
            fecha: c.fechaInicio || c.FechaInicio,
            observaciones:
              c.observaciones ||
              c.Observaciones ||
              "Sin observaciones registradas",
            ...c,
          }));

        setSesionesList(pacienteCitas);
      } catch (error) {
        console.error(
          "Error al cargar los datos del paciente o sesiones:",
          error
        );
        setPacienteInfo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDatosPaciente();
  }, [pacienteId]);

  useEffect(() => {
    if (selectedSesion) {
      setEditObservations(selectedSesion.observaciones);
    }
  }, [selectedSesion]);

  const handleSaveEdit = async () => {
    if (!selectedSesion || isSaving) return;

    if (editObservations === selectedSesion.observaciones) {
      setSelectedSesion(null);
      return;
    }

    setIsSaving(true);
    const citaId = selectedSesion.idSesion;

    try {
      const { data: currentCita } = await axiosClient.get(`/Citas/${citaId}`);

      const updatedCita = {
        ...currentCita,
        observaciones: editObservations,
        Observaciones: editObservations,
      };

      await axiosClient.put(`/Citas/${citaId}`, updatedCita);

      setSesionesList((prevList) =>
        prevList.map((s) =>
          s.idSesion === citaId ? { ...s, observaciones: editObservations } : s
        )
      );

      alert("Observaciones actualizadas con éxito en la BD.");
      setSelectedSesion(null);
    } catch (error) {
      console.error(
        "Error al guardar la sesión:",
        error.response?.data || error
      );
      alert(
        "Error al guardar las observaciones. Verifique que el endpoint PUT /api/Citas/{id} esté funcionando correctamente."
      );
    } finally {
      setIsSaving(false);
    }
  };

  const filteredSesiones = sesionesList
    .slice()
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    .filter(
      (sesion) =>
        sesion.observaciones
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        (sesion.fecha && sesion.fecha.includes(searchQuery))
    );

  if (loading) {
    return (
      <div className="p-10 text-center">
        Cargando información del paciente y sesiones...
      </div>
    );
  }

  if (!pacienteId || isNaN(pacienteId) || !pacienteInfo) {
    return (
      <div className="p-10">
        <p className="text-red-600">
          Error: Paciente no encontrado o ID inválido.
        </p>
        <button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>
          Regresar
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <h1 className="text-2xl font-bold text-primary mb-4">
        Sesiones de {pacienteInfo.Nombre} {pacienteInfo.ApellidoPaterno}{" "}
        {pacienteInfo.ApellidoMaterno}
      </h1>

      <input
        className="input input-bordered w-full"
        type="text"
        placeholder="Buscar por fecha u observación..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="grid grid-cols-1 gap-4 mt-4">
        {filteredSesiones.length === 0 ? (
          <p className="text-gray-500 mt-4">
            No se encontraron sesiones o no hay historial para este paciente.
          </p>
        ) : (
          filteredSesiones.map((sesion) => (
            <div
              key={sesion.idSesion}
              className="card bg-white border border-base-300 shadow-md hover:shadow-lg transition cursor-pointer"
              onClick={() => setSelectedSesion(sesion)}
            >
              <div className="card-body">
                <h2 className="text-lg font-semibold text-secondary">
                  Sesión ID: {sesion.idSesion}
                </h2>
                <p className="text-sm opacity-80">
                  Fecha: {new Date(sesion.fecha).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <button className="btn btn-primary mt-6" onClick={() => navigate(-1)}>
        Volver a Expedientes
      </button>

      {selectedSesion && (
        <dialog open className="modal">
          <div className="modal-box w-11/12 max-w-2xl">
            <h3 className="font-bold text-xl text-primary mb-4">
              Detalles y Edición de Sesión {selectedSesion.idSesion}
            </h3>

            <p className="py-2 text-sm">
              <strong>Fecha:</strong>{" "}
              {new Date(selectedSesion.fecha).toLocaleDateString()}
            </p>

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Observaciones (Editable):</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-48"
                value={editObservations}
                onChange={(e) => setEditObservations(e.target.value)}
              />
            </div>

            <div className="modal-action">
              <button
                className={`btn btn-success ${isSaving ? "loading" : ""}`}
                onClick={handleSaveEdit}
                disabled={isSaving}
              >
                {isSaving ? "Guardando..." : "Guardar Cambios"}
              </button>
              <button
                className="btn btn-outline"
                onClick={() => setSelectedSesion(null)}
                disabled={isSaving}
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
