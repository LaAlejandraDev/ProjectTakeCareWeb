import { useEffect, useState } from "react";
import Post from "../components/Forum/Post";
import { samplePosts } from "../data/Post";

export default function CreatePost() {
  const post = samplePosts[0];

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  useEffect(() => {
    setContent(post.content);
    setTitle(post.title);
  }, []);

  const newPost = (e) => {
    e.preventDefault() // Evitamos la recarga de la pagina
    const response = sendNewPost()
    alert(response)
  }

  function sendNewPost() {
    return true
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
          <form method="post">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Tipos de publicación</legend>
              <select
                defaultValue="Selecciona un tipo"
                className="select w-full rounded-xl"
              >
                <option disabled={true}>Selecciona un tipo</option>
                <option value={0}>Pregunta</option>
                <option value={1}>Discusion</option>
                <option value={2}>Anuncio</option>
                <option value={3}>Guia</option>
                <option value={4}>Retroalimentación</option>
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
                value={title}
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
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </fieldset>
            <button className="btn btn-primary my-2 w-full" type="submit" onClick={(e) => newPost(e)}>
              Crear Publicación
            </button>
          </form>
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
