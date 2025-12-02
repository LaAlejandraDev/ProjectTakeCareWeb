import { useContext, useState } from "react";
import { ForumAPI } from "../../api/forum.api";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

// Este componente se encarga de enviar comentarios a un post
export default function CommentBox({ postId, onSuccess }) {
  const { user } = useContext(AuthContext) 
  // Estado para guardar el texto del comentario
  const [comment, setComment] = useState("");

  // Estado para mostrar botón cargando
  const [loading, setLoading] = useState(false);

  // Función que envía el comentario al backend
  const sendComment = async () => {
    if (!comment.trim()) {
      toast.error("El comentario no puede estar vacío");
      return;
    }

    if (comment.length < 25) {
      toast.error("El comentario debe tener al menos 25 caracteres");
      return;
    }

    try {
      setLoading(true); // Activa estado de carga

      const payload = {
        idPost: postId, // ID del post donde se comenta
        idUsuario: user.id,
        contenido: comment, // Texto del comentario
        anonimo: false,
      };

      // Llamada HTTP a la API
      const response = await ForumAPI.addComment(payload);

      // Si el backend dijo OK
      if (response.status === 200 || response.status === 201) {
        toast.success("Comentario agregado");

        setComment("");

        if (onSuccess) onSuccess();
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al comentar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <textarea
        className="textarea textarea-bordered w-full"
        rows={4}
        placeholder="Escribe tu comentario..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button
        className="btn btn-primary"
        onClick={sendComment}
        disabled={loading}
      >
        {loading ? "Enviando..." : "Comentar"}
      </button>
    </div>
  );
}
