import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

type Data = {
  reply?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { userId, message } = req.body;

  if (!userId || !message) {
    return res.status(400).json({ error: "Missing userId or message" });
  }

  try {
    // Construct a system prompt for the AI
    const systemPrompt = `
      You are a professional coach assisting athletes.
      Give advice, motivation, and guidance based on the message received.
    `;

    const payload = {
      model: "gemini-1.5", // or whichever model you have access to
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
    };

    const response = await fetch("https://api.gemini.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      console.error("Gemini API error:", errData);
      return res.status(500).json({ error: "Failed to get AI response" });
    }

    const data = await response.json();

    // Gemini API usually returns something like data.choices[0].message.content
    const aiReply =
      data.choices?.[0]?.message?.content || "No response from AI.";

    res.status(200).json({ reply: aiReply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}
