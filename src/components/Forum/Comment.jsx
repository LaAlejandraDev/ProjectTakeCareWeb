import { useState } from "react";
import StylizerText from "../../helpers/StylizedText";
import Avatar from "../Avatar";

export default function Comment({ name, image, date, content }) { // Componente para mostrar un comentario individual
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <div onClick={() => setExpanded(!expanded)}>
        <div className="w-full flex gap-2 items-center justify-start">
          <Avatar name={name} isComment={true} url={image}/>
          <p className="font-bold text-indigo-500">{name}</p>
          <div>
            <small className="text-gray-400">{date}</small>
          </div>
        </div>
        <div className="w-full pl-10">
          <StylizerText text={content} isComment={true} expanded={expanded} />
        </div>
      </div>
    </>
  );
}
