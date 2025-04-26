import { OpenAI } from 'openai';

// Create a simpler OpenAI client with OpenRouter configuration
const createClient = (apiKey) => {
  return new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: apiKey,
    dangerouslyAllowBrowser: true,
    defaultHeaders: {
      "HTTP-Referer": window.location.href,
      "X-Title": "Hindi Story Generator"
    }
  });
};

// Generate a story (simplified)
export const generateStory = async (userMessage, apiKey, onProgress, model = "deepseek/deepseek-r1:free") => {
  try {
    console.log("Generating story with model:", model);
    console.log("Using API Key:", apiKey.substring(0, 10) + "...");
    
    // Create OpenRouter API client
    const client = createClient(apiKey);

    const systemMessage = `You are an expert Hindi storyteller. Create a story in Hindi with Devanagari script.
    
${formattingInstructions}`;

    const messages = [
      { role: "system", content: systemMessage },
      { role: "user", content: userMessage }
    ];

    // Use streaming for real-time updates
    console.log("Using streaming mode");
    let accumulatedText = "";

    const stream = await client.chat.completions.create({
      model: model,
      messages: messages,
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      accumulatedText += content;
      onProgress(accumulatedText);
    }

    return {
      success: true,
      story: accumulatedText
    };
  } catch (error) {
    console.error("Error generating story:", error);
    return {
      success: false,
      error: error.message || "Failed to generate story",
      statusCode: error.status || error.statusCode
    };
  }
};

// Test if the API key is valid (simplified)
export const testApiKey = async (apiKey) => {
  try {
    const client = createClient(apiKey);
    const models = await client.models.list();
    console.log("API key is valid. Available models:", models.data);
    return { valid: true };
  } catch (error) {
    console.error("API key validation error:", error);
    return {
      valid: false,
      error: error.message || "Failed to validate API key",
      statusCode: error.status || error.statusCode
    };
  }
};

const formattingInstructions = `
Format the story with proper markdown:
1. Use a bold title at the beginning of the story: **Title**
2. Use level 2 headings (##) for section breaks if appropriate
3. Include relevant emojis to enhance the storytelling experience
4. Use proper paragraph breaks for readability
5. Use **bold** for emphasis on important phrases
6. Use *italics* for character thoughts or special terms
7. Use > for quotes or special callouts when appropriate
8. Use numbered lists for sequences of events when it makes sense
9. Format the story in a professional, engaging way

The story should be well-structured with a clear beginning, middle, and end.
`;

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