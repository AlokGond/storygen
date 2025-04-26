import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import StyledButton from '../components/StyledButton';
import TextArea from '../components/TextArea';
import { generateStory } from '../services/openRouterService';
import ReactMarkdown from 'react-markdown';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
`;

const Hero = styled(motion.div)`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: ${props => props.darkMode ? '#e1e1e6' : '#333'};
  background: ${props => props.darkMode 
    ? 'linear-gradient(135deg, #64ffda 0%, #6c5ce7 100%)' 
    : 'linear-gradient(135deg, #6c5ce7 0%, #a166ff 100%)'
  };
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  display: inline-block;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.25rem;
  color: ${props => props.darkMode ? '#b3b3cc' : '#666'};
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
`;

const FormContainer = styled(motion.div)`
  background: ${props => props.darkMode ? '#1e1e30' : 'white'};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  border: 1px solid ${props => props.darkMode ? '#2a2a42' : '#e1e1e6'};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  gap: 1rem;
`;

const StoryContainer = styled(motion.div)`
  background: ${props => props.darkMode ? '#1e1e30' : 'white'};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
  border: 1px solid ${props => props.darkMode ? '#2a2a42' : '#e1e1e6'};
  position: relative;
  overflow: hidden;
`;

const StoryContent = styled.div`
  color: ${props => props.darkMode ? '#e1e1e6' : '#333'};
  line-height: 1.8;
  font-size: 1.1rem;
  
  /* Markdown styles */
  h1, h2, h3, h4, h5, h6 {
    color: ${props => props.darkMode ? '#64ffda' : '#6c5ce7'};
    margin-top: 1.5rem;
    margin-bottom: 1rem;
  }
  
  p {
    margin-bottom: 1rem;
    white-space: pre-wrap;
  }
  
  strong {
    color: ${props => props.darkMode ? '#64ffda' : '#6c5ce7'};
    font-weight: 700;
  }
  
  em {
    font-style: italic;
  }
  
  blockquote {
    border-left: 4px solid ${props => props.darkMode ? '#2a2a42' : '#e1e1e6'};
    padding-left: 1rem;
    margin-left: 0;
    margin-right: 0;
    font-style: italic;
  }
  
  ul, ol {
    margin-bottom: 1rem;
    padding-left: 2rem;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
  
  hr {
    border: none;
    border-top: 1px solid ${props => props.darkMode ? '#2a2a42' : '#e1e1e6'};
    margin: 2rem 0;
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
`;

const StoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid ${props => props.darkMode ? '#2a2a42' : '#e1e1e6'};
  padding-bottom: 1rem;
`;

const StoryTitle = styled.h3`
  color: ${props => props.darkMode ? '#64ffda' : '#6c5ce7'};
  margin: 0;
`;

const ErrorMessage = styled(motion.div)`
  background-color: #ff6b6b20;
  color: #ff6b6b;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #ff6b6b;
  margin-bottom: 1rem;
`;

const HomePage = () => {
  const { apiKey, darkMode, selectedModel } = useAppContext();
  const [prompt, setPrompt] = useState('');
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const storyContainerRef = useRef(null);
  
  const handleGenerateStory = async () => {
    if (!prompt.trim()) {
      setError('Please enter a story prompt');
      return;
    }

    setError('');
    setLoading(true);
    setStory('');
    
    try {
      // Simple direct message
      const userMessage = `Create a Hindi story about: ${prompt}`;
      
      // Call API with fixed key and streaming
      const response = await generateStory(
        userMessage,
        apiKey,
        (partialStory) => {
          setStory(partialStory);
        },
        selectedModel
      );

      if (!response.success) {
        setError(response.error || 'Failed to generate story');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };
  
  const handleClear = () => {
    setPrompt('');
    setStory('');
    setError('');
  };
  
  return (
    <PageContainer>
      <Hero>
        <Title darkMode={darkMode}>Hindi Story Generator</Title>
        <Subtitle darkMode={darkMode}>
          Enter a prompt to generate a story in Hindi
        </Subtitle>
      </Hero>
      
      <FormContainer darkMode={darkMode}>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <TextArea
          label="What's your story idea?"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a story prompt"
          minHeight="150px"
        />
        
        <ButtonContainer>
          <StyledButton 
            onClick={handleGenerateStory} 
            disabled={loading || !prompt.trim()}
          >
            {loading ? 'Generating...' : 'Generate Story'}
          </StyledButton>
          <StyledButton 
            onClick={handleClear} 
            variant="secondary"
            disabled={loading || (!prompt.trim() && !story)}
          >
            Clear
          </StyledButton>
        </ButtonContainer>
      </FormContainer>
      
      {story && (
        <StoryContainer 
          ref={storyContainerRef}
          darkMode={darkMode}
        >
          <StoryHeader darkMode={darkMode}>
            <StoryTitle darkMode={darkMode}>Your Generated Story</StoryTitle>
            <StyledButton 
              size="small" 
              variant="secondary"
              onClick={() => navigator.clipboard.writeText(story)}
            >
              Copy
            </StyledButton>
          </StoryHeader>
          <StoryContent darkMode={darkMode}>
            <ReactMarkdown>{story}</ReactMarkdown>
          </StoryContent>
        </StoryContainer>
      )}
      
      {loading && !story && (
        <StoryContainer darkMode={darkMode}>
          <StoryHeader darkMode={darkMode}>
            <StoryTitle darkMode={darkMode}>Generating Story...</StoryTitle>
          </StoryHeader>
          <StoryContent darkMode={darkMode}>
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              Loading...
            </div>
          </StoryContent>
        </StoryContainer>
      )}
    </PageContainer>
  );
};

export default HomePage; 