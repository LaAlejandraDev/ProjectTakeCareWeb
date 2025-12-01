// Crea un avatar en base a su nombre, toma la primera letra y la convierte en mayuscula
export default function Avatar({ url = "", name = "D", isComment = false }) {
  const userChar = name.slice(0, 1).toUpperCase();
  // le da un tamaño al avatar
  const avatarSize = isComment ? "w-10 h-10" : "w-14 h-14";
  //le da un tamaño a la letra antes sacada
  const textSize = isComment ? "text-small" : "text-3xl";
  return (
    <>
      <div className={url == "" ? "avatar avatar-placeholder" : "avatar"}>
        <div className={"rounded-full bg-indigo-500 text-white " + avatarSize}>
          {url == "" ? (
            <span className={textSize}>{userChar}</span>
          ) : (
            <img src={url} />
          )}
        </div>
      </div>
    </>
  );
}
