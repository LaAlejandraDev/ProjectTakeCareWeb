import Avatar from "../Avatar";
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";

export default function ToastMessage({ closeToast, toastProps, message }) {
  console.log(message)
  return (
    <>
      <div className="w-full">
        <div className="w-full p-2 flex items-center gap-x-2">
          <ChatBubbleBottomCenterIcon className="size-5" />
          <p className="font-bold text-sm">Nuevo mensaje</p>
        </div>
        <div className="w-full p-2">
          <small className="font-bold">{message.mensaje}</small>
        </div>
      </div>
    </>
  );
}
