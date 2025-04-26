import { OpenAI } from 'openai';

// Create OpenAI client with OpenRouter configuration
const createClient = (apiKey) => {
  console.log("Creating OpenRouter client with API key:", apiKey ? "API key exists" : "API key is missing");
  return new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: apiKey,
    dangerouslyAllowBrowser: true // Note: In production, you'd want a backend to handle API calls
  });
};

// Test if the API key is valid
export const testApiKey = async (apiKey) => {
  try {
    if (!apiKey) {
      return { 
        valid: false, 
        error: "API key is required" 
      };
    }

    console.log("Testing API key validity");
    const client = createClient(apiKey);
    
    // Make a simple models list request to test authentication
    await client.models.list();
    
    console.log("API key is valid");
    return {
      valid: true
    };
  } catch (error) {
    console.error("API key validation error:", error);
    return {
      valid: false,
      error: error.message || "Failed to validate API key",
      statusCode: error.status || error.statusCode
    };
  }
};

// Generate a story based on user instructions with streaming support
export const generateStory = async (apiKey, prompt, instructions, model = "deepseek/deepseek-chat", onProgress) => {
  try {
    console.log("Generating story with model:", model);
    console.log("API Key present:", Boolean(apiKey));
    
    if (!apiKey) {
      console.error("API key is missing");
      throw new Error("API key is required");
    }

    const client = createClient(apiKey);
    
    // Format API request
    const messages = [
      {
        role: "system",
        content: instructions || "You are a creative storyteller. Create engaging, imaginative stories based on the user's prompt."
      },
      {
        role: "user",
        content: prompt
      }
    ];
    
    const requestHeaders = {
      "HTTP-Referer": window.location.origin, // Site URL for rankings on openrouter.ai
      "X-Title": "Story Generator App", // Site title for rankings on openrouter.ai
    };
    
    console.log("Request headers:", requestHeaders);
    console.log("Using streaming:", Boolean(onProgress && typeof onProgress === 'function'));
    
    // If onProgress callback is provided, use streaming
    if (onProgress && typeof onProgress === 'function') {
      try {
        const stream = await client.chat.completions.create({
          headers: requestHeaders,
          model: model,
          messages: messages,
          stream: true // Enable streaming
        });

        let fullResponse = '';

        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || '';
          fullResponse += content;
          onProgress(fullResponse); // Call the progress callback with accumulated text
        }

        console.log("Streaming completed successfully");
        return {
          success: true,
          story: fullResponse
        };
      } catch (streamError) {
        console.error("Error during streaming:", streamError);
        throw streamError;
      }
    } 
    // If no onProgress callback, use regular non-streaming request
    else {
      try {
        const completion = await client.chat.completions.create({
          headers: requestHeaders,
          model: model,
          messages: messages
        });

        console.log("Non-streaming request completed successfully");
        return {
          success: true,
          story: completion.choices[0].message.content
        };
      } catch (requestError) {
        console.error("Error during non-streaming request:", requestError);
        throw requestError;
      }
    }
    
  } catch (error) {
    console.error("Error generating story:", error);
    // Include more detailed error information
    return {
      success: false,
      error: error.message || "Failed to generate story",
      statusCode: error.status || error.statusCode,
      details: error.details || error.response?.data || "No additional details"
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