export default function Avatar({ url = "", name = "D", isComment = false }) {
  // Garantiza que name SIEMPRE sea string
  const safeName = typeof name === "string" && name.length > 0 ? name : "D";

  const userChar = safeName.slice(0, 1).toUpperCase();

  const avatarSize = isComment ? "w-10 h-10" : "w-14 h-14";

  if (url == null) url = "";

  const textSize = isComment ? "text-sm" : "text-3xl";

  return (
    <div className={url === "" ? "avatar avatar-placeholder" : "avatar"}>
      <div className={"rounded-full bg-indigo-500 text-white " + avatarSize}>
        {url === "" ? (
          <span className={textSize}>{userChar}</span>
        ) : (
          <img src={url} />
        )}
      </div>
    </div>
  );
}
