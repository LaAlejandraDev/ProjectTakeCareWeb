import React, { useEffect, useState } from "react";
import { UserAPI } from "../../api/user.api";
import { toast } from "react-toastify";
import ModalUser from "./ModalUser";

const UserForm = () => { // Componente principal para la gestión de usuarios
  const [users, setUsers] = useState([]);
  const [load, setLoad] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [rolFiltro, setRolFiltro] = useState("");

  const [abrirModal, setAbrirModal] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  const handleEdit = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setAbrirModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;

    try {
      await UserAPI.deleteUsuario(id);
      toast.success("Usuario eliminado correctamente");

      const res = await UserAPI.getUsers();
      setUsers(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar usuario");
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      setLoad(true);
      const response = await UserAPI.getUsers();
      setUsers(response.data);
    } catch (error) {
      toast.error("Error al cargar los usuarios.");
      console.error(error);
    } finally {
      setLoad(false);
    }
  };

  const getRol = (rol) => {
    const rolConfig = {
      0: {
        label: "Paciente",
        color: "bg-green-100 text-green-800 border border-green-200",
      },
      1: {
        label: "Administrador",
        color: "bg-red-100 text-red-800 border border-red-200",
      },
      2: {
        label: "Psicólogo",
        color: "bg-blue-100 text-blue-800 border border-blue-200",
      },
    };

    const config = rolConfig[rol] || {
      label: "Desconocido",
      color: "bg-gray-100 text-gray-800 border border-gray-200",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.label}
      </span>
    );
  };

  const getEstado = (activo) => {
    return activo ? (
      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
        Activo
      </span>
    ) : (
      <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
        Inactivo
      </span>
    );
  };

  const usuariosFiltrados = users
    .filter((u) =>
      `${u.nombre} ${u.apellidoPaterno} ${u.apellidoMaterno}`
        .toLowerCase()
        .includes(busqueda.toLowerCase())
    )
    .filter((u) => (rolFiltro === "" ? true : u.rol === Number(rolFiltro)));

  return (
    <div className="p-8 bg-base-200 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary">
            Gestión de Usuarios
          </h1>
          <p className="text-base-content/70 mt-2">
            Administra los usuarios de la plataforma
          </p>
        </div>
        <button
          onClick={() => {
            setUsuarioSeleccionado(null);
            setAbrirModal(true);
          }}
          className="btn btn-primary"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Nuevo Usuario
        </button>
      </div>

      <div className="card bg-base-100 shadow-md">
        <div className="card-body p-0">
          <div className="px-6 py-4 border-b border-base-300">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="form-control">
                  <div className="relative">
                    <input
                      value={busqueda}
                      onChange={(e) => setBusqueda(e.target.value)}
                      type="text"
                      placeholder="Buscar usuario..."
                      className="pl-10 pr-4 py-2 input input-bordered w-full max-w-xs"
                    />
                    <svg
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-base-content/70"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>

                <div className="form-control">
                  <select
                    value={rolFiltro}
                    onChange={(e) => setRolFiltro(e.target.value)}
                    className="select select-bordered"
                  >
                    <option value="">Todos los roles</option>
                    <option value="0">Paciente</option>
                    <option value="1">Administrador</option>
                    <option value="2">Psicólogo</option>
                  </select>
                </div>
              </div>

              <div className="text-sm text-base-content/70">
                {usuariosFiltrados.length} de {users.length} usuarios
              </div>
            </div>
          </div>

          {load ? (
            <div className="flex justify-center items-center py-12">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              {usuariosFiltrados.length > 0 ? (
                <table className="table">
                  <thead>
                    <tr className="bg-base-200">
                      <th className="text-base-content font-semibold">
                        Usuario
                      </th>
                      <th className="text-base-content font-semibold">
                        Correo
                      </th>
                      <th className="text-base-content font-semibold">Rol</th>
                      <th className="text-base-content font-semibold">
                        Estado
                      </th>
                      <th className="text-base-content font-semibold">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuariosFiltrados.map((u) => (
                      <tr key={u.id} className="hover:bg-base-200/50">
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar placeholder">
                              <div className="bg-primary text-primary-content rounded-full w-12 h-12 flex items-center justify-center">
                                <span className="text-sm font-bold">
                                  {u.nombre?.charAt(0)}
                                  {u.apellidoPaterno?.charAt(0)}
                                </span>
                              </div>
                            </div>
                            <div>
                              <div className="font-bold text-base-content">
                                {`${u.nombre} ${u.apellidoPaterno} ${
                                  u.apellidoMaterno || ""
                                }`}
                              </div>
                              <div className="text-sm text-base-content/70">
                                ID.{u.id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="text-base-content">{u.correo}</td>
                        <td>
                          <div className="flex justify-start">
                            {getRol(u.rol)}
                          </div>
                        </td>
                        <td>
                          <div className="flex justify-start">
                            {getEstado(u.activo)}
                          </div>
                        </td>
                        <td>
                          <div className="flex gap-2">
                            <button
                              className="btn btn-ghost btn-sm text-primary hover:bg-primary/10"
                              onClick={() => handleEdit(u)}
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
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                              Editar
                            </button>
                            <button
                              onClick={() => handleDelete(u.id)}
                              className="btn btn-ghost btn-sm text-error hover:bg-error/10"
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
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-12">
                  <div className="text-base-content/30 mb-4">
                    <svg
                      className="mx-auto h-16 w-16"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-base-content mb-1">
                    No se encontraron usuarios
                  </h3>
                  <p className="text-base-content/70 mb-4">
                    {busqueda || rolFiltro
                      ? "Prueba con otros filtros"
                      : "No hay usuarios en el sistema"}
                  </p>
                  {(busqueda || rolFiltro) && (
                    <button
                      onClick={() => {
                        setBusqueda("");
                        setRolFiltro("");
                      }}
                      className="btn btn-ghost btn-sm"
                    >
                      Limpiar filtros
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <ModalUser
        abrirModal={abrirModal}
        cerrarModal={() => setAbrirModal(false)}
        usuarioSeleccionado={usuarioSeleccionado}
        guardar={cargarUsuarios}
      />
    </div>
  );
};

export default UserForm;
