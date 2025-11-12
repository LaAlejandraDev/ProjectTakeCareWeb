import { NavLink, useNavigate } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { AuthAPI } from "../api/auth.api";
import { toast } from "react-toastify";

export default function RegisterForm() {
  const navigation = useNavigate();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");

  async function handleRegister() {
    try {
      const response = await AuthAPI.register({
        nombre: nombre,
        correo: email,
        contrasena: contrasena,
      });
      toast.success("Cuenta creada");
      navigation("/subscriptions");
      console.log(response);
    } catch (error) {
      toast.error("Ocurrió un error inesperado. Intenta nuevamente más tarde.");
    }
  }

  /* const nextPage = () => {
    navigation("/subscriptions");
  }; */
  return (
    <>
      <div className="card card-xl card-border bg-base-100 shadow-sm w-full md:w-1/3">
        <div className="card-body">
          <h2 className="card-title">
            Take Care <HeartIcon className="size-[1.5em]" /> - Registro
          </h2>
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
          <div classname="card-actions py-4">
            <button
              className="btn btn-secondary w-full"
              onClick={() => handleRegister()}
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
        </div>
      </div>
    </>
  );
}
