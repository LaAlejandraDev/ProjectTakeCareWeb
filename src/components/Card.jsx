const string = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident quasi maxime doloremque, repudiandae illum iste consequatur voluptatibus, sunt pariatur eveniet rem voluptas iure in harum maiores obcaecati, molestias quo iusto!"

export default function Card({ // Componente de tarjeta genérica
  title = "title card",
  content = "card content",
  image = "",
  hasButton = false,
  chindren
}) {
  return (
    <>
      <div className="card w-96 bg-base-100 card-sm shadow-sm p-2">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold">{ title }</h2>
          <p>{ content }</p>
          <div>
            { chindren }
          </div>
        </div>
      </div>
    </>
  );
}
