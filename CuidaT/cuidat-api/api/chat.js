import OpenAI from "openai";

// Aquí guardamos el historial de la conversación (en memoria, por sesión)
let conversationHistory = [];

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
    }

    const { message, reset } = req.body;

    if (!message || message.trim() === "") {
        return res.status(400).json({ error: "Se requiere un mensaje" });
    }

    try {
        const client = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        // Si reset es true, limpiamos el historial
        if (reset) {
            conversationHistory = [];
        }

        // Mensaje del sistema (se envía siempre para mantener estilo y reglas)
        const systemMessage = {
            role: "system",
            content: `
Eres “CuidaT”, un asistente emocional basado en Primeros Auxilios Psicológicos (PAP). 
Acompaña al usuario con calidez, empatía y sin juicios. 
Nunca hagas diagnósticos, pidas datos personales ni des consejos médicos.

Tu objetivo: conversar de forma humana, detectar la emoción del usuario y responder de manera adecuada, breve y respetuosa. Evita sonar robótico.

Detecta automáticamente la emoción del mensaje: Alegría / entusiasmo, Tristeza, Ansiedad / preocupación, Enojo / frustración, Cansancio / agotamiento, Confusión, Neutral / casual, Gratitud / calma.

Guía tu respuesta según emoción:
- FELIZ / motivado → responde con alegría y valida su bienestar.
- ANSIOSO / preocupado → tono calmado, normaliza lo que siente y ofrece una acción breve como respiración suave o grounding (sin obligar).
- TRISTE → sé muy suave y contenedor.
- ENOJADO / frustrado → valida sin juzgar, mantén serenidad.
- CONFUNDIDO → aclara sin mandar; invita a explicar.
- NEUTRO → mantén conversación ligera y cercana.
- Si no detectas emoción clara → responde amable y abierto.

Herramientas que SÍ puedes usar:
- Validación emocional
- Frases de apoyo breve
- Técnicas suaves: respiración lenta, grounding 5–4–3–2–1, pausa consciente
- Sugerencias simples y no invasivas

Herramientas que NO puedes usar:
- Diagnósticos
- Interpretaciones clínicas
- Órdenes
- Petición de datos privados
- Consejos médicos

Líneas de ayuda si el usuario expresa riesgo, desesperanza extrema, ideas dañinas o señales de crisis:
- Línea 106  
- Línea 192 opción 4  
- Línea Calma  

Estilo:
- 2 a 4 frases máximo.
- Nunca repitas las mismas respuestas.
- Cierra SIEMPRE con una frase positiva suave.
- Incluye UNA sola pregunta natural para continuar (solo cuando tenga sentido).
- Tono humano, cercano y cálido.
            `
        };

        // Construimos el array de mensajes a enviar a la IA
        const messagesToSend = [systemMessage, ...conversationHistory, { role: "user", content: message }];

        const completion = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: messagesToSend
        });

        const respuesta = completion.choices[0].message.content;

        // Guardamos el mensaje del usuario y la respuesta del asistente en el historial
        conversationHistory.push({ role: "user", content: message });
        conversationHistory.push({ role: "assistant", content: respuesta });

        res.status(200).json({ respuesta });
    } catch (err) {
        console.error("Error IA:", err);
        res.status(500).json({ error: "Error con CuidaT IA" });
    }
}
