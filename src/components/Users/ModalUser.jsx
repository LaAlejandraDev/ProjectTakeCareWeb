import React, { useEffect, useState } from "react";
import { UserAPI } from "../../api/user.api";
import { PsicologoAPI } from "../../api/psicologo.api";
import { PacienteAPI } from "../../api/paciente.api";
import { toast } from "react-toastify";

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
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    if (!abrirModal) return;

    if (!usuarioSeleccionado) {
      // Nuevo usuario
      setUser({
        id: 0,
        nombre: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        genero: "",
        correo: "",
        telefono: "",
        rol: "",
        activo: true,
      });
      setPaciente({ ...datosPaciente, idUsuario: 0 });
      setPsicologo({ ...datosPsicologo, idUsuario: 0 });
      setCargar(false);
      return;
    }

    // Seleccionar un usuario para editar sus datos
    const loadData = async () => {
      setCargar(true);
      try {
        setUser({ ...usuarioSeleccionado });

        if (usuarioSeleccionado.rol === 0) {
          try {
            const r = await PacienteAPI.getPacienteByUsuario(
              usuarioSeleccionado.id
            );
            setPaciente(
              r.data || { ...datosPaciente, idUsuario: usuarioSeleccionado.id }
            );
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
            setPsicologo(
              r.data || { ...datosPsicologo, idUsuario: usuarioSeleccionado.id }
            );
          } catch {
            setPsicologo({
              ...datosPsicologo,
              idUsuario: usuarioSeleccionado.id,
            });
          }
        }
      } catch (error) {
        console.error(error);
        toast.error("Error al cargar datos del usuario.");
      }
      setCargar(false);
    };

    loadData();
  }, [usuarioSeleccionado, abrirModal]);

  if (!abrirModal) return null;

  if (cargar || !user)
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-base-100 rounded-xl shadow-2xl p-8 flex flex-col items-center">
          <span className="loading loading-spinner loading-lg text-primary mb-4"></span>
          <p className="text-base-content font-medium">
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

  //registrar y guardar datos del usuario
  const handleSave = async () => {
    if (!user.rol && user.rol !== 0) {
      toast.error("Debes seleccionar un rol");
      return;
    }

    setGuardando(true);
    try {
      let usuarioCreado = user;

      if (!user.id) {
        const usuarioData = { ...user };
        delete usuarioData.id;

        const res = await UserAPI.createUsuario(usuarioData);
        usuarioCreado = res.data;

        if (usuarioCreado.rol === 0) {
          await PacienteAPI.createPaciente({
            ...paciente,
            idUsuario: usuarioCreado.id,
          });
        } else if (usuarioCreado.rol === 2) {
          await PsicologoAPI.createPsicologo({
            ...psicologo,
            experienciaAnios: Number(psicologo.experienciaAnios || 0),
            idUsuario: usuarioCreado.id,
          });
        }

        toast.success("Usuario creado correctamente");
      } else {
        const usuarioData = { ...user };

        await UserAPI.updateUsuario(user.id, usuarioData);

        if (user.rol === 0) {
          await PacienteAPI.updatePaciente(paciente.id, {
            ...paciente,
            idUsuario: user.id,
          });
        } else if (user.rol === 2) {
          await PsicologoAPI.updatePsicologo(psicologo.id, {
            ...psicologo,
            experienciaAnios: Number(psicologo.experienciaAnios || 0),
            idUsuario: user.id,
          });
        }

        toast.success("Usuario actualizado correctamente");
      }

      guardar();
      cerrarModal();
    } catch (error) {
      console.error(error);
      toast.error("No se pudo guardar el usuario.");
    } finally {
      setGuardando(false);
    }
  };

  const getRoleName = (rol) => {
    const roles = { 0: "Paciente", 1: "Administrador", 2: "Psicólogo" };
    return roles[rol] || "Usuario";
  };

  const getRoleBadge = (rol) => {
    const badges = {
      0: "badge-success",
      1: "badge-error",
      2: "badge-primary",
    };
    return badges[rol] || "badge-neutral";
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50">
      <div className="bg-base-100 rounded-xl shadow-md w-full max-w-2xl flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-base-300 flex-shrink-0">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-primary">
                {user.id ? "Editar Usuario" : "Nuevo Usuario"}
              </h2>
              {user.id && (
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-base-content">
                    {user.nombre} {user.apellidoPaterno}
                  </span>
                  <span className={`badge ${getRoleBadge(user.rol)} badge-lg`}>
                    {getRoleName(user.rol)}
                  </span>
                </div>
              )}
            </div>
            <button
              onClick={cerrarModal}
              className="btn btn-ghost btn-sm btn-circle"
              disabled={guardando}
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
            <h3 className="text-lg font-semibold text-primary mb-4">
              Información Básica
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Nombre</span>
                </label>
                <input
                  name="nombre"
                  value={user.nombre}
                  onChange={handleUser}
                  placeholder="Ingresa el nombre"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">
                    Apellido Paterno
                  </span>
                </label>
                <input
                  name="apellidoPaterno"
                  value={user.apellidoPaterno}
                  onChange={handleUser}
                  placeholder="Ingresa el apellido paterno"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">
                    Apellido Materno
                  </span>
                </label>
                <input
                  name="apellidoMaterno"
                  value={user.apellidoMaterno}
                  onChange={handleUser}
                  placeholder="Ingresa el apellido materno"
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Género</span>
                </label>
                <select
                  name="genero"
                  value={user.genero}
                  onChange={handleUser}
                  className="select select-bordered w-full"
                >
                  <option value="">Seleccionar género</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Otro">Otro</option>
                  <option value="Prefiero no decir">Prefiero no decir</option>
                </select>
              </div>

              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text font-semibold">
                    Correo Electrónico
                  </span>
                </label>
                <input
                  name="correo"
                  type="email"
                  value={user.correo}
                  onChange={handleUser}
                  placeholder="correo@ejemplo.com"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {!user.id && (
                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text font-semibold">Contraseña</span>
                  </label>
                  <input
                    name="contrasena"
                    type="password"
                    value={user.contrasena || ""}
                    onChange={handleUser}
                    placeholder="Ingresa una contraseña segura"
                    className="input input-bordered w-full"
                  />
                  <label className="label">
                    <span className="label-text-alt text-base-content/60">
                      Si se deja vacío, se generará una contraseña
                      automáticamente
                    </span>
                  </label>
                </div>
              )}

              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text font-semibold">Teléfono</span>
                </label>
                <input
                  name="telefono"
                  type="tel"
                  value={user.telefono}
                  onChange={handleUser}
                  placeholder="+52 123 456 7890"
                  className="input input-bordered w-full"
                />
              </div>

              {!user.id && (
                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text font-semibold">Rol</span>
                  </label>
                  <select
                    name="rol"
                    value={user.rol}
                    onChange={(e) =>
                      setUser({ ...user, rol: parseInt(e.target.value) })
                    }
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="">Seleccionar un rol</option>
                    <option value={1}>Administrador</option>
                    <option value={0}>Paciente</option>
                    <option value={2}>Psicólogo</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          {user.rol === 0 && (
            <div className="mt-6 pt-6 border-t border-base-300">
              <h3 className="text-lg font-semibold text-primary mb-4">
                Datos del Paciente
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Ciudad</span>
                  </label>
                  <input
                    name="ciudad"
                    value={paciente.ciudad}
                    onChange={handlePaciente}
                    placeholder="Ciudad de residencia"
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Estado Civil
                    </span>
                  </label>
                  <input
                    name="estadoCivil"
                    value={paciente.estadoCivil}
                    onChange={handlePaciente}
                    placeholder="Estado civil"
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Diagnóstico
                    </span>
                  </label>
                  <input
                    name="diagnostico"
                    value={paciente.diagnostico}
                    onChange={handlePaciente}
                    placeholder="Diagnóstico principal"
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Antecedentes Médicos
                    </span>
                  </label>
                  <textarea
                    name="antecedentesMedicos"
                    value={paciente.antecedentesMedicos}
                    onChange={handlePaciente}
                    placeholder="Antecedentes médicos relevantes..."
                    rows="4"
                    className="textarea textarea-bordered w-full resize-none"
                  />
                </div>

                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Contacto de Emergencia
                    </span>
                  </label>
                  <input
                    name="contactoEmergencia"
                    value={paciente.contactoEmergencia}
                    onChange={handlePaciente}
                    placeholder="Nombre y teléfono de contacto"
                    className="input input-bordered w-full"
                  />
                </div>
              </div>
            </div>
          )}

          {user.rol === 2 && (
            <div className="mt-6 pt-6 border-t border-base-300">
              <h3 className="text-lg font-semibold text-primary mb-4">
                Datos del Psicólogo
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Cédula Profesional
                    </span>
                  </label>
                  <input
                    name="cedulaProfesional"
                    value={psicologo.cedulaProfesional}
                    onChange={handlePsicologo}
                    placeholder="Número de cédula profesional"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Especialidad
                    </span>
                  </label>
                  <input
                    name="especialidad"
                    value={psicologo.especialidad}
                    onChange={handlePsicologo}
                    placeholder="Especialidad principal"
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Descripción Profesional
                    </span>
                  </label>
                  <textarea
                    name="descripcion"
                    value={psicologo.descripcion}
                    onChange={handlePsicologo}
                    placeholder="Breve descripción profesional y experiencia..."
                    rows="4"
                    className="textarea textarea-bordered w-full resize-none"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Años de Experiencia
                    </span>
                  </label>
                  <input
                    name="experienciaAnios"
                    type="number"
                    value={psicologo.experienciaAnios}
                    onChange={handlePsicologo}
                    placeholder="0"
                    min="0"
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Universidad de Egreso
                    </span>
                  </label>
                  <input
                    name="universidadEgreso"
                    value={psicologo.universidadEgreso}
                    onChange={handlePsicologo}
                    placeholder="Universidad donde se tituló"
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Dirección del Consultorio
                    </span>
                  </label>
                  <input
                    name="direccionConsultorio"
                    value={psicologo.direccionConsultorio}
                    onChange={handlePsicologo}
                    placeholder="Dirección completa del consultorio"
                    className="input input-bordered w-full"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 bg-base-200 border-t border-base-300 flex justify-end gap-3 flex-shrink-0">
          <button
            onClick={cerrarModal}
            disabled={guardando}
            className="btn btn-ghost"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={guardando}
            className="btn btn-primary"
          >
            {guardando ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                {user.id ? "Guardando..." : "Creando..."}
              </>
            ) : user.id ? (
              "Guardar Cambios"
            ) : (
              "Crear Usuario"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
