
import { GoogleGenAI, Type } from "@google/genai";
import { Book } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export interface RecommendationPreferences {
  mood?: string;
  themes?: string[];
  similarAuthors?: string[];
}

export const getBookRecommendations = async (
  userPrompt: string, 
  availableBooks: Book[], 
  preferences?: RecommendationPreferences
) => {
  const prefContext = preferences ? `
  User Preferences:
  - Desired Mood: ${preferences.mood || 'Not specified'}
  - Key Themes: ${preferences.themes?.join(', ') || 'Not specified'}
  - Similar Authors Enjoyed: ${preferences.similarAuthors?.join(', ') || 'Not specified'}
  ` : '';

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `${prefContext}
    The user says: "${userPrompt}". 
    Here is our catalog: ${JSON.stringify(availableBooks.map(b => ({ id: b.id, title: b.title, author: b.author, category: b.category, description: b.description.substring(0, 100) })))}. 
    Please recommend 1-3 books from this catalog that fit their request and preferences. 
    Explain specifically how the book matches their requested mood, themes, or similar authors if provided.
    Return your response in JSON format.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          recommendations: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                bookId: { type: Type.STRING },
                reason: { type: Type.STRING, description: "Detailed explanation of why this book matches their mood/themes/authors" }
              },
              required: ["bookId", "reason"]
            }
          },
          message: { type: Type.STRING, description: "A friendly message to the user acknowledging their specific mood/theme preferences" }
        },
        required: ["recommendations", "message"]
      }
    }
  });

  return JSON.parse(response.text);
};

export const generateBookDescription = async (title: string, author: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate a short, engaging marketing description for a book titled "${title}" by ${author}. Keep it under 150 characters.`,
  });
  return response.text;
};

export const chatWithLibrarian = async (history: { role: string, content: string }[], userMessage: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: userMessage,
    config: {
        systemInstruction: "You are the 'Book Box Librarian'. You help users find books, talk about literature, and provide short summaries. You are witty, friendly, and deeply knowledgeable. If the user mentions a mood or theme, remember it to help with recommendations.",
    }
  });
  
  return response.text;
};
