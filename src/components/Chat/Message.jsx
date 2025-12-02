export default function MessageComponent({ messageData, idPsycologist, date }) { // Componente para mostrar un mensaje individual
    const isOwner = messageData.senderId == idPsycologist ? true : false
    return (
        <>
            <div className={"chat " + (isOwner ? "chat-end" : "chat-start")}>
                <div className="chat-header">{"Fecha: " + date}</div>
                <div className={"chat-bubble " + (isOwner ? "chat-bubble-info" : "chat-bubble-secondary")}>{messageData.message}</div>
            </div>
        </>
    )
}
