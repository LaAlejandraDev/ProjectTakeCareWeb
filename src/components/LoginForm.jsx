import React from "react";
import { HeartIcon } from "@heroicons/react/16/solid";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthAPI } from "../api/auth.api";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

export default function LoginForm() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setUserPassword] = useState("");
  const navigation = useNavigate();

  async function handleLogin(e) {
    if (e) e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      toast.warning("No se pueden dejar los campos vacíos");
      return;
    }

    try {
      const response = await AuthAPI.login({
        correo: email,
        contrasena: password,
      });

      if (response.status === 200) {
        const { usuario, token, estatusPsicologo } = response.data;
        const rol = response.data.usuario.rol;
        localStorage.setItem("rol", response.data.usuario.rol);
        localStorage.setItem("token", token);

        login(usuario, token);
        if (rol === 1) {
          toast.success(`Bienvenido, ${usuario.nombre}`);
          setTimeout(() => {
            navigation("/admin/users");
          }, 1500);
        } else if (rol === 2) {
          if (estatusPsicologo === "Aprobado") {
            toast.success("Inicio de sesión exitoso. ¡Bienvenido!");
            setTimeout(() => {
              navigation("/index/forum");
            }, 1500);
          } else if (estatusPsicologo === "Pendiente") {
            toast.info(
              "Tu solicitud de suscripción está pendiente de aprobación."
            );
          } else if (estatusPsicologo === "Rechazado") {
            toast.error(
              "Tu solicitud de suscripción fue rechazada. Contacta al administrador."
            );
          } else {
            toast.warning("No se pudo determinar el estatus de tu cuenta.");
          }
        } else {
          toast.success("Inicio de sesión exitoso. ¡Bienvenido!");
          setTimeout(() => {
            navigation("/index/forum");
          }, 1500);
        }
      } else {
        toast.error("Correo o contraseña incorrectos. Verifica tus datos.");
      }
    } catch (error) {
      toast.error("Ocurrió un error inesperado. Intenta de nuevo más tarde.");
      console.error(error);
    }
  }
  return (
    <div className="card card-xl card-border bg-base-100 shadow-sm w-full md:w-1/3">
      <div className="card-body">
        <h2 className="card-title">
          Take Care <HeartIcon className="size-[1.5em]" /> - Iniciar Sesión
        </h2>

        <form onSubmit={handleLogin}>
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

          <fieldset className="fieldset mt-2">
            <legend className="fieldset-legend">Ingresa tu clave</legend>
            <input
              type="password"
              className="input w-full"
              placeholder="Ingresa la clave"
              value={password}
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </fieldset>

          <div className="card-actions mt-4">
            <button className="btn btn-primary w-full" type="submit">
              Iniciar Sesión
              <kbd className="kbd kbd-sm bg-indigo-500">Enter</kbd>
            </button>

            <p className="text-sm text-gray-500 mt-2">
              ¿No tienes cuenta?{" "}
              <NavLink to="/register" className="link">
                Regístrate
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
