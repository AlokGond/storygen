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

const HeartIcon = styled.span`
  color: ${props => props.darkMode ? '#ff6b6b' : '#ff6b6b'};
  display: inline-block;
  margin: 0 0.25rem;
  animation: heartbeat 1.5s infinite;
  
  @keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
  }
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
        <p>Made With <HeartIcon darkMode={darkMode}>❤️</HeartIcon> Bittu</p>
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
