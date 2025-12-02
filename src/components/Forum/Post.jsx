import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChatBubbleBottomCenterIcon,
  EyeIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";

import Avatar from "../Avatar";
import Badge from "../Badge";
import CommentBox from "./CommentBox";
import Comment from "./Comment";
import { ForumAPI } from "../../api/forum.api";
import { toast } from "react-toastify";
import StylizerText from "../../helpers/StylizedText";

export default function Post({
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

  showComments = false,
  commentList = [],
  reloadComments,
}) {
  const navigate = useNavigate();

  const [localLikes, setLocalLikes] = useState(likes);
  const [showModal, setShowModal] = useState(false);

  const formattedTitle = title?.toUpperCase() ?? "";

  const badge = useMemo(
    () => ({
      type:
        postType === 0
          ? "badge-secondary badge-outline"
          : postType === 1
          ? "badge-info badge-outline"
          : "badge-neutral badge-outline",
      title:
        postType === 0 ? "Mensaje" : postType === 1 ? "Pregunta" : "General",
    }),
    [postType]
  );

  const userType = useMemo(() => {
    if (userRole === 2) return "Psicólogo";
    if (userRole === 0) return "Paciente";
    return "Usuario";
  }, [userRole]);

  const viewPost = () => navigate(`/index/forum/post/${id}`);

  const handleLike = async () => {
    try {
      const response = await ForumAPI.likePost(id);

      if (response.status === 200) {
        setLocalLikes((prev) => prev + 1);
      }
    } catch {
      toast.error("No se pudo dar like.");
    }
  };

  return (
    <div className="card w-full bg-base-100 shadow-sm my-2">
      <div className="card-body">
        <h2
          className="text-2xl font-bold text-indigo-950 cursor-pointer"
          onClick={viewPost}
        >
          {formattedTitle}
        </h2>

        <div className="my-3 flex gap-3 p-2 rounded shadow-sm items-center">
          <Avatar name={author} url={avatar || ""} />

          <div>
            <p className="font-bold">{author}</p>
            <small className="text-gray-400">{date}</small>
          </div>

          <div className="ml-auto flex gap-2">
            <Badge text={badge.title} type={badge.type} />
            <Badge text={userType} type="badge-accent" />
          </div>
        </div>

        <StylizerText text={content ?? ""} />

        <div className="card-actions justify-end gap-x-4 mt-4">
          <div className="indicator">
            <button className="btn btn-outline" onClick={handleLike}>
              <HeartIcon className="size-[1.5em]" />
              Like
            </button>

            {localLikes > 0 && (
              <span className="indicator-item badge badge-sm badge-secondary">
                {localLikes > 99 ? "99+" : localLikes}
              </span>
            )}
          </div>

          <div className="indicator">
            <button
              className="btn btn-neutral flex items-center gap-1"
              onClick={() => setShowModal(true)}
            >
              <ChatBubbleBottomCenterIcon className="size-[1.5em]" />
              Comentar
            </button>

            {comments > 0 && (
              <span className="indicator-item badge badge-sm badge-info">
                {comments > 99 ? "99+" : comments}
              </span>
            )}
          </div>

          <button className="btn btn-primary" onClick={viewPost}>
            <EyeIcon className="size-[1.5em]" />
            Ver Post
          </button>
        </div>

        {showModal && (
          <div className="modal modal-open">
            <div className="modal-box relative">
              <button
                className="btn btn-sm btn-circle absolute right-2 top-2"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>

              <h3 className="text-lg font-bold mb-2">Agregar comentario</h3>

              <CommentBox
                postId={id}
                onSuccess={() => {
                  setShowModal(false);
                  if (reloadComments) reloadComments();
                }}
              />
            </div>
          </div>
        )}

        {showComments && (
          <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-bold mb-3">Comentarios</h3>

            {commentList.length === 0 && (
              <p className="text-gray-500">Aún no hay comentarios.</p>
            )}

            <div className="flex flex-col gap-4">
              {commentList.map((c) => (
                <Comment
                  key={c.id}
                  name={`${c.usuario?.nombre} ${c.usuario?.apellidoPaterno}`}
                  image={c.usuario?.fotoUrl}
                  date={new Date(c.fecha).toLocaleString()}
                  content={c.contenido}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
