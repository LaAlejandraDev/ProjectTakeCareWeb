export default function Badge({ text, type }) { // Componete de badge para mostrar etiquetas con diferentes estilos según el tipo
  return (
    <>
      <div className={type + " badge badge-soft badge-md"}>{ text }</div>
    </>
  )
}
