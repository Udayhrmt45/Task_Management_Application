import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    isLoggedIn: false,
  });

  const login = (name, email) => {
    setUser({
      name: name,
      email: email,
      isLoggedIn: true,
    });
  };

  const logout = () => {
    setUser({
      name: "",
      email: "",
      isLoggedIn: false,
    });
  };

  const value = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export default AuthContext;
