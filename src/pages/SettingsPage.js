import React, { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import StyledButton from '../components/StyledButton';
import Input from '../components/Input';
import TextArea from '../components/TextArea';

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  min-height: calc(100vh - 70px);
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: ${props => props.darkMode ? '#e1e1e6' : '#333'};
  border-bottom: 2px solid ${props => props.darkMode ? '#2a2a42' : '#e1e1e6'};
  padding-bottom: 1rem;
`;

const FormContainer = styled(motion.div)`
  background: ${props => props.darkMode ? '#1e1e30' : 'white'};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  border: 1px solid ${props => props.darkMode ? '#2a2a42' : '#e1e1e6'};
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: ${props => props.darkMode ? '#64ffda' : '#6c5ce7'};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
  gap: 1rem;
`;

const InfoBox = styled.div`
  background: ${props => props.darkMode ? 'rgba(100, 255, 218, 0.1)' : 'rgba(108, 92, 231, 0.1)'};
  border-left: 4px solid ${props => props.darkMode ? '#64ffda' : '#6c5ce7'};
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-radius: 0 8px 8px 0;
  color: ${props => props.darkMode ? '#e1e1e6' : '#333'};
`;

const LinkText = styled.a`
  color: ${props => props.darkMode ? '#64ffda' : '#6c5ce7'};
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const StepContainer = styled.div`
  margin-bottom: 2rem;
`;

const StepNumber = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: ${props => props.darkMode ? '#64ffda' : '#6c5ce7'};
  color: ${props => props.darkMode ? '#1e1e30' : 'white'};
  font-weight: bold;
  margin-right: 0.75rem;
`;

const StepTitle = styled.h4`
  display: inline;
  color: ${props => props.darkMode ? '#e1e1e6' : '#333'};
  margin: 0;
`;

const StepContent = styled.div`
  margin-left: 2.5rem;
  margin-top: 0.75rem;
  color: ${props => props.darkMode ? '#b3b3cc' : '#666'};
`;

const SettingsPage = () => {
  const { 
    apiKey, 
    setApiKey, 
    systemInstructions, 
    setSystemInstructions,
    selectedModel,
    setSelectedModel,
    darkMode 
  } = useAppContext();
  
  const [formState, setFormState] = useState({
    apiKey: apiKey,
    systemInstructions: systemInstructions,
    selectedModel: selectedModel
  });
  
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSave = () => {
    setApiKey(formState.apiKey);
    setSystemInstructions(formState.systemInstructions);
    setSelectedModel(formState.selectedModel);
    setSaveSuccess(true);
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };
  
  const handleReset = () => {
    setFormState({
      apiKey: apiKey,
      systemInstructions: systemInstructions,
      selectedModel: selectedModel
    });
  };
  
  return (
    <PageContainer>
      <Title 
        darkMode={darkMode}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Settings
      </Title>
      
      <FormContainer 
        darkMode={darkMode}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <SectionTitle darkMode={darkMode}>API Configuration</SectionTitle>
        
        <InfoBox darkMode={darkMode}>
          <p><strong>Important:</strong> This application requires an OpenRouter API key to generate stories. The API key is stored only in your browser's local storage and is never sent to our servers.</p>
        </InfoBox>
        
        <StepContainer>
          <StepNumber darkMode={darkMode}>1</StepNumber>
          <StepTitle darkMode={darkMode}>Get an OpenRouter API Key</StepTitle>
          <StepContent darkMode={darkMode}>
            <p>Visit <LinkText href="https://openrouter.ai" target="_blank" rel="noopener noreferrer" darkMode={darkMode}>OpenRouter.ai</LinkText> and create an account.</p>
            <p>Once registered, go to your dashboard and create a new API key.</p>
          </StepContent>
        </StepContainer>
        
        <StepContainer>
          <StepNumber darkMode={darkMode}>2</StepNumber>
          <StepTitle darkMode={darkMode}>Enter Your API Key Below</StepTitle>
          <StepContent darkMode={darkMode}>
            <Input
              id="apiKey"
              name="apiKey"
              label="OpenRouter API Key"
              type="password"
              value={formState.apiKey}
              onChange={handleInputChange}
              placeholder="Enter your OpenRouter API key (starts with sk-or-...)"
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 2L19 4M9 4L11 2M12 12L2.5 21.5M2.5 12.5L5 10M15.5 22L12 12M16 10L12 12M12 12L14 8L19 3" 
                        stroke={darkMode ? "#64ffda" : "#6c5ce7"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
              helperText="Your API key is stored locally in your browser and never sent to our servers."
            />
          </StepContent>
        </StepContainer>
        
        <StepContainer>
          <StepNumber darkMode={darkMode}>3</StepNumber>
          <StepTitle darkMode={darkMode}>Save Your Settings</StepTitle>
          <StepContent darkMode={darkMode}>
            <p>Click the "Save Settings" button below to store your API key.</p>
            <p>After saving, return to the Home page to start generating stories.</p>
          </StepContent>
        </StepContainer>
        
        <Input
          id="selectedModel"
          name="selectedModel"
          label="Selected Model"
          value={formState.selectedModel}
          onChange={handleInputChange}
          placeholder="Model identifier (e.g., deepseek/deepseek-r1:free)"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" 
                    stroke={darkMode ? "#64ffda" : "#6c5ce7"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" 
                    stroke={darkMode ? "#64ffda" : "#6c5ce7"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
          helperText="The AI model to use for story generation. Default is 'deepseek/deepseek-r1:free'."
        />
        
        <TextArea
          id="systemInstructions"
          name="systemInstructions"
          label="System Instructions"
          value={formState.systemInstructions}
          onChange={handleInputChange}
          placeholder="Enter custom instructions for the AI"
          minHeight="150px"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" 
                    stroke={darkMode ? "#64ffda" : "#6c5ce7"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 2V4" stroke={darkMode ? "#64ffda" : "#6c5ce7"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 2V4" stroke={darkMode ? "#64ffda" : "#6c5ce7"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 10H21" stroke={darkMode ? "#64ffda" : "#6c5ce7"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 16L11 18L15 14" stroke={darkMode ? "#64ffda" : "#6c5ce7"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
          helperText="These instructions guide the AI on how to generate stories. You can customize them to fit your preferences."
        />
        
        <ButtonContainer>
          {saveSuccess && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              style={{ 
                color: darkMode ? '#64ffda' : '#6c5ce7', 
                fontWeight: 500,
                marginRight: 'auto',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18457 2.99721 7.13633 4.39828 5.49707C5.79935 3.85782 7.69279 2.71538 9.79619 2.24015C11.8996 1.76491 14.1003 1.98234 16.07 2.86" 
                      stroke={darkMode ? "#64ffda" : "#6c5ce7"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 4L12 14.01L9 11.01" stroke={darkMode ? "#64ffda" : "#6c5ce7"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Settings saved successfully!
            </motion.div>
          )}
          <StyledButton onClick={handleReset} variant="secondary">
            Reset
          </StyledButton>
          <StyledButton onClick={handleSave}>
            Save Settings
          </StyledButton>
        </ButtonContainer>
      </FormContainer>
    </PageContainer>
  );
};

export default SettingsPage; 