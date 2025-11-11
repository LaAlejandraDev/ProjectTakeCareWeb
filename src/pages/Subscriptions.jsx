import { useNavigate } from "react-router-dom";
import PriceCard from "../components/Price/PriceCards";
import { toast } from "react-toastify";
export default function SubscriptionsPage() {
  const navigation = useNavigate()
  const onSubscribe = () => {
    navigation("/index")
    toast.success("Te has suscrito exitosamente!")
  }
  return (
    <>
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
          <li><b>Asistencia por IA</b></li>
        </PriceCard>
      </div>
    </>
  );
}
