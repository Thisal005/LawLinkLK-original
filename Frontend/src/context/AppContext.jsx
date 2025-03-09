import React, { createContext, useState } from 'react';

// Create the context
export const AppContext = createContext();

// Provider component
export const AppContextProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const backendUrl = 'http://localhost:5000'; // Adjust if different

  return (
    <AppContext.Provider value={{ backendUrl, setEmail, email }}>
      {children}
    </AppContext.Provider>
  );
};