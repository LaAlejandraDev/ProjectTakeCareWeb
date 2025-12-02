import { useEffect, useState } from "react";
import { ForumAPI } from "../api/forum.api";
import { PostModel } from "../classes/Post";
import Post from "../components/Forum/Post";

export default function ForumAllPosts() {
  // Componente principal para mostrar todos los posts del foro
  const [allPost, setAllPost] = useState([]);

  async function getAllpost() {
    try {
      const response = await ForumAPI.getAllPost();
      if (response.status === 200) {
        const postInstances = response.data.map(
          (postData) => new PostModel(postData)
        );
        setAllPost(postInstances);
      }
    } catch (error) {
      console.error("Error obteniendo posts:", error);
    }
  }

  useEffect(() => {
    getAllpost();
  }, []);

  return (
    <>
      <div className="w-full h-full">
        {allPost.map((post, index) => (
          <Post
            key={post.id || index}
            id={post.id}
            title={post.titulo}
            author={`${post.usuario?.nombre || "Anónimo"} ${
              post.usuario?.apellidoPaterno || ""
            }`}
            avatar={post.usuario.fotoUrl}
            date={post.fecha.toLocaleDateString()}
            userRole={post.usuario?.rol}
            content={post.contenido}
            likes={post.likesCount}
            postType={post.tipo}
            comments={post.commentCount}
            userData={post.usuario}
          />
        ))}
      </div>
    </>
  );
}
