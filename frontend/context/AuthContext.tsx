"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextProps {
  user: User | null;
  token: string | null;
  login: (token: string, user?: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
   const savedToken = localStorage.getItem("token");
   const savedUser = localStorage.getItem("user");
   if (savedToken) setToken(savedToken);
   if (savedUser) setUser(JSON.parse(savedUser));
 }, []);
 

 const login = (token: string, user?: User) => {
   localStorage.setItem("token", token);
   setToken(token);
   if (user) {
     localStorage.setItem("user", JSON.stringify(user));
     setUser(user);
   }
   router.push("/dashboard");
 };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
