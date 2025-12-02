import Comment from "./Comment";

export default function CommentBox() { // Componente para mostrar una caja de comentarios con varios comentarios
  return (
    <>
      <div className="divider"></div>
      <div className="w-full flex flex-col gap-5">
        <Comment
          name={"Trokers"}
          date={"2024-06-15"}
          content={"¡Excelente publicación! Me ha sido de gran ayuda."}
        />
        <Comment
          name={"Robert"}
          date={"2024-06-15"}
          content={"Gracias por compartir esta información tan valiosa."}
        />
        <Comment
          name={"MARV"}
          date={"2024-06-15"}
          content={
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          }
        />
      </div>
    </>
  );
}
