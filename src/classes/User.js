export class UsuarioModel { // Modelo de usuario para la gestión de usuarios
  constructor({
    id = 0,
    nombre = "",
    apellidoPaterno = "",
    apellidoMaterno = "",
    genero = "",
    correo = "",
    telefono = "",
    contrasena = "",
    rol = 0,
    activo = true,
    fechaRegistro = new Date().toISOString(),
    ultimoAcceso = null,
    suscripcion = null,
    fotoUrl = ""
  } = {}) {
    this.id = id;
    this.nombre = nombre;
    this.apellidoPaterno = apellidoPaterno;
    this.apellidoMaterno = apellidoMaterno;
    this.genero = genero;
    this.correo = correo;
    this.telefono = telefono;
    this.contrasena = contrasena;
    this.rol = rol;
    this.activo = activo;
    this.fechaRegistro = new Date(fechaRegistro);
    this.ultimoAcceso = ultimoAcceso ? new Date(ultimoAcceso) : null;
    this.suscripcion = suscripcion;
    this.fotoUrl = fotoUrl
  }
}
