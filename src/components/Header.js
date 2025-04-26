import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: ${props => props.darkMode ? '#1a1a2e' : '#f8f9fa'};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: ${props => props.darkMode ? '#e1e1e6' : '#333'};
  transition: all 0.3s ease;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Logo = styled(motion.div)`
  font-size: 1.8rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  color: ${props => props.darkMode ? '#64ffda' : '#6c5ce7'};
  
  svg {
    margin-right: 0.5rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.darkMode ? '#e1e1e6' : '#333'};
  font-weight: 500;
  position: relative;
  padding: 0.3rem 0;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: ${props => props.darkMode ? '#64ffda' : '#6c5ce7'};
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.darkMode ? '#e1e1e6' : '#333'};
  font-size: 1.2rem;
  
  &:focus {
    outline: none;
  }
`;

const Header = () => {
  const { darkMode, toggleDarkMode } = useAppContext();
  
  return (
    <HeaderContainer darkMode={darkMode}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Logo 
          darkMode={darkMode}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" 
                  stroke={darkMode ? "#64ffda" : "#6c5ce7"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 4V2" stroke={darkMode ? "#64ffda" : "#6c5ce7"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17 4V2" stroke={darkMode ? "#64ffda" : "#6c5ce7"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 11H17" stroke={darkMode ? "#64ffda" : "#6c5ce7"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 16H13" stroke={darkMode ? "#64ffda" : "#6c5ce7"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          StoryGen AI
        </Logo>
      </Link>
      <Nav>
        <NavLink to="/" darkMode={darkMode}>Home</NavLink>
        <NavLink to="/settings" darkMode={darkMode}>Settings</NavLink>
        <NavLink to="/about" darkMode={darkMode}>About</NavLink>
        <ToggleButton onClick={toggleDarkMode} darkMode={darkMode}>
          {darkMode ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" 
                    stroke="#e1e1e6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 1V3" stroke="#e1e1e6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 21V23" stroke="#e1e1e6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4.22 4.22L5.64 5.64" stroke="#e1e1e6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18.36 18.36L19.78 19.78" stroke="#e1e1e6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1 12H3" stroke="#e1e1e6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 12H23" stroke="#e1e1e6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4.22 19.78L5.64 18.36" stroke="#e1e1e6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18.36 5.64L19.78 4.22" stroke="#e1e1e6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" 
                    stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </ToggleButton>
      </Nav>
    </HeaderContainer>
  );
};

export default Header; 