import { UsuarioModel } from "./User";

export class PostModel { // Modelo para generar una publicación
  constructor({
    id = 0,
    titulo = "",
    contenido = "",
    fecha = new Date().toISOString(),
    tipo = 0,
    idUsuario = 0,
    usuario = {},
    anonimo = false,
    likesCount = 0,
    commentCount = 0
  } = {}) {
    this.id = id;
    this.titulo = titulo;
    this.contenido = contenido;
    this.fecha = new Date(fecha);
    this.tipo = tipo;
    this.idUsuario = idUsuario;
    this.usuario = usuario ? new UsuarioModel(usuario) : null;
    this.anonimo = anonimo;
    this.likesCount = likesCount;
    this.commentCount = commentCount;
  }
}
