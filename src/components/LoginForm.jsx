import { HeartIcon } from "@heroicons/react/16/solid";
import { NavLink, useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigation = useNavigate()

  const login = () => {
    navigation("/index")
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
            <input type="text" className="input w-full" placeholder="correo@ejemplo.com" />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Ingresa tu clave</legend>
            <input type="text" className="input w-full" placeholder="Ingresa la clave" />
          </fieldset>
          <div classname="card-actions">
            <button className="btn btn-primary w-full" onClick={() => login()}>Iniciar Sesion</button>
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
