# StoryGen AI - AI Story Generator

StoryGen AI is a modern web application that leverages the power of AI to generate unique, creative stories based on user prompts. Built with React and powered by OpenRouter API, this application offers a simple yet powerful interface for generating and customizing AI-generated stories.

## Features

- **AI-Powered Story Generation**: Create unique stories from simple prompts
- **Customizable System Instructions**: Tailor the AI's behavior with custom prompts
- **Model Selection**: Choose from various AI models offered by OpenRouter
- **Dark/Light Mode**: A beautiful UI with theme toggling
- **Responsive Design**: Works on desktop and mobile devices
- **Local Storage**: Saves your API key and preferences locally
- **Streaming Generation**: See stories generate in real-time as they're being created

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn
- OpenRouter API key (obtain from [OpenRouter.ai](https://openrouter.ai))

### Installation

1. Clone or download this repository
2. Navigate to the project directory and install dependencies:

```bash
cd story-generator-app
npm install
```

3. Start the development server:

```bash
npm start
```

4. Open your browser and go to `http://localhost:3000`

### Configuration

Before you can generate stories, you need to:

1. Go to the Settings page
2. Enter your OpenRouter API key
3. (Optional) Customize the system instructions to guide the AI's behavior
4. (Optional) Choose a different AI model

## Usage

1. Navigate to the Home page
2. Enter a story prompt in the text area
3. Click "Generate Story"
4. Watch the story appear in real-time as it's being generated
5. Use the Copy button to copy your story to clipboard

## Security Considerations

This application runs entirely in your web browser, which means:

- Your OpenRouter API key is stored in your browser's local storage
- API calls are made directly from your browser to OpenRouter's servers
- This approach is less secure than using a backend service

### Best Practices

To use this application securely:

1. **Only use on trusted devices**: Never use this application on public or shared computers
2. **Use on private networks**: Avoid using on public WiFi networks
3. **Consider API key limits**: Set usage limits on your OpenRouter API key
4. **For production use**: Consider implementing a backend service to securely store your API key and proxy requests

> ⚠️ **Warning**: The application uses the `dangerouslyAllowBrowser` option in the OpenAI client to enable browser-based API calls. This option is named as such because it presents security risks.

## Built With

- [React](https://reactjs.org/) - Frontend framework
- [Emotion](https://emotion.sh/) - Styled components
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [React Router](https://reactrouter.com/) - Navigation
- [OpenRouter API](https://openrouter.ai/) - AI backend
- [React Markdown](https://github.com/remarkjs/react-markdown) - Markdown rendering

## Development

To build the application for production:

```bash
npm run build
```

This will create optimized files in the `build` folder that you can deploy to a web server.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Powered by OpenRouter AI models
- Icons based on [Feather Icons](https://feathericons.com/)
- Font: Poppins from Google Fonts

---

Built with ❤️ by [Your Name]
