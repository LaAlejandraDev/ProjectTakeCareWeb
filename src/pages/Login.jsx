import { ToastContainer } from "react-toastify";
import LoginForm from "../components/LoginForm";

export default function Login() { // Componente principal de la página de inicio de sesión
  return (
    <>
      <ToastContainer />
      <div className="w-screen h-screen flex flex-col items-center justify-center p-4">
        <LoginForm />
      </div>
    </>
  );
}
