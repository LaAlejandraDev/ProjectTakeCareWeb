import Avatar from "../Avatar";

export default function PearsonList({ contactList }) {
  return (
    <>
      <ul className="list rounded shadow-md">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
          Lista de mensajes
        </li>
        <ListItem
          name={"Juan Pablo"}
          lastMessage={"La verdad no se que estoy haciendo jaja"}
        />
        <ListItem
          name={"Trokers"}
          lastMessage={
            "Ewe hablale al dobe, me metieron al bote por picarle el qlo al bebo, no se que mas poner en este mensaje, nomas ando calando que todo jale bien"
          }
        />
        <ListItem
          name={"Alejandra"}
          lastMessage={"Hola, podrias ayudarme con una duda que tengo?"}
        />
        <ListItem
          name={"DR. Robin"}
          lastMessage={
            "Hola, acerca de tu caso, el seguimiento va bastante bien, cada dia aprendes mas a como llevar tus emociones y controlar tu mente, sigue asi"
          }
        />
      </ul>
    </>
  );
}

function ListItem({ name, avatar, lastMessage }) {
  return (
    <>
      <li className="rounded-none list-row border-bottom hover:bg-base-300 cursor-pointer transition" onClick={() => alert("abriendo mensaje...")}>
        <div>
          <Avatar name={name} isComment={true} />
        </div>
        <div>
          <div className="font-bold">{name}</div>
          <p className="list-col-wrp text-xs line-clamp-1">{lastMessage}</p>
        </div>
      </li>
    </>
  );
}
