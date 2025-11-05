import React from "react";
import { HeartIcon } from "@heroicons/react/16/solid";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function LoginForm() {
  const navigate = useNavigate();

  //estados para los inputs
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [cargando, setCargando] = useState(false);

  //funcion de logeo
  const login = async () => {
    if (!correo || !contrasena) {
      alert("por favor ingresa tu correo y contraseña");
      return;
    }

    try {
      setCargando(true);
      //peticion al backend
      const response = await axios.post(
        "http://localhost:65276/api/LoginSesion",
        {
          correo,
          contrasena,
        }
      );

      //guardamos el tojen y los usuarios
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("usuario", JSON.stringify(response.data.usuario));

      const rol = response.data.usuario.rol;

      //hacemos la redireccion dependiendo del rol
      if (rol === "Psicologo") navigate("/index/chats");
      else if (rol === "Paciente") navigate("/index/forum");
      else navigate("/index");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.mensaje || "Error al iniciar sesión");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="card card-xl card-border bg-base-100 shadow-sm w-full">
      <div className="card-body">
        <h2>
          {" "}
          Take care{" "}
          <HeartIcon className="size-[1.5em]">- Iniciar Sesión</HeartIcon>
        </h2>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Ingresa tu correo</legend>
          <input
            type="email"
            className="input w-full"
            placeholder="correo@ejemplo.com"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Ingresa tu clave</legend>
          <input
            type="password"
            className="input w-full"
            placeholder="Ingresa la clave"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
        </fieldset>

        <div className="card-actions">
          <button
            className="btn btn-primary w-full"
            onClick={login}
            disabled={cargando}
          >
            {cargando ? "Ingresando..." : "Iniciar Sesión"}
          </button>
          <p className="text-sm text-gray-500 mt-2">
            ¿No tienes cuenta?{" "}
            <NavLink to="/register" className="link">
              Regístrate
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}
