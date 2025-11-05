import { NavLink, useNavigate } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import axios from "axios";

export default function RegisterForm() {
  const navigate = useNavigate();

  // Estados locales para los campos
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [rol, setRol] = useState("Paciente");
  const [cargando, setCargando] = useState(false);

  // Función de registro
  const registrar = async () => {
    if (
      !nombre ||
      !apellidoPaterno ||
      !apellidoMaterno ||
      !correo ||
      !telefono ||
      !contrasena
    ) {
      alert("Por favor completa todos los campos.");
      return;
    }

    try {
      setCargando(true);
      // Petición al backend
      await axios.post("http://localhost:65276/api/Usuarios", {
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        correo,
        telefono,
        contrasena,
      });

      console.log(
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        correo,
        telefono,
        contrasena,
        rol
      );

      alert("Usuario registrado correctamente.");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.mensaje || "Error al registrar usuario.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="card card-xl card-border bg-base-100 shadow-sm w-full">
      <div className="card-body">
        <h2 className="card-title">
          Take Care <HeartIcon className="size-[1.5em]" /> - Registro
        </h2>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Nombre</legend>
          <input
            type="text"
            className="input"
            placeholder="Ingresa tu nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Apellido Paterno</legend>
          <input
            type="text"
            className="input"
            placeholder="Ingresa tu apellido paterno"
            value={apellidoPaterno}
            onChange={(e) => setApellidoPaterno(e.target.value)}
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Apellido Materno</legend>
          <input
            type="text"
            className="input"
            placeholder="Ingresa tu apellido materno"
            value={apellidoMaterno}
            onChange={(e) => setApellidoMaterno(e.target.value)}
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Correo</legend>
          <input
            type="email"
            className="input"
            placeholder="Ingresa tu correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Teléfono</legend>
          <input
            type="text"
            className="input"
            placeholder="Ingresa tu teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Contraseña</legend>
          <input
            type="password"
            className="input"
            placeholder="Crea tu clave"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Rol</legend>
          <select
            className="select w-full"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
          >
            <option value="Paciente">Paciente</option>
            <option value="Psicologo">Psicólogo</option>
          </select>
        </fieldset>

        <div className="card-actions">
          <button
            className="btn btn-secondary w-full"
            onClick={registrar}
            disabled={cargando}
          >
            {cargando ? "Registrando..." : "Crear Cuenta"}
          </button>
          <p className="text-sm text-gray-500 mt-2">
            ¿Ya tienes cuenta?{" "}
            <NavLink to="/" className="link">
              Inicia Sesión
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}
