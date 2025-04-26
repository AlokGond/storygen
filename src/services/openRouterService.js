import { OpenAI } from 'openai';

// Create OpenAI client with OpenRouter configuration
const createClient = (apiKey) => {
  return new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: apiKey,
    dangerouslyAllowBrowser: true // Note: In production, you'd want a backend to handle API calls
  });
};

// Generate a story based on user instructions with streaming support
export const generateStory = async (apiKey, prompt, instructions, model = "deepseek/deepseek-chat", onProgress) => {
  try {
    if (!apiKey) {
      throw new Error("API key is required");
    }

    const client = createClient(apiKey);
    
    // If onProgress callback is provided, use streaming
    if (onProgress && typeof onProgress === 'function') {
      const stream = await client.chat.completions.create({
        headers: {
          "HTTP-Referer": window.location.origin, // Site URL for rankings on openrouter.ai
          "X-Title": "Story Generator App", // Site title for rankings on openrouter.ai
        },
        model: model,
        messages: [
          {
            role: "system",
            content: instructions || "You are a creative storyteller. Create engaging, imaginative stories based on the user's prompt."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        stream: true // Enable streaming
      });

      let fullResponse = '';

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        fullResponse += content;
        onProgress(fullResponse); // Call the progress callback with accumulated text
      }

      return {
        success: true,
        story: fullResponse
      };
    } 
    // If no onProgress callback, use regular non-streaming request
    else {
      const completion = await client.chat.completions.create({
        headers: {
          "HTTP-Referer": window.location.origin, // Site URL for rankings on openrouter.ai
          "X-Title": "Story Generator App", // Site title for rankings on openrouter.ai
        },
        model: model,
        messages: [
          {
            role: "system",
            content: instructions || "You are a creative storyteller. Create engaging, imaginative stories based on the user's prompt."
          },
          {
            role: "user",
            content: prompt
          }
        ]
      });

      return {
        success: true,
        story: completion.choices[0].message.content
      };
    }
    
  } catch (error) {
    console.error("Error generating story:", error);
    return {
      success: false,
      error: error.message || "Failed to generate story"
    };
  }
};

// Get available models
export const getAvailableModels = async (apiKey) => {
  try {
    if (!apiKey) {
      throw new Error("API key is required");
    }

    const client = createClient(apiKey);
    const response = await client.models.list();
    
    return {
      success: true,
      models: response.data
    };
  } catch (error) {
    console.error("Error fetching models:", error);
    return {
      success: false,
      error: error.message || "Failed to fetch models"
    };
  }
}; 