
export const saveLocalUser = (usuario, token) => {
    try {
                localStorage.setItem("IdUsuario", usuario.id); 
        localStorage.setItem("Token", token);
        
        
        localStorage.setItem("UserObject", JSON.stringify(usuario));
    } catch (error) {
        console.error("Error al guardar en localStorage:", error);
    }
};

export const getLocalUser = () => {
    const userId = localStorage.getItem("IdUsuario");
    const token = localStorage.getItem("Token");
    const userObjectString = localStorage.getItem("UserObject");

    if (userId && token && userObjectString) {
        try {
            return {
                id: userId,
                token: token,
                user: JSON.parse(userObjectString)
            };
        } catch (error) {
            console.error("Error al parsear el usuario del localStorage:", error);
            return null;
        }
    }
    return null;
};

export const clearLocalUser = () => {
    localStorage.removeItem("IdUsuario");
    localStorage.removeItem("Token");
    localStorage.removeItem("UserObject");
};