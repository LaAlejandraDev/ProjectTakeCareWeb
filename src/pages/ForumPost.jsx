import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ForumAPI } from "../api/forum.api";
import Post from "../components/Forum/Post";
import Comment from "../components/Forum/Comment";
import Avatar from "../components/Avatar";
import Badge from "../components/Badge";
import StylizerText from "../helpers/StylizedText";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

export default function ForumPost() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [listComments, setListComments] = useState([]);
  const [comment, setComment] = useState("");
  const { user } = useContext(AuthContext) 


  async function loadPost() {
    try {
      const res = await ForumAPI.getPost(postId);
      if (res.status === 200) setPost(res.data);
    } catch {
      console.error("Error cargando post");
    }
  }

  // Estado para guardar el texto del comentario

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
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al comentar");
    } finally {
      setLoading(false);
    }
  };
  
  async function loadComments() {
    try {
      const res = await ForumAPI.getCommentsByPost(postId);
      console.log(res)
      if (res.status === 200) setListComments(res.data);
    } catch {
      console.error("Error cargando comentarios");
    }
  }

  useEffect(() => {
    loadPost();
    loadComments();
  }, [postId]);

  if (!post) return <p>Cargando...</p>;

  return (
    <div className="animate__animated animate__fadeIn w-full flex justify-center">

      <div className="w-full md:w-3/4 lg:w-2/3 flex flex-col gap-y-6">

        {/* Card del Post */}
        <div className="card bg-base-100 shadow-sm rounded-xl p-4 flex flex-row gap-x-4">

          {/* Barra lateral */}
          <div className="flex flex-col items-center gap-y-2 px-2">

          </div>

          {/* Contenido del post */}
          <div className="flex-1">

            {/* Título */}
            <h2 className="text-3xl font-bold mb-2">{post.titulo}</h2>

            {/* Autor */}
            <div className="flex items-center gap-x-3 mb-4">
              <Avatar url={post.usuario?.fotoUrl} name={post.usuario?.nombre} />
              <span className="font-semibold">
                {`${post.usuario?.nombre} ${post.usuario?.apellidoPaterno}`}
              </span>
              <Badge text={post.usuario?.rol == 0 ? "Paciente" : "Psicólogo"} />
              <span className="text-gray-500 text-sm">
                · {new Date(post.fecha).toLocaleString()}
              </span>
            </div>

            {/* Texto del post */}

            <StylizerText 
              text={post.contenido}
              expanded={true}
            />

            {/* Stats del post */}
            <div className="flex gap-x-4 text-sm text-gray-500 my-2">
              <span className="badge badge-outline badge-primary">{listComments.length} comentarios</span>
              <span className="badge badge-soft badge-success">{post.tipo == 0 ? "Pregunta" : "Discusión"}</span>
            </div>
          </div>
        </div>

        {/* Sección de comentarios */}
        <div className="flex flex-col gap-y-4">
          <h3 className="text-xl font-bold">Comentarios</h3>

          <div className="flex flex-col gap-y-4">
            {listComments.map((c) => (
              <div key={c.id} className="card bg-base-200 rounded-xl">
                <Comment
                  id={c.id}
                  commentData={c}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Caja para escribir comentario */}
        <div className="card bg-base-100 shadow-sm rounded-xl p-4">
          <span className="font-bold mb-2">Agregar un comentario</span>
          <textarea
            className="textarea textarea-bordered w-full rounded-xl"
            placeholder="¿Qué opinas?"
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>

          <div className="flex justify-end mt-3">
            <button className="btn btn-primary rounded-xl" onClick={sendComment}>
              Comentar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
