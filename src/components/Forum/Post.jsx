import {
  ChatBubbleBottomCenterIcon,
  EyeIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";

import Avatar from "../Avatar";
import Badge from "../Badge";
import StylizerText from "../../helpers/StylizedText";

import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import CommentBox from "./CommentBox";

export default function Post({ // Componente para mostrar una publicación en el foro
  id,
  title,
  content,
  author,
  avatar,
  date,
  comments = 0,
  likes = 0,
  userRole,
  postType,
  expanded = false,
  actions = true,
}) {
  const navigate = useNavigate();

  const formattedTitle = title?.toUpperCase() ?? "";

  // --- Badge del tipo de publicación (Mensaje, Pregunta, etc)
  const badge = useMemo(() => ({
    type:
      postType === 0
        ? "badge-secondary badge-outline"
        : postType === 1
        ? "badge-info badge-outline"
        : "badge-neutral badge-outline",
    title: postType === 0 ? "Mensaje" : postType === 1 ? "Pregunta" : "General",
  }), [postType]);

  // --- Tipo de usuario
  const userType = useMemo(() => {
    if (userRole === 2) return "Psicólogo";
    if (userRole === 0) return "Paciente";
    return "Usuario";
  }, [userRole]);

  const viewPost = () => {
    navigate(`/index/forum/post/${id}`);
  };

  return (
    <div className="card w-full bg-base-100 shadow-sm my-2">
      <div className="card-body">

        {/* TÍTULO */}
        <h2 className="text-2xl font-bold text-indigo-950 cursor-pointer" onClick={viewPost}>
          {formattedTitle}
        </h2>

        {/* INFORMACIÓN DEL AUTOR */}
        <div className="my-3 flex gap-3 p-2 rounded shadow-sm items-center">
          <Avatar name={author} url={avatar} />

          <div>
            <p className="font-bold">{author}</p>
            <small className="text-gray-400">{date}</small>
          </div>

          <div className="ml-auto flex gap-2">
            <Badge text={badge.title} type={badge.type} />
            <Badge text={userType} type="badge-accent" />
          </div>
        </div>

        {/* CONTENIDO */}
        <StylizerText text={content} expanded={expanded} />

        {/* ACCIONES */}
        {actions && (
          !expanded ? (
            <div className="card-actions justify-end gap-x-8 mt-4">

              {/* LIKE BUTTON */}
              <div className="indicator">
                <button className="btn btn-outline" aria-label="Me gusta">
                  <HeartIcon className="size-[1.5em]" />
                  Like
                </button>
                {likes > 0 && (
                  <span className="indicator-item badge badge-sm badge-secondary">
                    {likes > 99 ? "99+" : likes}
                  </span>
                )}
              </div>

              {/* COMMENTS BUTTON */}
              <div className="indicator">
                <button className="btn btn-neutral" aria-label="Comentar">
                  <ChatBubbleBottomCenterIcon className="size-[1.5em]" />
                  Comentar
                </button>
                {comments > 0 && (
                  <span className="indicator-item badge badge-sm badge-info">
                    {comments > 99 ? "99+" : comments}
                  </span>
                )}
              </div>

              {/* VIEW POST */}
              <button className="btn btn-primary" onClick={viewPost} aria-label="Ver post completo">
                <EyeIcon className="size-[1.5em]" />
                Ver Post
              </button>
            </div>
          ) : (
            <CommentBox />
          )
        )}

      </div>
    </div>
  );
}
