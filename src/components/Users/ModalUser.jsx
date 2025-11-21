import { useEffect, useState } from "react";
import { UserAPI } from "../../api/user.api";
import { toast } from "react-toastify";
import { PsicologoAPI } from "../../api/psicologo.api";
import { PacienteAPI } from "../../api/paciente.api";

export default function ModalUser({
  abrirModal,
  cerrarModal,
  usuarioSeleccionado,
  guardar,
}) {
  const datosPaciente = {
    id: 0,
    ciudad: "",
    estadoCivil: "",
    diagnostico: "",
    antecedentesMedicos: "",
    contactoEmergencia: "",
    idUsuario: 0,
  };

  const datosPsicologo = {
    id: 0,
    cedulaProfesional: "",
    especialidad: "",
    descripcion: "",
    experienciaAnios: "",
    universidadEgreso: "",
    direccionConsultorio: "",
    idUsuario: 0,
  };

  const [user, setUser] = useState(null);
  const [paciente, setPaciente] = useState(datosPaciente);
  const [psicologo, setPsicologo] = useState(datosPsicologo);
  const [cargar, setCargar] = useState(true);

  useEffect(() => {
    if (!usuarioSeleccionado) return;

    const loadData = async () => {
      setCargar(true);

      try {
        setUser({ ...usuarioSeleccionado });

        if (usuarioSeleccionado.rol === 0) {
          try {
            const r = await PacienteAPI.getPacienteByUsuario(
              usuarioSeleccionado.id
            );
            setPaciente(r.data);
          } catch {
            setPaciente({
              ...datosPaciente,
              idUsuario: usuarioSeleccionado.id,
            });
          }
        }

        if (usuarioSeleccionado.rol === 2) {
          try {
            const r = await PsicologoAPI.getPsicologoByUsuario(
              usuarioSeleccionado.id
            );
            setPsicologo(r.data);
          } catch {
            setPsicologo({
              ...datosPsicologo,
              idUsuario: usuarioSeleccionado.id,
            });
          }
        }
      } catch {
        toast.error("Error al cargar datos del usuario.");
      }

      setCargar(false);
    };

    loadData();
  }, [usuarioSeleccionado]);

  if (!abrirModal) return null;

  if (cargar || !user)
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-2xl p-8 flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600 font-medium">
            Cargando datos del usuario...
          </p>
        </div>
      </div>
    );

  const handleUser = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handlePaciente = (e) =>
    setPaciente({ ...paciente, [e.target.name]: e.target.value });

  const handlePsicologo = (e) =>
    setPsicologo({ ...psicologo, [e.target.name]: e.target.value });

  const handleSave = async () => {
    try {
      const usuarioDTO = {
        id: user.id,
        nombre: user.nombre,
        apellidoPaterno: user.apellidoPaterno,
        apellidoMaterno: user.apellidoMaterno,
        genero: user.genero,
        correo: user.correo,
        telefono: user.telefono,
        contrasena: user.contrasena,
        rol: user.rol,
        activo: user.activo,
        suscripcion: user.suscripcion,
      };

      await UserAPI.updateUsuario(user.id, usuarioDTO);

      if (user.rol === 0) {
        await UserAPI.updatePaciente(paciente.id, {
          ...paciente,
          idUsuario: user.id,
        });
      }

      if (user.rol === 2) {
        await PsicologoAPI.updatePsicologo(psicologo.id, {
          ...psicologo,
          idUsuario: user.id,
        });
      }

      toast.success("Usuario actualizado correctamente");
      guardar();
      cerrarModal();
    } catch {
      toast.error("No se pudo guardar el usuario.");
    }
  };

  const getRoleName = (rol) => {
    const roles = {
      0: "Paciente",
      1: "Administrador",
      2: "Psicólogo",
    };
    return roles[rol] || "Usuario";
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh]">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex-shrink-0">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-white">Editar Usuario</h2>
              <p className="text-blue-100 text-sm mt-1">
                {user.nombre} {user.apellidoPaterno} - {getRoleName(user.rol)}
              </p>
            </div>
            <button
              onClick={cerrarModal}
              className="text-white hover:bg-blue-500 p-2 rounded-lg transition-colors"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <svg
                className="w-5 h-5 text-blue-600 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Información Básica
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <input
                  name="nombre"
                  value={user.nombre || ""}
                  onChange={handleUser}
                  placeholder="Nombre"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Apellido Paterno
                </label>
                <input
                  name="apellidoPaterno"
                  value={user.apellidoPaterno || ""}
                  onChange={handleUser}
                  placeholder="Apellido paterno"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Apellido Materno
                </label>
                <input
                  name="apellidoMaterno"
                  value={user.apellidoMaterno || ""}
                  onChange={handleUser}
                  placeholder="Apellido materno"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Género
                </label>
                <select
                  name="genero"
                  value={user.genero || ""}
                  onChange={handleUser}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">Seleccionar género</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Correo Electrónico
                </label>
                <input
                  name="correo"
                  value={user.correo || ""}
                  onChange={handleUser}
                  placeholder="Correo electrónico"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono
                </label>
                <input
                  name="telefono"
                  value={user.telefono || ""}
                  onChange={handleUser}
                  placeholder="Teléfono"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {user.rol === 0 && paciente && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <svg
                  className="w-5 h-5 text-green-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                Datos del Paciente
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ciudad
                  </label>
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    name="ciudad"
                    value={paciente.ciudad}
                    onChange={handlePaciente}
                    placeholder="Ciudad"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estado Civil
                  </label>
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    name="estadoCivil"
                    value={paciente.estadoCivil}
                    onChange={handlePaciente}
                    placeholder="Estado civil"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Diagnóstico
                  </label>
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    name="diagnostico"
                    value={paciente.diagnostico}
                    onChange={handlePaciente}
                    placeholder="Diagnóstico"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Antecedentes Médicos
                  </label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none"
                    name="antecedentesMedicos"
                    value={paciente.antecedentesMedicos}
                    onChange={handlePaciente}
                    placeholder="Antecedentes médicos"
                    rows="3"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contacto de Emergencia
                  </label>
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    name="contactoEmergencia"
                    value={paciente.contactoEmergencia}
                    onChange={handlePaciente}
                    placeholder="Contacto emergencia"
                  />
                </div>
              </div>
            </div>
          )}

          {user.rol === 2 && psicologo && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <svg
                  className="w-5 h-5 text-purple-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                Datos del Psicólogo
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cédula Profesional
                  </label>
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    name="cedulaProfesional"
                    value={psicologo.cedulaProfesional}
                    onChange={handlePsicologo}
                    placeholder="Cédula profesional"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Especialidad
                  </label>
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    name="especialidad"
                    value={psicologo.especialidad}
                    onChange={handlePsicologo}
                    placeholder="Especialidad"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción
                  </label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors resize-none"
                    name="descripcion"
                    value={psicologo.descripcion}
                    onChange={handlePsicologo}
                    placeholder="Descripción"
                    rows="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Años de Experiencia
                  </label>
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    name="experienciaAnios"
                    value={psicologo.experienciaAnios}
                    onChange={handlePsicologo}
                    placeholder="Años experiencia"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Universidad
                  </label>
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    name="universidadEgreso"
                    value={psicologo.universidadEgreso}
                    onChange={handlePsicologo}
                    placeholder="Universidad"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dirección del Consultorio
                  </label>
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    name="direccionConsultorio"
                    value={psicologo.direccionConsultorio}
                    onChange={handlePsicologo}
                    placeholder="Dirección consultorio"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3 flex-shrink-0">
          <button
            onClick={cerrarModal}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            Cancelar
          </button>

          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center"
          >
            <svg
              className="w-4 h-4 mr-2"
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
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}
