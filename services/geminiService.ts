
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: API_KEY });
  }

  async researchWeb(url: string, query: string) {
    const response = await this.ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Perform a deep research analysis on the following URL: ${url}. 
                 Query focus: ${query}. 
                 Provide a structured report including: 
                 1. Executive Summary
                 2. Key Findings
                 3. Data Points (Prices, Specs, Names)
                 4. Conclusion.`,
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 0.7,
      },
    });

    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    return {
      text: response.text,
      sources,
    };
  }

  async extractStructuredData(content: string, schema: any) {
    const response = await this.ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Extract the following structured data from this content: 
                 CONTENT: ${content}
                 REQUIRED FIELDS: ${JSON.stringify(schema)}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: schema.reduce((acc: any, field: any) => {
            acc[field.name] = {
              type: field.type.toUpperCase() as any,
              description: field.description,
            };
            return acc;
          }, {}),
          required: schema.map((f: any) => f.name),
        },
      },
    });

    return JSON.parse(response.text || "{}");
  }

  async analyzeVisualLayout(imageBase64: string, prompt: string) {
    const imagePart = {
      inlineData: {
        mimeType: "image/jpeg",
        data: imageBase64,
      },
    };

    const response = await this.ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: {
        parts: [
          imagePart,
          { text: `Identify the webpage elements, layout, and extract visible information based on this prompt: ${prompt}` },
        ],
      },
    });

    return response.text;
  }

  async generateComparison(researchItems: any[]) {
    const response = await this.ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Compare the following research data and provide a feature-by-feature breakdown:
                 DATA: ${JSON.stringify(researchItems)}
                 Provide the output as a Markdown table followed by a recommendation.`,
      config: {
        thinkingConfig: { thinkingBudget: 2000 }
      }
    });

    return response.text;
  }
}

export const gemini = new GeminiService();
