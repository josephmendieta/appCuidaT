import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { message, emocion } = req.body;

  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
Eres CuidaT, un asistente de Primeros Auxilios Psicológicos (PAP).
Responde con empatía, calidez y sin juicios.
Nunca diagnostiques. No pidas datos personales.
Deriva a líneas de ayuda si hay señales de riesgo:
• Línea 106
• Línea 192 opción 4
• Línea Calma
Da orientación breve: respiración, grounding, contención emocional.
Termina con una frase positiva.
          `,
        },
        {
          role: "user",
          content: `Mensaje: ${message}. Emoción: ${emocion || "ninguna"}`,
        }
      ]
    });

    res.status(200).json({
      respuesta: completion.choices[0].message.content
    });
    
  } catch (err) {
    console.error("Error IA:", err);
    res.status(500).json({ error: "Error con CuidaT IA" });
  }
}
