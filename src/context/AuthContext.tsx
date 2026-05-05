import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

type AuthContextType = {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
};


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });

  useEffect(()=>{
    if(!token) return;
    try{
      const payload = JSON.parse(atob(token.split(".")[1]))
      const isExpired = payload.exp *1000 < Date.now()
      if(isExpired){
        logout()
      }
    }catch{
      logout()
    }
  },[token])

  useEffect(() => {
    const syncToken = () => {
      const stored = localStorage.getItem("token");
      setToken(stored);
    };

    window.addEventListener("storage", syncToken);

    syncToken();

    return () => window.removeEventListener("storage", syncToken);
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };
  
  const isAuthenticated = Boolean(token);

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
