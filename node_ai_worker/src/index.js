import { getLatestArticles, createArticles } from "./services/api.js";
import { scrapePage } from "./services/scraper.js";
import { rewriteArticle } from "./LLM/groq_ai.js";
import dotenv from "dotenv";
import path from "path";


import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });


async function main() {

  const articles = await getLatestArticles();
  console.log("Fetched Articles:", articles);
  if (!Array.isArray(articles) || articles.length === 0) {
    console.log(" No articles found");
    return;
  }

  const article =
    articles.find(a => !a.is_ai_generated) ??
    articles[0];

  if (!article?.content) {
    console.log("Article has no content");
    return;
  }

  console.log("\nUsing Article:");
  console.log(article.title);
  console.log(article.content.substring(0, 200));

  const referenceUrls = [
    "https://blog.hubspot.com/marketing/what-is-ai",
    "https://www.ibm.com/topics/artificial-intelligence"
  ];

  const references = [];

  for (const url of referenceUrls) {
    try {
      const content = await scrapePage(url);
      console.log(`Scraped reference: ${url} (${content.length} chars)`);

      references.push({ url, content });
    } catch (err) {
      console.log(` Failed to scrape ${url}`, err.message);
    }
  }

  // Safety check
  if (!references.length || !references[0].content) {
    console.log(" No valid reference content. Stopping.");
    return;
  }
  console.log("\n Reference #1 Preview:");
  console.log(references[0].content.substring(0, 200));

  console.log("\n Reference #2 Preview:");
  console.log(references[1].content.substring(0, 200));

  console.log("\n Rewriting using Gemini...");
  const rewritten = await rewriteArticle(article.content, references);

  console.log("\n✔Rewritten Article Preview:");
  console.log(rewritten.substring(0, 500));


  console.log("\n🎉 DONE");
}

main();