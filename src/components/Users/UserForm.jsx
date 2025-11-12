import React, { useEffect, useState } from "react";
import { UserAPI } from "../../api/user.api";
import { toast } from "react-toastify";

const UserForm = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await UserAPI.getUsers();
      setUsers(res.data);
    } catch (error) {
      toast.error("Error al cargar los usuarios");
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestión de Usuarios</h1>
      <table className="table w-full">
        <thead>
          <tr className="bg-gray-100">
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{`${u.nombre} ${u.apellidoPaterno} ${
                u.apellidoMaterno || ""
              }`}</td>
              <td>{u.correo}</td>
              <td>
                {u.rol === 1
                  ? "Administrador"
                  : u.rol === 2
                  ? "Psicólogo"
                  : "Paciente"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserForm;
