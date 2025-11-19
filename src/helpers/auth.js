export const saveSession = (usuario, token) => {
    sessionStorage.setItem("usuario", JSON.stringify(usuario));
    sessionStorage.setItem("token", token);
}

export const getSessionUser = () => {
    const user = sessionStorage.getItem("usuario");
    return user ? JSON.parse(user) : null;
}

export const clearSession = () => {
    sessionStorage.removeItem("usuario");
    sessionStorage.removeItem("token");
}

export const isLoggedIn = () => {
    return sessionStorage.getItem("token") !== null;
}