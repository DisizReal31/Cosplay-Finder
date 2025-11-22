import { GoogleGenAI, Type } from "@google/genai";
import { IdentifiedItem } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Analyzes the image using Gemini 2.5 Flash to identify fashion items.
 * Returns a structured list of items.
 */
export const analyzeFashionImage = async (base64Image: string): Promise<IdentifiedItem[]> => {
  try {
    // Remove the data URL prefix if present to get raw base64
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: "image/png", // Assuming PNG or JPEG, API handles generic image types well
            },
          },
          {
            text: `Analyse cette image comme un expert de la mode et du cosplay. 
            Identifie chaque vêtement, accessoire, perruque, bijou ou élément de costume porté par la personne.
            Pour chaque élément, fournis :
            - Un nom précis (ex: "Robe lolita gothique", "Armure en mousse EVA", "Perruque bleue style anime")
            - La catégorie (Haut, Bas, Chaussures, Accessoire, Cosplay)
            - La couleur dominante
            - Une courte description vendeuse et "pinkie geek" (fun et précise).
            - Des mots-clés optimisés spécifiquement pour une recherche sur Google Shopping, Amazon ou Etsy (Exclus Shein ou Temu).
            `,
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING }, // We can ask Gemini to generate a uniqueish ID or generate it ourselves later, but asking is fine
              name: { type: Type.STRING },
              category: { type: Type.STRING },
              color: { type: Type.STRING },
              description: { type: Type.STRING },
              searchKeywords: { type: Type.STRING },
            },
            required: ["name", "category", "description", "searchKeywords"],
          },
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Aucune réponse de l'IA.");
    }

    const items = JSON.parse(text) as IdentifiedItem[];
    
    // Ensure IDs exist (fallback)
    return items.map((item, index) => ({
      ...item,
      id: item.id || `item-${index}-${Date.now()}`,
    }));

  } catch (error) {
    console.error("Erreur lors de l'analyse Gemini:", error);
    throw error;
  }
};