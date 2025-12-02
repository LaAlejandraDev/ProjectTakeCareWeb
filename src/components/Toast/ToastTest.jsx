import { BellAlertIcon } from "@heroicons/react/16/solid";
import Avatar from "../Avatar";
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";

export default function ToastMessage({ closeToast, toastProps, message }) { // Componente para mostrar un mensaje de toast
  const hasTitle = message.title ? true : false
  const title = message.title ? message.title : "Nuevo Mensaje"
  const body = message.body ? message.body : message.mensaje
  return (
    <>
      <div className="w-full">
        <div className="w-full p-2 flex items-center gap-x-2">
          {
            hasTitle ? (<BellAlertIcon className="size-5" />) : (<ChatBubbleBottomCenterIcon className="size-5" />)
          }
          <p className="font-bold text-sm">{title}</p>
        </div>
        <div className="w-full p-2">
          <small className="font-bold">{body}</small>
        </div>
      </div>
    </>
  );
}
