import { NavLink, useNavigate } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { AuthAPI } from "../api/auth.api";
import { toast } from "react-toastify";

export default function RegisterForm() { // Componente de formulario de registro
  const navigation = useNavigate();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");

  async function handleRegister(e) {
    e.preventDefault()
    try {
      const response = await AuthAPI.register({
        nombre: nombre,
        correo: email,
        contrasena: contrasena,
      });

      const usuario = response.data.usuario;
      const token = response.data.token;

      if (usuario && token) {
        localStorage.setItem("token", token);
        localStorage.setItem("usuario", JSON.stringify(usuario));
        localStorage.setItem("rol", usuario.rol);

        if (response.data.idPsicologo) {
          localStorage.setItem("idPsicologo", response.data.idPsicologo);
        }
      }

      toast.success("Cuenta creada correctamente.");
      navigation("/subscriptions");
    } catch (error) {
      toast.error("Ocurrió un error inesperado. Intenta nuevamente más tarde.");
      console.error(error);
    }
  }
  return (
    <>
      <div className="card card-xl card-border bg-base-100 shadow-sm w-full md:w-1/3">
        <div className="card-body">
          <h2 className="card-title">
            Take Care <HeartIcon className="size-[1.5em]" /> - Registro
          </h2>
          <form>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">¿Cual es tu nombre?</legend>
              <input
                type="text"
                className="input w-full"
                placeholder="Ingresa tu nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Ingresa tu correo</legend>
              <input
                type="email"
                className="input w-full"
                placeholder="Ingresa tu correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Ingresa tu clave</legend>
              <input
                type="password"
                className="input w-full"
                placeholder="Ingresa tu clave"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
              />
            </fieldset>
            <div className="card-actions py-4">
              <button
                type="submit"
                className="btn btn-secondary w-full"
                onClick={(e) => handleRegister(e)}
              >
                Crear Cuenta
              </button>
              <p className="text-sm text-gray-500 mt-2">
                ¿Ya tienes cuenta?{" "}
                <NavLink to="/" className="link">
                  Inicia Sesion
                </NavLink>
              </p>
            </div>
          </form>
        </div>
      </div >
    </>
  );
}
