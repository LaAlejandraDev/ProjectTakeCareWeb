import { useState } from "react";
import StylizerText from "../../helpers/StylizedText";
import Avatar from "../Avatar";

export default function Comment({ commentData }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="w-full">

      {/* Contenedor estilo Reddit */}
      <div className="flex gap-4">

        {/* Línea vertical estilo hilo */}
        <div className="border-l-2 border-base-300 ml-4"></div>

        {/* Card de comentario */}
        <div
          className="flex-1 bg-base-100 rounded-xl shadow-sm p-4 hover:bg-base-200 transition cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >

          {/* Header del comentario */}
          <div className="flex items-center gap-3 mb-2">
            <Avatar
              name={commentData.usuario?.nombre}
              isComment={true}
              url={commentData.usuario?.fotoUrl}
            />

            <p className="font-semibold text-primary">
              {`${commentData.usuario?.nombre} ${commentData.usuario?.apellidoPaterno} ${commentData.usuario?.apellidoMaterno}`}
            </p>

            <span className="text-xs text-gray-400">
              {new Date(commentData.fecha).toLocaleString()}
            </span>
          </div>

          {/* Contenido */}
          <div className="pl-1">
            <StylizerText
              text={commentData.contenido}
              isComment={true}
              expanded={expanded}
            />
          </div>

        </div>
      </div>
    </div>
  );
}