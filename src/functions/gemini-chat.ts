
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function handler(event: any, context: any) {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { message, context } = JSON.parse(event.body);
    
    if (!message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Message is required' }),
      };
    }

    // Initialize Gemini AI (you'll need to set this as an environment variable)
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is not set');
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
You are a helpful assistant for Skill Nexus, a community-driven learning platform. 

Context about Skill Nexus:
${context}

User question: ${message}

Please provide a helpful, accurate response about Skill Nexus. Keep your response concise and friendly. If the question is not related to Skill Nexus, politely redirect the conversation back to the platform.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ response: text }),
    };

  } catch (error) {
    console.error('Error in gemini-chat function:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: 'Failed to process your request. Please try again.'
      }),
    };
  }
}
