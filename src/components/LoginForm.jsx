import React from "react";
import { HeartIcon } from "@heroicons/react/16/solid";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthAPI } from "../api/auth.api";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
// Importa las funciones del helper
import { getLocalUser, saveLocalUser } from "../helpers/auth";

export default function LoginForm() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setUserPassword] = useState("");
  const navigation = useNavigate();

  async function handleLogin(e) {
    if (e) e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      toast.warning("No se pueden dejar los campos vacios");
      return;
    }

    let response; // Se declara response aquí para que sea accesible fuera del try
    try {
      response = await AuthAPI.login({
        correo: email,
        contrasena: password,
      });

      // La llamada a getLocalUser aquí es solo para debug antes del guardado
      // const localUser = getLocalUser();
      // console.log("Usuario actual en local storage (antes de guardar):", localUser);

      if (response.status === 200) {
        toast.success("Inicio de sesión exitoso");

        // 1. Llama a la función del contexto para actualizar el estado global
        login(response.data.usuario, response.data.token);

        // 2. Guarda los datos localmente SÓLO si el login fue exitoso (status 200)
        // Usamos 'usuario' y 'token' que vienen en la respuesta
        saveLocalUser(response.data.usuario, response.data.token);
        console.log("Datos guardados exitosamente:", getLocalUser());

        setTimeout(() => {
          navigation("/index/forum");
        }, 1500);
      } else {
        // Esto solo se ejecuta si la API devuelve un status diferente de 200 pero sin lanzar error
        toast.error("Correo o contraseña incorrectos");
      }
    } catch (error) {
      console.error(error);

      if (error.response) {
        if (error.response.status === 401) {
          toast.error("Credenciales inválidas");
        } else if (error.response.status === 404) {
          toast.error("Usuario no encontrado");
        } else {
          toast.error("Error en el servidor. Intenta mas tarde");
        }
      } else if (error.request) {
        toast.error("No hay conexión con el servidor.");
      } else {
        toast.error("Ocurrió un error inesperado.");
      }

      // Quité las líneas `saveLocalUser` y `console.log(getLocalUser())`
      // que estaban mal ubicadas al final de la función.
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
