
# 🧠 AI-Powered Knowledge Hub

An AI-enhanced content publishing platform where users can create, preview, and publish articles — with features like AI-powered generation, summarization, and Q&A. Built with **Next.js App Router**, **Langchain**, and **OpenAI API**.

## 🚀 Live Demo
🔗 [ai-content-hub.vercel.app](https://ai-content-hub-ruddy.vercel.app/)

## ✨ Features

- 📝 **Article Creation** with a rich-text Tiptap editor
- 🤖 **AI Article Generation** using OpenAI (via Langchain)
- 📄 **Article Summarization** and **Q&A**
- 📸 Cover Image Upload & Preview
- 🔍 Real-time Search
- 🧠 Prompt memory for iterative AI interaction
- 🧾 Auto-generated Slugs
- 📱 Fully Responsive Design (Violet Theme)
- 👤 Profile Avatar with dropdown/logout

## 🧰 Tech Stack

| Layer         | Tech                                     |
|---------------|------------------------------------------|
| Frontend      | Next.js (App Router), Tailwind CSS, Tiptap, TypeScript |
| State         | Zustand                                  |
| Backend/API   | Next.js API Routes, Prisma ORM, SQLite   |
| AI Integration| Langchain + OpenAI API                   |

## 📦 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Rohit2697/ai-content-hub.git
cd ai-content-hub
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Setup Environment Variables

Create a `.env.local` file:

```env
OPENAI_API_KEY=your-openai-api-key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4. Setup the Database

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to start using the app.

## 💡 Folder Structure

```
app/                 # Next.js App Router pages
components/          # UI and layout components
lib/                 # Utility functions
db/                  # Prisma schema and database access
public/              # Static assets
```

## 🧠 AI Capabilities

All AI features are powered by OpenAI via Langchain:

- **Generate Article**: Write an article from a simple prompt.
- **Summarize**: Condense long articles into TL;DRs.
- **Q&A**: Ask questions about article content.

Langchain memory allows **prompt history** and multi-turn conversations for AI refinement.

## 🔐 Authentication

Currently the app uses a lightweight token-based auth system (with `token` cookie). In production, consider integrating with providers like NextAuth or Clerk.

## 🛠 Planned Features

- 🔐 OAuth-based authentication
- 📬 Commenting system
- 📈 Analytics dashboard
- 🧾 Markdown export

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Fork the repo
- Create a new branch
- Submit a pull request


## 🙋‍♂️ Author

**Rohit Dey**  
🔗 [LinkedIn](https://www.linkedin.com/in/rohit-dey-7564a0123/)  
💻 [Portfolio](https://ai-content-hub-ruddy.vercel.app/)
