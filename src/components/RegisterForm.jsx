import { NavLink } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/16/solid";

export default function RegisterForm() {
  return (
    <>
      <div className="card card-xl card-border bg-base-100 shadow-sm w-full">
        <div className="card-body">
          <h2 className="card-title">
            Take Care <HeartIcon className="size-[1.5em]" /> - Registro
          </h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">¿Cual es tu nombre?</legend>
            <input
              type="text"
              className="input"
              placeholder="Ingresa tu nombre"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Ingresa tu correo</legend>
            <input
              type="email"
              className="input"
              placeholder="Ingresa tu correo"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Ingresa tu clave</legend>
            <input
              type="password"
              className="input"
              placeholder="Ingresa tu clave"
            />
          </fieldset>
          <div classname="card-actions">
            <button className="btn btn-secondary w-full">Crear Cuenta</button>
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
