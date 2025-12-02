import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) { // Contexto para guardar los datos de autenticación
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [rolId, setRolId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");
    const savedRolId = localStorage.getItem("rolId");

    if (savedUser && savedToken && savedRolId) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
      setRolId(savedRolId);
    }

    setLoading(false);
  }, []);

  const login = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", tokenData);
  };

  const roleData = (rolIdData) => {
    setRolId(rolIdData);
    localStorage.setItem("rolId", rolIdData);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setRolId(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("rolId");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        rolId,
        loading,
        login,
        logout,
        roleData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
