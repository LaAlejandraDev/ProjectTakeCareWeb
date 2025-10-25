export default function Badge({ text, type }) {
  return (
    <>
      <div className={type + " badge badge-soft badge-md"}>{ text }</div>
    </>
  )
}
