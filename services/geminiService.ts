
import { GoogleGenAI, Type, Modality } from "@google/genai";

// Note: process.env.API_KEY is handled externally.
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Finds nearby premium stores using Gemini 2.5 Flash with Google Maps Grounding.
 */
export async function findNearbyPremiumStores(lat: number, lng: number) {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Find high-end grocery and kirana stores near my location. Focus on premium brands and quality.",
    config: {
      tools: [{ googleMaps: {} }],
      toolConfig: {
        retrievalConfig: {
          latLng: {
            latitude: lat,
            longitude: lng
          }
        }
      }
    },
  });

  return {
    text: response.text,
    chunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
  };
}

/**
 * Generates premium product mockup images using Gemini 3 Pro Image.
 */
export async function generateProductMockup(prompt: string, size: "1K" | "2K" | "4K" = "1K") {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: {
      parts: [{ text: `High-end cinematic photography of ${prompt}, luxury packaging, gold and green theme, studio lighting.` }],
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1",
        imageSize: size
      }
    },
  });

  let imageUrl = '';
  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      imageUrl = `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return imageUrl;
}

/**
 * Generates an animated video of a product using Veo.
 */
export async function animateProductVideo(base64Image: string, prompt: string) {
  const ai = getAI();
  let operation = await ai.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt: prompt || 'Slow cinematic panning shot revealing the luxury texture and gold details of this gourmet product.',
    image: {
      imageBytes: base64Image.split(',')[1],
      mimeType: 'image/png',
    },
    config: {
      numberOfVideos: 1,
      resolution: '720p',
      aspectRatio: '16:9'
    }
  });

  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 5000));
    operation = await ai.operations.getVideosOperation({ operation: operation });
  }

  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
  const res = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
  const blob = await res.blob();
  return URL.createObjectURL(blob);
}
