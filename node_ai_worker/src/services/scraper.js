import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapePage(url) {
  try {
    const res = await axios.get(url);

    const $ = cheerio.load(res.data);

    let content = "";

  const selectors = [
    "article .article-body p",
    "article .entry-content p",
    "article .blog-content p",
    "article p",
    ".hs_cos_wrapper p",
    ".blog-post__body p",
    ".field__item p",
    ".article-body p",
    ".entry-content p",
    ".blog-content p",
    ".richtext p",
    ".page-content p",
    ".ibm-grid p",
    ".ibm--row p",
    ".ibm-text p",
    "main p"
  ];

 for (const selector of selectors) {

    const count = $(selector).length;
    console.log(`Selector "${selector}" → ${count} matches`);

    if (count > 0) {
      let sample = [];

      $(selector).each((_, el) => {
        const text = $(el).text().trim();
        if (text) {
          content += text + "\n\n";
          if (sample.length < 3) sample.push(text);
        }
      });

      console.log("\nSample paragraphs from:", selector);
      console.log(sample);
      break;
    }
  }

    return content;

  } catch (err) {
    console.error("Scrape failed:", err.message);
    return "";
  }
}
