# 🚀 URL Shortener

A simple and modern URL shortener built with **Netlify Functions** and **Supabase**.

## Features
I mean, shortening urls!? (to be fair i'm likely making them longer cause netlify free urls 💅) (added a bit of analitics)

## 🛠️ Tech Stack
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Netlify Functions (Serverless)
- **Database:** Supabase (PostgreSQL)

## 🚀 Getting Started
### 1️⃣ Clone the repository
```sh
 git clone https://github.com/YOUR_USERNAME/URL-Shortener.git
 cd URL-Shortener
```

### 2️⃣ Install dependencies
```sh
npm install
```

### 3️⃣ Set up Supabase
1. Go to [Supabase](https://supabase.com/) and create an account.
2. Create a new project and a table named `urls` with columns:
   - `id` (Primary Key, UUID)
   - `short_code` (Text, Unique)
   - `long_url` (Text)
   - `click_count` (Integer, Default: 0)
3. Copy your **Supabase URL** and **Anon Key**.

### 4️⃣ Set up environment variables
Create a `.env` file in your root directory:
```sh
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5️⃣ Run locally
```sh
netlify dev
```
Then open **http://localhost:8888** in your browser.

## 🌍 Deployment
### Deploy to **Netlify**
1. Push your project to GitHub.
2. Go to [Netlify](https://www.netlify.com/) and create a new site.
3. Link your GitHub repo and deploy.

### Deploy to **Vercel** (Optional)
```sh
vercel
```

## 📜 License
This project is open-source and available under the **MIT License**.

---
