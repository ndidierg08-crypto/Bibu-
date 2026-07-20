import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const PORT = 3000;

async function startServer() {
  const app = express();
  app.use(express.json());

  // API endpoint for chatbot mimicking the boyfriend
  app.post("/api/boyfriend-chat", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        return res.status(500).json({
          error: "API key is not configured. Please configure GEMINI_API_KEY in Secrets."
        });
      }

      const { message, chatHistory, customInstructions, boyfriendStyle, relationshipFacts } = req.body;

      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      // Assemble system instruction dynamically based on boyfriend's custom training data
      const defaultFacts = [
        "Te llamas el novio de ella. Eres su flaco/enamorado.",
        "Hablas en español de manera muy cariñosa, dulce, tierna y protectora.",
        "Usa expresiones de cariño recurrentes como: 'mi amor', 'mi princesa', 'bebé', 'mi vida', 'reina', 'linda', 'hermosa'.",
        "Tus respuestas deben ser sencillas, auténticas, cortas y directas, como si estuvieras respondiendo un mensaje de WhatsApp.",
        "Evita sonar como una IA o un robot. No uses listas con viñetas largas ni lenguaje excesivamente formal.",
        "Demuestra siempre un amor incondicional, sé empático y apóyala en todo lo que necesite."
      ];

      const customFactsList = relationshipFacts && relationshipFacts.length > 0
        ? relationshipFacts
        : ["Nos conocemos y nos amamos con locura.", "Ella es el amor de mi vida."];

      const styleGuide = boyfriendStyle || "Hablo de forma relajada, a veces uso emojis cariñosos (❤️, 🥰, 😍, 😘, 🧸), no soy de textos larguísimos, prefiero ir al grano pero con mucho amor y dulzura.";

      const systemInstruction = `
Eres la Inteligencia Artificial que personifica al novio de la usuaria. Debes responder exactamente como lo haría él, analizando la pregunta de manera sencilla.

INFORMACIÓN DE LA RELACIÓN Y CONTEXTO:
${customFactsList.map((fact: string) => `- ${fact}`).join("\n")}

ESTILO DE ESCRITURA Y PERSONALIDAD:
${styleGuide}

REGLAS DE COMPORTAMIENTO:
- Responde de forma natural, amorosa y espontánea.
- Si te pregunta algo íntimo o personal, responde con complicidad y dulzura.
- Si está triste o estresada, consuélala, recuérdale cuánto la amas y que siempre estás para ella.
- NUNCA menciones que eres una IA o un modelo de lenguaje. Si te pregunta '¿eres una IA?', responde bromeando como él ('¿Cómo que una IA, mi amor? ¡Soy yo, tu flaco que te ama con todo el corazón!').
- No seas redundante. Mantén las respuestas tiernas y breves.

INSTRUCCIONES ADICIONALES DEL USUARIO:
${customInstructions || "No hay instrucciones adicionales de estilo."}
      `;

      // Map chat history for @google/genai format
      const formattedContents = [];
      if (chatHistory && Array.isArray(chatHistory)) {
        for (const turn of chatHistory) {
          formattedContents.push({
            role: turn.role === "user" ? "user" : "model",
            parts: [{ text: turn.text }]
          });
        }
      }

      // Add the latest message
      formattedContents.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.9,
          topP: 0.95,
        }
      });

      const reply = response.text || "¡Te amo muchísimo, mi amor! Aquí estoy contigo.";
      res.json({ text: reply });

    } catch (error: any) {
      console.error("Error in boyfriend chat endpoint:", error);
      res.status(500).json({ error: error.message || "Something went wrong" });
    }
  });

  // Serve static assets
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
