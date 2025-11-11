import Avatar from "../Avatar";
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";

export default function ToastMessage({ closeToast, toastProps }) {
  return (
    <>
      <div className="w-full">
        <div className="w-full p-2 flex items-center gap-x-2">
          <ChatBubbleBottomCenterIcon className="size-5" />
          <p className="font-bold text-sm"> Nuevo mensaje</p>
        </div>
        <div className="w-full p-2 shadow-sm rounded flex items-center justify-between border-bottom">
          <div className="grow-1 flex gap-x-2 items-center">
            <Avatar isComment={true} name="T" />
            <small className="font-bold">Trokers</small>
          </div>
          <small className="">Ahora</small>
        </div>
        <div className="w-full p-2">
          <small className="font-bold">Hola</small>
        </div>
      </div>
    </>
  );
}
