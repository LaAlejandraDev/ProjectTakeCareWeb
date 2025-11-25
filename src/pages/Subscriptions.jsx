import { useNavigate } from "react-router-dom";
import PriceCard from "../components/Price/PriceCards";
import { PsicologoAPI } from "../api/psicologo.api";
import { toast, ToastContainer } from "react-toastify";
export default function SubscriptionsPage() {
  const navigation = useNavigate();
  const onSubscribe = async (plan) => {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(atob(token.split(".")[1]));
      const idUsuario = user.idUsuario;

      const { data } = await PsicologoAPI.getPsicologoByUsuario(idUsuario);
      const idPsicologo = data.id;

      await PsicologoAPI.suscribirse(idPsicologo, plan);

      toast.success(
        "Solicitud enviada. Tu cuenta está en revisión por el administrador."
      );

      setTimeout(() => {
        navigation("/index");
      }, 1500);
    } catch (error) {
      toast.error("No se pudo procesar la suscripción");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="w-full h-screen flex items-center justify-center gap-x-3">
        <PriceCard name={"Gratis"} cost={0} onSubscribe={onSubscribe}>
          <li>Gestión básica de pacientes</li>
          <li>Mensajeria basica</li>
          <li>
            Límite de <b>5 clientes activos</b>
          </li>
          <li>Registro de sesiones y notas simples</li>
          <li>Acceso a la comunidad</li>
          <li className="line-through">Asistencia por IA</li>
        </PriceCard>

        <PriceCard name={"Premium"} cost={1999} onSubscribe={onSubscribe}>
          <li>Gestión avanzada de pacientes</li>
          <li>
            Hasta <b>50 clientes activos</b>
          </li>
          <li>Panel administrativo avanzado</li>
          <li>Personalización del perfil profesional</li>
          <li>Notificaciones ilimitadas</li>
          <li>
            <b>Asistencia por IA</b>
          </li>
        </PriceCard>
      </div>
    </>
  );
}
