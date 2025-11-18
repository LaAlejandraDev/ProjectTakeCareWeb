import React from "react";
import { HeartIcon } from "@heroicons/react/16/solid";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthAPI } from "../api/auth.api";
import { useState } from "react";
import { toast } from "react-toastify";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setUserPassword] = useState("");
  const navigation = useNavigate();

  async function handleLogin() {
    try {
      const response = await AuthAPI.login({
        correo: email,
        contrasena: password,
      });

      console.log(response);

      if (response.status === 200) {
        toast.success("Inicio de sesión exitoso. ¡Bienvenido de nuevo!");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("rol", response.data.usuario.rol);
        setTimeout(() => {
          navigation("/index/forum");
        }, 1500);
      } else {
        toast.error(
          "Correo o contraseña incorrectos. Verifica tus datos e inténtalo de nuevo."
        );
      }
    } catch (error) {
      toast.error("Ocurrió un error inesperado. Intenta nuevamente más tarde.");
    }
  }
  return (
    <>
      <div className="card card-xl card-border bg-base-100 shadow-sm w-full md:w-1/3">
        <div className="card-body">
          <h2 className="card-title">
            Take Care <HeartIcon className="size-[1.5em]" /> - Iniciar Sesion
          </h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Ingresa tu correo</legend>
            <input
              type="text"
              className="input w-full"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Ingresa tu clave</legend>
            <input
              type="text"
              className="input w-full"
              placeholder="Ingresa la clave"
              value={password}
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </fieldset>
          <div className="card-actions">
            <button
              className="btn btn-primary w-full"
              onClick={() => handleLogin()}
            >
              Iniciar Sesion
            </button>
            <p className="text-sm text-gray-500 mt-2">
              ¿No tienes cuenta?{" "}
              <NavLink to="/register" className="link">
                Registrate
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
