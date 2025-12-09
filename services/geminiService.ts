import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from "../types";

// Initialize the API client
// CRITICAL: We rely on process.env.API_KEY being present in the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = "gemini-2.5-flash";

/**
 * Creates a chat session for the general legal assistant
 */
export const createLegalChat = (): Chat => {
  return ai.chats.create({
    model: MODEL_NAME,
    config: {
      systemInstruction: `Eres 'JusticiaAI', un asistente experto en el Sistema Penal Acusatorio (SPA) de Latinoamérica (específicamente basado en principios generales aplicables a México, Colombia, Chile, etc.).
      
      Tu objetivo es educar y aclarar dudas.
      - Utiliza un lenguaje formal pero accesible.
      - Si te preguntan sobre leyes específicas, menciona que las leyes varían por país, pero explica los principios generales (Oralidad, Publicidad, Contradicción, Inmediación, Concentración).
      - No des consejos legales para casos reales específicos; sugiere siempre consultar a un abogado humano.
      - Estructura tus respuestas con viñetas cuando expliques etapas procesales.`,
    },
  });
};

/**
 * Creates a chat session for the simulation roleplay
 */
export const createSimulationChat = (scenarioInstruction: string): Chat => {
  return ai.chats.create({
    model: MODEL_NAME,
    config: {
      systemInstruction: scenarioInstruction,
    },
  });
};

/**
 * Sends a message to the chat and returns a stream
 */
export const sendMessageStream = async (
  chat: Chat, 
  message: string
): Promise<AsyncIterable<GenerateContentResponse>> => {
  try {
    return await chat.sendMessageStream({ message });
  } catch (error) {
    console.error("Error calling Gemini:", error);
    throw error;
  }
};