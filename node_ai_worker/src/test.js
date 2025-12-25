import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const apiKey = process.env.GROQ_API_KEY;
console.log("Using key prefix:", apiKey?.slice(0, 5)); // safe debug

async function testGroq() {
  try {
    const res = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant", // ✅ valid free model
        messages: [
          {
            role: "user",
            content: "Write one short sentence saying Hello from Groq!"
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("\nGroq Response:\n", res.data.choices[0].message.content);
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
}

testGroq();