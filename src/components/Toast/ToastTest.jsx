import { TvIcon } from "@heroicons/react/24/solid";
import Avatar from "../Avatar";

export default function ToastMessage({ closeToast, toastProps }) {
  return (
    <>
      <div className="w-full">
        <div className="w-full p-2 flex items-center gap-x-2">
          <TvIcon className="size-5" />
          <p className="font-bold text-sm"> Nuevo mensaje</p>
        </div>
        <div className="w-full p-2 shadow-sm rounded flex items-center gap-x-2 border-bottom">
          <Avatar
            isComment={true}
            name="T"
          />
          <small className="font-bold">Trokers</small>
        </div>
        <div className="w-full pt-2">
          
        </div>
      </div>
    </>
  );
}
