import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

const TextAreaContainer = styled.div`
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

const StyledTextArea = styled(motion.textarea)`
  padding: 12px 16px;
  border-radius: 8px;
  border: 2px solid ${props => props.darkMode ? '#2a2a42' : '#e1e1e6'};
  background-color: ${props => props.darkMode ? '#1a1a2e' : 'white'};
  color: ${props => props.darkMode ? '#e1e1e6' : '#333'};
  font-size: 1rem;
  transition: all 0.2s ease-in-out;
  width: 100%;
  min-height: ${props => props.minHeight || '120px'};
  resize: ${props => props.resize || 'vertical'};
  font-family: inherit;
  line-height: 1.5;
  
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

const CharCount = styled.div`
  text-align: right;
  font-size: 0.75rem;
  margin-top: 0.25rem;
  color: ${props => 
    props.isAtLimit 
      ? '#ff6b6b' 
      : props.darkMode 
        ? '#b3b3cc' 
        : '#666'
  };
`;

const TextArea = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
  helperText,
  icon,
  maxLength,
  minHeight,
  resize,
  ...props
}) => {
  const { darkMode } = useAppContext();
  const isAtLimit = maxLength && value?.length >= maxLength;
  
  return (
    <TextAreaContainer>
      {label && (
        <Label htmlFor={id} darkMode={darkMode}>
          {icon && icon}
          {label}
        </Label>
      )}
      <StyledTextArea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        darkMode={darkMode}
        maxLength={maxLength}
        minHeight={minHeight}
        resize={resize}
        whileFocus={{ scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 300 }}
        {...props}
      />
      {maxLength && (
        <CharCount darkMode={darkMode} isAtLimit={isAtLimit}>
          {value?.length || 0}/{maxLength} characters
        </CharCount>
      )}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {helperText && <HelperText darkMode={darkMode}>{helperText}</HelperText>}
    </TextAreaContainer>
  );
};

export default TextArea; 