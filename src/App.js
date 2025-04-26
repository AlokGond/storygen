import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from '@emotion/styled';
import { AppProvider, useAppContext } from './context/AppContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import AboutPage from './pages/AboutPage';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.darkMode ? '#121212' : '#f8f9fa'};
  transition: background-color 0.3s ease;
`;

const Main = styled.main`
  flex: 1;
`;

const Footer = styled.footer`
  text-align: center;
  padding: 1.5rem;
  background-color: ${props => props.darkMode ? '#1a1a2e' : '#f8f9fa'};
  color: ${props => props.darkMode ? '#b3b3cc' : '#666'};
  border-top: 1px solid ${props => props.darkMode ? '#2a2a42' : '#e1e1e6'};
  font-size: 0.9rem;
`;

const AppContent = () => {
  const { darkMode } = useAppContext();
  
  return (
    <AppContainer darkMode={darkMode}>
      <Header />
      <Main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Main>
      <Footer darkMode={darkMode}>
        <p>© {new Date().getFullYear()} StoryGen AI - All rights reserved</p>
        <p>Powered by <a href="https://openrouter.ai" target="_blank" rel="noopener noreferrer" style={{ color: darkMode ? '#64ffda' : '#6c5ce7', textDecoration: 'none' }}>OpenRouter.ai</a></p>
      </Footer>
    </AppContainer>
  );
};

function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}

export default App;
