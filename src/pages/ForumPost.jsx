import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ForumAPI } from "../api/forum.api";
import Post from "../components/Forum/Post";
import Comment from "../components/Forum/Comment";

export default function ForumPost() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  async function loadPost() {
    try {
      const res = await ForumAPI.getPost(postId);
      if (res.status === 200) setPost(res.data);
    } catch {
      console.error("Error cargando post");
    }
  }

  async function loadComments() {
    try {
      const res = await ForumAPI.getCommentsByPost(postId);
      if (res.status === 200) setComments(res.data);
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
    <div className="animate__animated animate__fadeIn">
      <Post
        id={post.id}
        title={post.titulo}
        content={post.contenido}
        author={`${post.usuario?.nombre} ${post.usuario?.apellidoPaterno}`}
        avatar={post.usuario?.fotoUrl}
        date={new Date(post.fecha).toLocaleString()}
        userRole={post.usuario?.rol}
        likes={post.likesCount}
        comments={comments.length}
        postType={post.tipo}
        showComments={true}
        commentList={comments}
        reloadComments={loadComments}
      />
    </div>
  );
}
