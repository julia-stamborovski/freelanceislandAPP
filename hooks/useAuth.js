import React, { createContext, useState, useEffect } from 'react';
import { getAuth, setPersistence, inMemoryPersistence } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    setPersistence(auth, inMemoryPersistence)
      .then(() => {
        // In memory persistence will be applied to the signed-in Google user
        // even though the persistence was set to 'none' and a page redirect
        // occurred.
        // Make sure to define the 'provider' variable or remove this block if not needed
        // return signInWithRedirect(auth, provider);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }, []); // Make sure to pass an empty dependency array
  const logout = () => {
    // Limpe o usuário autenticado definindo-o como null
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Only export AuthContext, not AuthProvider
export { AuthContext };
