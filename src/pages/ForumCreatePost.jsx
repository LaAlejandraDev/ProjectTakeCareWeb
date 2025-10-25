import { useState } from "react";
import Post from "../components/Forum/Post";
import { samplePosts } from "../data/Post";

export default function CreatePost() {
  const post = samplePosts[0];

  const [title, setTitle] = useState("Titulo");
  const [content, setContent] = useState("Contenido de ejemplo");

  return (
    <div className="w-full bg-base-100 p-4 shadow-sm rounded-xl">
      <h2 className="text-xl font-bold">Crea una publicación</h2>
      <p className="text-gray-400 text-sm">
        Comparte tus ideas con la comunidad. Escribe el contenido que deseas
        publicar y añade detalles adicionales para que otros usuarios comprendan
        mejor tu mensaje.
      </p>
      <div className="flex p-5 gap-5">
        <div className="w-1/2">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Tipos de publicación</legend>
            <select defaultValue="Selecciona un tipo" className="select w-full rounded-xl">
              <option disabled={true}>Selecciona un tipo</option>
              <option>Chrome</option>
              <option>FireFox</option>
              <option>Safari</option>
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
