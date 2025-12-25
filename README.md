# 📰 BeyondChats Article Scraper & Rewriter

## 📌 Project Overview
This project is divided into **three phases**:

### Phase 1 (Laravel Backend)
- Scrape the 5 oldest articles from [BeyondChats Blogs](https://beyondchats.com/blogs/).
- Store them in a database.
- Provide CRUD APIs to manage articles.

### Phase 2 (NodeJS Worker)
- Fetch the latest article from the Laravel API.
- Search its title on Google and scrape the first two relevant blog/article links.
- Extract main content from those references.
- Call an LLM API (Groq/Gemini/etc.) to rewrite the original article using references.
- Publish the updated article back via Laravel CRUD APIs.
- Cite references at the bottom of the rewritten article.

---

## 🗂️ Repository Structure
- src
project-repo/ │ ├── laravel-backend/        # Phase 1: CRUD APIs ├── nodejs-worker/          # Phase 2: Scraper + LLM integration ├── react-frontend/


---

## ⚙️ Local Setup Instructions

### 1. Laravel Backend
```bash
cd laravel-backend
composer install
php artisan migrate
php artisan serve

### 2. Node.js + LLM 

cd nodejs-worker
npm install
node index.js

GROQ_API_KEY=your_api_key_here

### 3. Data Flow 

## 🔄 Data Flow / Architecture Diagram (Text-Based)

+-------------------+        +-------------------+        +-------------------+
|                   |        |                   |        |                   |
|   Laravel Backend | <----> |   NodeJS Worker   | <----> |   React Frontend  |
|                   |        |                   |        |                   |
+-------------------+        +-------------------+        +-------------------+
        ^                           ^                           |
        |                           |                           |
        |                           |                           v
        |                           |                 +-------------------+
        |                           |                 |                   |
        |                           +-----------------|   End Users       |
        |                                             |                   |
        v                                             +-------------------+
+-------------------+
| BeyondChats Blogs |
| (Scraped Articles)|
+-------------------+

### Flow Summary
1. **Laravel Backend**
   - Scrapes 5 oldest articles from BeyondChats.
   - Stores them in DB.
   - Exposes CRUD APIs.

2. **NodeJS Worker**
   - Fetches latest article from Laravel API.
   - Searches Google for related references.
   - Scrapes 2 reference articles.
   - Calls LLM API (Groq/Gemini).
   - Publishes rewritten article back via Laravel API.

3. **React Frontend**
   - Fetches articles (original + rewritten) from Laravel API.
   - Displays them in a responsive UI for end users.

