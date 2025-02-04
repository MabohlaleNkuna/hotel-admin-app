import React, { useState, useEffect, useContext, createContext } from 'react';
import { auth } from '../firebaseConfig.js';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const handleAuthStateChange = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsAuthLoading(false);
    });

    return handleAuthStateChange;
  }, []);

  const authContextValue = { user };

  if (isAuthLoading) return null;

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
