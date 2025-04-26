import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import StyledButton from '../components/StyledButton';
import { Link } from 'react-router-dom';

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

const Section = styled(motion.div)`
  background: ${props => props.darkMode ? '#1e1e30' : 'white'};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  border: 1px solid ${props => props.darkMode ? '#2a2a42' : '#e1e1e6'};
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${props => props.darkMode ? '#64ffda' : '#6c5ce7'};
`;

const Paragraph = styled.p`
  color: ${props => props.darkMode ? '#e1e1e6' : '#333'};
  line-height: 1.7;
  margin-bottom: 1rem;
  font-size: 1.1rem;
`;

const FeatureList = styled.ul`
  margin: 1.5rem 0;
  padding-left: 1.5rem;
`;

const FeatureItem = styled.li`
  color: ${props => props.darkMode ? '#e1e1e6' : '#333'};
  margin-bottom: 0.8rem;
  line-height: 1.6;
  font-size: 1.1rem;
  position: relative;
  
  &::before {
    content: '•';
    color: ${props => props.darkMode ? '#64ffda' : '#6c5ce7'};
    font-weight: bold;
    display: inline-block;
    width: 1em;
    margin-left: -1em;
  }
`;

const CTAContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  text-align: center;
`;

const CTAText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
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

const AboutPage = () => {
  const { darkMode } = useAppContext();
  
  return (
    <PageContainer>
      <Title 
        darkMode={darkMode}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About StoryGen AI
      </Title>
      
      <Section 
        darkMode={darkMode}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <SectionTitle darkMode={darkMode}>Welcome to StoryGen AI</SectionTitle>
        <Paragraph darkMode={darkMode}>
          StoryGen AI is a powerful web application that leverages artificial intelligence to generate unique and creative stories based on your prompts. 
          Whether you're a writer looking for inspiration, a teacher creating educational content, or just someone who enjoys reading original stories, 
          our tool is designed to help you bring your ideas to life.
        </Paragraph>
        <Paragraph darkMode={darkMode}>
          Powered by OpenRouter's AI models, StoryGen AI can create stories across various genres, lengths, and styles. 
          Simply provide a prompt, customize your settings, and watch as the AI crafts a unique narrative just for you.
        </Paragraph>
      </Section>
      
      <Section 
        darkMode={darkMode}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <SectionTitle darkMode={darkMode}>Key Features</SectionTitle>
        <FeatureList>
          <FeatureItem darkMode={darkMode}>
            <strong>Custom Prompts:</strong> Generate stories from any prompt you can imagine.
          </FeatureItem>
          <FeatureItem darkMode={darkMode}>
            <strong>AI-Powered:</strong> Uses state-of-the-art language models through OpenRouter.
          </FeatureItem>
          <FeatureItem darkMode={darkMode}>
            <strong>Customizable Instructions:</strong> Tailor the AI's behavior with custom system instructions.
          </FeatureItem>
          <FeatureItem darkMode={darkMode}>
            <strong>Model Selection:</strong> Choose from various AI models offered by OpenRouter.
          </FeatureItem>
          <FeatureItem darkMode={darkMode}>
            <strong>Dark Mode:</strong> Easy on the eyes with a beautiful dark theme option.
          </FeatureItem>
          <FeatureItem darkMode={darkMode}>
            <strong>Responsive Design:</strong> Works on desktop and mobile devices.
          </FeatureItem>
        </FeatureList>
      </Section>
      
      <Section 
        darkMode={darkMode}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <SectionTitle darkMode={darkMode}>How to Use</SectionTitle>
        <Paragraph darkMode={darkMode}>
          <strong>1. Set Up Your API Key:</strong> Visit the Settings page to configure your OpenRouter API key. If you don't have one,
          you can sign up at <LinkText href="https://openrouter.ai" target="_blank" rel="noopener noreferrer" darkMode={darkMode}>OpenRouter.ai</LinkText>.
        </Paragraph>
        <Paragraph darkMode={darkMode}>
          <strong>2. Customize Instructions (Optional):</strong> From the Settings page, you can customize the system instructions that guide how the AI generates stories.
        </Paragraph>
        <Paragraph darkMode={darkMode}>
          <strong>3. Enter Your Prompt:</strong> On the Home page, enter a prompt or idea for your story in the text area.
        </Paragraph>
        <Paragraph darkMode={darkMode}>
          <strong>4. Generate Your Story:</strong> Click the "Generate Story" button and wait for the AI to create your story.
        </Paragraph>
        <Paragraph darkMode={darkMode}>
          <strong>5. Copy and Share:</strong> Use the copy button to save your story for sharing or further editing.
        </Paragraph>
      </Section>
      
      <Section 
        darkMode={darkMode}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <SectionTitle darkMode={darkMode}>Security Considerations</SectionTitle>
        <Paragraph darkMode={darkMode}>
          <strong>Browser-Based Implementation:</strong> StoryGen AI is a client-side application that runs entirely in your web browser. 
          This means your API key is stored in your browser's local storage and API calls are made directly from your device.
        </Paragraph>
        <Paragraph darkMode={darkMode}>
          <strong>Security Implications:</strong> While convenient, this approach has certain security implications:
        </Paragraph>
        <FeatureList>
          <FeatureItem darkMode={darkMode}>
            Your API key is stored in your browser's local storage, which could potentially be accessed by malicious extensions or scripts.
          </FeatureItem>
          <FeatureItem darkMode={darkMode}>
            API calls are made directly from your browser to OpenRouter's servers, which might expose your requests in network logs.
          </FeatureItem>
          <FeatureItem darkMode={darkMode}>
            This is less secure than using a backend service to proxy requests and securely store API keys.
          </FeatureItem>
        </FeatureList>
        <Paragraph darkMode={darkMode}>
          <strong>Best Practices:</strong> To use this application safely:
        </Paragraph>
        <FeatureList>
          <FeatureItem darkMode={darkMode}>
            Only use StoryGen AI on trusted, private devices and networks.
          </FeatureItem>
          <FeatureItem darkMode={darkMode}>
            Do not share access to a browser where you've stored your API key.
          </FeatureItem>
          <FeatureItem darkMode={darkMode}>
            Consider using a dedicated API key with usage limits for this application.
          </FeatureItem>
          <FeatureItem darkMode={darkMode}>
            For higher security, consider hosting your own version with a backend service to proxy API requests.
          </FeatureItem>
        </FeatureList>
      </Section>
      
      <CTAContainer>
        <CTAText darkMode={darkMode}>Ready to create your first AI-generated story?</CTAText>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <StyledButton 
            size="large"
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V15" 
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13 3L21 3L21 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 3L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
          >
            Go to Story Generator
          </StyledButton>
        </Link>
      </CTAContainer>
    </PageContainer>
  );
};

export default AboutPage; 