import { ToastContainer } from "react-toastify";
import RegisterForm from "../../components/RegisterForm";

export default function Register() { // Componente de registro
  return (
    <>
      <ToastContainer />
      <div className="w-screen h-screen flex flex-col items-center justify-center p-4">
        <RegisterForm />
      </div>
    </>
  );
}
