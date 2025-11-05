export default function MessageComponent({ user = "", message = "", owner }) {
    return (
        <>
            <div className={"chat " + (owner ? "chat-end" : "chat-start")}>
                <div className="chat-header">{user}</div>
                <div className="chat-bubble">{message}</div>
            </div>
        </>
    )
}