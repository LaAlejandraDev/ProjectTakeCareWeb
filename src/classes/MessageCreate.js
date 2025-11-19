export class MessageCreateClass { // Modelo para enviar mensajes
    constructor(
        idChat = 0,
        idRemitenteUsuario = 0,
        mensaje = "",
        leido = false
    ) {
        this.idChat = idChat
        this.idRemitenteUsuario = idRemitenteUsuario
        this.mensaje = mensaje
        this.leido = leido
    }
}

export class MessageDeseralizerClass { // Modelo para deserealizar los mensajes entrantes de SignalR
    constructor(
        chatId = 0,
        senderId = 0,
        message = "",
        isRead = false,
        date = ""
    ) {
        this.chatId = chatId
        this.senderId = senderId
        this.message = message
        this.isRead = isRead
        this.date = date
    }
}

export class MessageDataClass { // Modelo para obtener los mensajes
    constructor(
        id = 0,
        chatId = 0,
        senderId = 0,
        message = "",
        readed = false,
        date = ""
    ) {
        this.id = id
        this.chatId = chatId
        this.senderId = senderId
        this.message = message
        this.readed = readed
        this.date = date
    }
}