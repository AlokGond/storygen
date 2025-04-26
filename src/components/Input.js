import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  width: 100%;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${props => props.darkMode ? '#e1e1e6' : '#333'};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StyledInput = styled(motion.input)`
  padding: 12px 16px;
  border-radius: 8px;
  border: 2px solid ${props => props.darkMode ? '#2a2a42' : '#e1e1e6'};
  background-color: ${props => props.darkMode ? '#1a1a2e' : 'white'};
  color: ${props => props.darkMode ? '#e1e1e6' : '#333'};
  font-size: 1rem;
  transition: all 0.2s ease-in-out;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: ${props => props.darkMode ? '#64ffda' : '#6c5ce7'};
    box-shadow: 0 0 0 2px ${props => props.darkMode ? 'rgba(100, 255, 218, 0.2)' : 'rgba(108, 92, 231, 0.2)'};
  }
  
  &::placeholder {
    color: ${props => props.darkMode ? '#4a4a6a' : '#aaa'};
  }
  
  &:disabled {
    background-color: ${props => props.darkMode ? '#151523' : '#f5f5f5'};
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  font-size: 0.85rem;
  margin-top: 0.5rem;
`;

const HelperText = styled.div`
  color: ${props => props.darkMode ? '#b3b3cc' : '#666'};
  font-size: 0.85rem;
  margin-top: 0.5rem;
`;

const Input = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  helperText,
  icon,
  ...props
}) => {
  const { darkMode } = useAppContext();
  
  return (
    <InputContainer>
      {label && (
        <Label htmlFor={id} darkMode={darkMode}>
          {icon && icon}
          {label}
        </Label>
      )}
      <StyledInput
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        darkMode={darkMode}
        whileFocus={{ scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 300 }}
        {...props}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {helperText && <HelperText darkMode={darkMode}>{helperText}</HelperText>}
    </InputContainer>
  );
};

export default Input; 