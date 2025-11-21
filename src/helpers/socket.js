// helpers/socket.js
import { io } from "socket.io-client";

// Conexión al servidor Node.js
const socket = io("http://localhost:3001");

// Función para registrar el usuario logueado en el servidor Socket.IO
export const registerUser = (userId) => {
  socket.emit("register", userId);
};

// Función para enviar un mensaje
export const sendMessage = (messageData) => {
  // messageData = { IdChat, IdRemitenteUsuario, Mensaje, IdDestinatarioUsuario }
  socket.emit("send_message", messageData);
};

// Función para recibir mensajes en tiempo real
export const onReceiveMessage = (callback) => {
  socket.on("receive_message", callback);
};

export default socket;
