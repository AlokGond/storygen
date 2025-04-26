import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
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
  const { apiKey, systemInstructions, darkMode, selectedModel } = useAppContext();
  const [prompt, setPrompt] = useState('');
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const storyContainerRef = useRef(null);
  
  // Scroll to the bottom of the story container when new content is added during streaming
  useEffect(() => {
    if (isStreaming && storyContainerRef.current) {
      const container = storyContainerRef.current;
      container.scrollTop = container.scrollHeight;
    }
  }, [story, isStreaming]);
  
  const handleGenerateStory = async () => {
    if (!prompt.trim()) {
      setError('Please enter a story prompt first.');
      return;
    }
    
    if (!apiKey) {
      setError('API key is required. Please add your OpenRouter API key in the Settings page.');
      return;
    }
    
    setLoading(true);
    setError('');
    setStory('');
    setIsStreaming(true);
    
    try {
      storyContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
      
      // Use the streaming API with a callback function
      const result = await generateStory(
        apiKey, 
        prompt, 
        systemInstructions, 
        selectedModel,
        // This callback receives streaming updates
        (partialStory) => {
          setStory(partialStory);
        }
      );
      
      if (!result.success) {
        setError(result.error || 'Failed to generate story. Please try again.');
      }
    } catch (err) {
      console.error('Error generating story:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
      setIsStreaming(false);
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
        <Title 
          darkMode={darkMode}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          AI Story Generator
        </Title>
        <Subtitle 
          darkMode={darkMode}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Turn your ideas into fascinating stories with the power of AI. Simply enter a prompt, and watch as creative tales unfold before your eyes.
        </Subtitle>
      </Hero>
      
      <FormContainer 
        darkMode={darkMode}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <AnimatePresence>
          {error && (
            <ErrorMessage 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              {error}
            </ErrorMessage>
          )}
        </AnimatePresence>
        
        <TextArea
          label="What's your story idea?"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a story prompt (e.g., 'A detective discovers a hidden room in their house that seems to exist in a different timeline...')"
          minHeight="150px"
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" 
                    stroke={darkMode ? "#64ffda" : "#6c5ce7"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 8.99998H8" stroke={darkMode ? "#64ffda" : "#6c5ce7"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 13H8" stroke={darkMode ? "#64ffda" : "#6c5ce7"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 17H8" stroke={darkMode ? "#64ffda" : "#6c5ce7"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
        />
        
        <ButtonContainer>
          <StyledButton 
            onClick={handleGenerateStory} 
            disabled={loading || !prompt.trim()}
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 12L12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
          >
            {loading ? 'Generating...' : 'Generate Story'}
          </StyledButton>
          <StyledButton 
            onClick={handleClear} 
            variant="secondary"
            disabled={loading || (!prompt.trim() && !story)}
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 6V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
          >
            Clear
          </StyledButton>
        </ButtonContainer>
      </FormContainer>
      
      <AnimatePresence>
        {/* Always show the StoryContainer when loading or when there's a story */}
        {(loading || story) && (
          <StoryContainer 
            ref={storyContainerRef}
            darkMode={darkMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{ 
              maxHeight: '600px',
              overflowY: 'auto',
              minHeight: '200px' // Ensure there's always space to show content
            }}
          >
            <StoryHeader darkMode={darkMode}>
              <StoryTitle darkMode={darkMode}>
                {isStreaming ? 'Generating Story...' : 'Your Generated Story'}
                {isStreaming && (
                  <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                    style={{ marginLeft: '8px', display: 'inline-block', fontSize: '1.5rem' }}
                  >
                    ✨
                  </motion.span>
                )}
              </StoryTitle>
              <StyledButton 
                size="small" 
                variant="secondary"
                onClick={() => {
                  navigator.clipboard.writeText(story);
                }}
                disabled={isStreaming || !story}
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 4H18C19.1046 4 20 4.89543 20 6V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V6C4 4.89543 4.89543 4 6 4H8" 
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15 2H9C8.44772 2 8 2.44772 8 3V5C8 5.55228 8.44772 6 9 6H15C15.5523 6 16 5.55228 16 5V3C16 2.44772 15.5523 2 15 2Z" 
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                }
              >
                Copy
              </StyledButton>
            </StoryHeader>
            <StoryContent darkMode={darkMode}>
              {story ? (
                <ReactMarkdown>{story}</ReactMarkdown>
              ) : (
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center', 
                  minHeight: '150px',
                  color: darkMode ? '#64ffda' : '#6c5ce7'
                }}>
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                    style={{ marginRight: '12px' }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M4.93 4.93L7.76 7.76" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16.24 16.24L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M18 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M4.93 19.07L7.76 16.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.div>
                  <span>Generating story in real-time...</span>
                </div>
              )}
              {isStreaming && (
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                  style={{ display: 'inline-block' }}
                >
                  ▌
                </motion.div>
              )}
            </StoryContent>
          </StoryContainer>
        )}
      </AnimatePresence>
    </PageContainer>
  );
};

export default HomePage; 