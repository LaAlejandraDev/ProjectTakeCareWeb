import { useEffect, useState } from "react";
import { UserAPI } from "../api/user.api";

export default function EditProfile() {
  const [user, setUser] = useState({
    id: "",
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    correo: "",
    telefono: "",
    rol: "",
    activo: true,
    contrasena: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await UserAPI.getProfile();
        setUser(res.data);
      } catch (err) {
        setError("No se pudo cargar el perfil.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) return <div className="p-10 text-xl">Cargando perfil...</div>;
  if (error) return <div className="p-10 text-red-500 text-xl">{error}</div>;

  const handleSave = async () => {
    try {
      await UserAPI.updateProfile(user.id, user); // ✔ muy importante
      alert("Perfil actualizado correctamente");
    } catch (err) {
      console.error(err);
      alert("Error al guardar cambios");
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-base-200">
      <main className="flex-1 p-6 flex justify-center items-center">
        <div className="card w-full max-w-2xl bg-base-100 shadow-xl border border-base-300">
          <div className="card-body">
            <h2 className="card-title text-2xl font-bold text-primary mb-4">
              Editar Perfil
            </h2>

            <div className="flex items-center gap-4 mb-6">
              <div className="avatar">
                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <div className="w-full h-full bg-base-300 rounded-full" />
                </div>
              </div>

              <div>
                <label className="btn btn-outline btn-sm">
                  Cambiar foto
                  <input type="file" className="hidden" />
                </label>
              </div>
            </div>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Nombre</span>
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={user.nombre || ""}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Apellido Paterno</span>
                </label>
                <input
                  type="text"
                  name="apellidoPaterno"
                  value={user.apellidoPaterno || ""}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Apellido Materno</span>
                </label>
                <input
                  type="text"
                  name="apellidoMaterno"
                  value={user.apellidoMaterno || ""}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Correo</span>
                </label>
                <input
                  type="email"
                  name="correo"
                  value={user.correo || ""}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Teléfono</span>
                </label>
                <input
                  type="text"
                  name="telefono"
                  value={user.telefono || ""}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Nueva contraseña</span>
                </label>
                <input
                  type="password"
                  name="contrasena"
                  value={user.contrasena || ""}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Déjala vacía si no deseas cambiarla"
                />
              </div>
            </form>

            <div className="card-actions justify-end mt-2">
              <button className="btn btn-info">Ver planes</button>

              <button className="btn btn-primary" onClick={handleSave}>
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
