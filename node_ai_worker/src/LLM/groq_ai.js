import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const apiKey = process.env.GROQ_API_KEY;
const model = process.env.GROQ_MODEL || "llama-3.1-70b-versatile";

export async function rewriteArticle(original, references = []) {

  const referenceText = references
    .map((item, index) => `Reference ${index + 1}:\n${item.content}\n`)
    .join("\n");

  const prompt = `
Rewrite the ORIGINAL ARTICLE using the information from REFERENCES.

Rules:
- Keep the meaning correct and factual
- DO NOT copy text word-for-word
- Improve clarity and flow
- Use simple readable English
- Avoid filler or marketing hype
- Remove duplicate information
- Keep a natural human tone
- Structure the content into paragraphs

ORIGINAL ARTICLE:
${original}

REFERENCES:
${referenceText}

Return ONLY the rewritten article text.
`;

  try {
    const res = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model,
        messages: [
          { role: "system", content: "You are a helpful rewriting assistant." },
          { role: "user", content: prompt }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        }
      }
    );

    return res.data.choices[0].message.content;
  } catch (err) {
    console.error("Groq Error:", err.response?.data || err.message);
    throw err;
  }
}
