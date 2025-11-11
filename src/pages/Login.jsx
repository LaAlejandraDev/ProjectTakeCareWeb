import { ToastContainer } from "react-toastify";
import LoginForm from "../components/LoginForm";

export default function Login() {
  return (
    <>
      <ToastContainer />
      <div className="w-screen h-screen flex flex-col items-center justify-center p-4">
        <LoginForm />
      </div>
    </>
  );
}
