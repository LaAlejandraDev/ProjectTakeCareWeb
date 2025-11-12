import { NavLink, useNavigate } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import axios from "axios";

export default function RegisterForm() {
  const navigation = useNavigate();

  const nextPage = () => {
    navigation("/subscriptions");
  };
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
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Ingresa tu correo</legend>
            <input
              type="email"
              className="input w-full"
              placeholder="Ingresa tu correo"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Ingresa tu clave</legend>
            <input
              type="password"
              className="input w-full"
              placeholder="Ingresa tu clave"
            />
          </fieldset>
          <div classname="card-actions py-4">
            <button
              className="btn btn-secondary w-full"
              onClick={() => nextPage()}
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
