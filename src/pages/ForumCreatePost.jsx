import { useContext, useState } from "react";
import Post from "../components/Forum/Post";
import { samplePosts } from "../data/Post";
import { AuthContext } from "../context/AuthContext";
import { ForumAPI } from "../api/forum.api";
import { toast } from "react-toastify";

export default function CreatePost() {
  const { user } = useContext(AuthContext)
  const post = samplePosts[0];
  const [title, setTitle] = useState("Titulo");
  const [content, setContent] = useState("Contenido de ejemplo");
  const [postType, setPostType] = useState(0)

  async function createNewPost() {
    const userId = user.id
    let newPost = {
        "titulo": title,
        "contenido": content,
        "tipo": postType,
        "idUsuario": userId,
        "anonimo": true,
        "likesCount": 0,
        "commentCount": 0
    }

    console.log(newPost)

    try {
      const response = await ForumAPI.createNewPost(newPost)
      console.log(response)
      if (response.status === 201) {
        toast.success("Se creo la publicacion con exito")
      } else {
        toast.error("Error al crear la publicacion, intentalo mas tarde")
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="w-full p-4">
      <h2 className="text-3xl font-bold">Crea una publicación</h2>
      <p className="text-gray-500 text-md">
        Comparte tus ideas con la comunidad. Escribe el contenido que deseas
        publicar y añade detalles adicionales para que otros usuarios comprendan
        mejor tu mensaje.
      </p>
      <div className="flex p-5 gap-5 bg-base-100 my-4 rounded-xl shadow-sm">
        <div className="w-1/2">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Tipos de publicación</legend>
            <select defaultValue="Selecciona un tipo" className="select w-full rounded-xl" value={ postType } onChange={(e) => setPostType(Number(e.target.value))}>
              <option disabled={true}>Selecciona un tipo</option>
              <option value={0}>Pregunta</option>
              <option value={1}>Discusion</option>
              <option value={2}>Anuncio</option>
              <option value={3}>Guia</option>
              <option value={4}>Retroalimentacion</option>
            </select>
            <span className="label">Escoje el tipo de publicación</span>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">
              Titulo de la publicación
            </legend>
            <input
              className="input w-full rounded-xl"
              placeholder="Escribe aqui..."
              onChange={(e) => setTitle(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">
              Contenido de la publicación
            </legend>
            <textarea
              className="textarea w-full rounded-xl h-50"
              placeholder="Escribe aqui tu publicación"
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </fieldset>
          <button className="btn btn-primary w-full" type="submit" onClick={createNewPost}>Crear Publicación</button>
        </div>
        <Post
          id={post.id}
          title={title}
          author={post.author}
          avatar={post.avatar}
          date={post.date}
          userRole={post.userRole}
          content={content}
          likes={post.likes}
          postType={post.postType}
          comments={post.comments}
          actions={false}
          expanded={true}
        />
      </div>
    </div>
  );
}
