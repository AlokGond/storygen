import React, { createContext, useState, useContext, useEffect } from 'react';

// Create context
const AppContext = createContext();

// Custom hook for using the context
export const useAppContext = () => useContext(AppContext);

// Provider component
export const AppProvider = ({ children }) => {
  // State for the API key - directly use the provided key
  const [apiKey, setApiKey] = useState('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');
  
  // State for selected model - use deepseek directly
  const [selectedModel, setSelectedModel] = useState('deepseek/deepseek-r1:free');

  // State for theme
  const [darkMode, setDarkMode] = useState(false);

  // System instructions (simplified)
  const [systemInstructions, setSystemInstructions] = useState(
    `You are a masterful Hindi storyteller AI. Create engaging Hindi stories with cultural depth.`
  );

  // Toggle dark mode
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Save dark mode preference
  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  return (
    <AppContext.Provider 
      value={{ 
        apiKey, 
        setApiKey, 
        systemInstructions, 
        setSystemInstructions,
        selectedModel,
        setSelectedModel,
        darkMode,
        toggleDarkMode
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext; 