import React from 'react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { useAppContext } from '../context/AppContext';

// Button variants
const VARIANTS = {
  primary: {
    light: {
      background: '#6c5ce7',
      color: 'white',
      hover: '#5649c0'
    },
    dark: {
      background: '#64ffda',
      color: '#1a1a2e',
      hover: '#45e0bc'
    }
  },
  secondary: {
    light: {
      background: '#e2e2e2',
      color: '#333',
      hover: '#d0d0d0'
    },
    dark: {
      background: '#2a2a42',
      color: '#e1e1e6',
      hover: '#3a3a52'
    }
  },
  danger: {
    light: {
      background: '#ff6b6b',
      color: 'white',
      hover: '#ff5252'
    },
    dark: {
      background: '#ff6b6b',
      color: 'white',
      hover: '#ff5252'
    }
  }
};

const ButtonContainer = styled(motion.button)`
  padding: ${props => props.size === 'small' ? '0.5rem 1rem' : props.size === 'large' ? '0.9rem 2rem' : '0.7rem 1.5rem'};
  font-size: ${props => props.size === 'small' ? '0.9rem' : props.size === 'large' ? '1.1rem' : '1rem'};
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease-in-out;
  background-color: ${props => VARIANTS[props.variant][props.theme].background};
  color: ${props => VARIANTS[props.variant][props.theme].color};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  
  &:hover:enabled {
    background-color: ${props => VARIANTS[props.variant][props.theme].hover};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  &:active:enabled {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    transform: none;
  }
  
  svg {
    width: ${props => props.size === 'small' ? '16px' : props.size === 'large' ? '20px' : '18px'};
    height: ${props => props.size === 'small' ? '16px' : props.size === 'large' ? '20px' : '18px'};
  }
`;

const StyledButton = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  onClick, 
  disabled = false,
  type = 'button',
  icon = null,
  ...props 
}) => {
  const { darkMode } = useAppContext();
  const theme = darkMode ? 'dark' : 'light';
  
  return (
    <ButtonContainer
      variant={variant}
      size={size}
      theme={theme}
      onClick={onClick}
      disabled={disabled}
      type={type}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      {...props}
    >
      {icon && icon}
      {children}
    </ButtonContainer>
  );
};

export default StyledButton; 