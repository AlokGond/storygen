import React, { createContext, useState, useContext, useEffect } from 'react';

// Create context
const AppContext = createContext();

// Custom hook for using the context
export const useAppContext = () => useContext(AppContext);

// Provider component
export const AppProvider = ({ children }) => {
  // State for the API key - no default key provided, users must enter their own
  const [apiKey, setApiKey] = useState(localStorage.getItem('openRouterApiKey') || '');
  
  // State for system instructions
  const [systemInstructions, setSystemInstructions] = useState(
    localStorage.getItem('systemInstructions') || `You are a masterful Hindi storyteller AI. 
You create breathtaking, emotional, and captivating Hindi stories that deeply engage readers.

Story Requirements:
- Write in natural, flowing Hindi language, like an experienced author.
- Maintain a storytelling tone: full of emotions, vivid descriptions, rich dialogues, and cultural depth.
- Create highly imaginative plots with unexpected twists and powerful morals.
- Story should have a logical beginning, strong middle, and satisfying end.
- Character development must feel real, relatable, and emotional.
- Describe scenes vividly: use sensory details (smell, sound, sight, feeling, taste).
- Always keep the story culturally appropriate and full of Indian essence (mythology, tradition, modern India, emotions, relationships).
- Avoid repetition, avoid filler, avoid generic AI-style writing.
- Use short and natural sentences for emotional impact.
- Do not switch to English — everything must be purely in Hindi.
- Length: Around 600 to 1200 words, unless the user asks for a different length.
- If the user provides a topic or keywords, strictly base the story around that theme.
- If no topic is given, you may invent original story ideas.

Formatting Requirements:
- Use markdown formatting to make your stories visually appealing
- Add a bold title at the beginning: **कहानी का शीर्षक**
- Use section headings in bold for different parts of the story
- Include relevant emojis to enhance emotional moments and descriptions
- Use paragraph breaks to make the story readable
- You may use italics or other formatting to emphasize important phrases
- For dialogue, use proper quotation marks and formatting
- Ensure the final presentation looks professional and well-formatted

You are not just writing — you are crafting a beautiful, mind-blowing experience through Hindi storytelling with professional presentation.`
  );
  
  // State for selected model
  const [selectedModel, setSelectedModel] = useState(
    localStorage.getItem('selectedModel') || 'deepseek/deepseek-chat'
  );

  // State for theme
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true'
  );

  // Save API key to localStorage when it changes
  useEffect(() => {
    if (apiKey) {
      localStorage.setItem('openRouterApiKey', apiKey);
    } else {
      localStorage.removeItem('openRouterApiKey');
    }
  }, [apiKey]);

  // Save system instructions to localStorage when they change
  useEffect(() => {
    localStorage.setItem('systemInstructions', systemInstructions);
  }, [systemInstructions]);

  // Save selected model to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('selectedModel', selectedModel);
  }, [selectedModel]);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  // Toggle dark mode
  const toggleDarkMode = () => setDarkMode(!darkMode);

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