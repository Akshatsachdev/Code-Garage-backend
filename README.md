### ✅ **README.md**

```markdown
# Code-Garage Backend 🚀

Code-Garage Backend is a **Node.js + TypeScript** application that powers the **AI-powered expense management and gamification system**.  
It integrates **Google Cloud Vertex AI (Gemini)** for conversational AI and budgeting insights, and **Cloud Translation API** for multilingual support.

---

## ✅ Features
- **Gemini AI Chatbot** – Conversational AI for expense tips and budgeting.
- **Expense Insights** – AI-powered financial analysis and savings recommendations.
- **Multilingual Support** – Auto-translation for user messages using Google Cloud Translation API.
- **Gamification Engine** – Streak Builder and reward-based challenges.
- **Secure Environment Setup** – No credentials stored in code.

---

## ✅ Tech Stack
- **Backend Framework**: Node.js + Express + TypeScript
- **AI**: Google Vertex AI (Gemini)
- **Translation**: Google Cloud Translation API
- **Hosting**: Firebase / Google Cloud Run (Optional)
- **Database**: Firestore (Optional, can be removed if not used)
- **Environment Management**: dotenv

---

## ✅ Project Structure
```

project-raseed-backend/
├── src/
│   ├── app.ts              # Express app setup
│   ├── server.ts           # Server entry point
│   ├── configs/
│   │   ├── gemini.config.ts    # Vertex AI configuration
│   │   └── google.config.ts    # Google Cloud credentials setup
│   ├── routes/
│   │   ├── ai.routes.ts        # AI routes (chat & insights)
│   ├── services/
│   │   ├── ai.service.ts       # AI logic using Gemini API
│   │   ├── translation.service.ts # Google Translation
│   │   └── memory.service.ts    # (Optional) Firestore chat memory
│   ├── utils/
│   │   └── logger.ts           # Custom logger
│   └── jobs/                   # Future scheduled tasks
├── package.json
├── tsconfig.json
└── .env (not committed)

````

---

## ✅ Setup Instructions

### 1️⃣ **Clone the Repo**
```bash
git clone https://github.com/Akshatsachdev/Code-Garage-backend.git
cd Code-Garage-backend
````

### 2️⃣ **Install Dependencies**

```bash
npm install
```

### 3️⃣ **Setup Environment Variables**

Create a `.env` file:

```
GCLOUD_PROJECT_ID=your-project-id
GOOGLE_APPLICATION_CREDENTIALS=./service-account.json
LOCATION=us-central1
VERTEX_AI_MODEL=gemini-1.5-pro
PORT=3000
```

### 4️⃣ **Add Google Credentials**

Download your **service-account.json** from Google Cloud Console and place it in the root folder.
**⚠ Do NOT commit this file to GitHub. It is ignored in `.gitignore`.**

### 5️⃣ **Build and Run**

For development:

```bash
npm run dev
```

For production:

```bash
npm run build
npm start
```

---

## ✅ API Endpoints

### **1. AI Chat**

```
POST /api/ai/chat
```

**Request Body:**

```json
{
  "message": "Give me some budgeting tips",
  "userId": "user123",
  "language": "en"
}
```

**Response:**

```json
{
  "response": "Here are some budgeting tips..."
}
```

### **2. Expense Insights**

```
POST /api/ai/insights
```

**Request Body:**

```json
{
  "transactions": [
    { "date": "2025-07-20", "amount": 500, "category": "Food" },
    { "date": "2025-07-21", "amount": 1500, "category": "Shopping" }
  ],
  "userId": "user123"
}
```

---

## ✅ Deployment

* **Firebase Hosting (Frontend)**
* **Backend Options**:

  * Google Cloud Run
  * Firebase Functions
  * Any Node.js hosting platform

---

## ✅ Security

* All sensitive data is stored in `.env` and not pushed to GitHub.
* Google credentials are ignored in `.gitignore`.

---

## ✅ License

MIT License © 2025 [Akshat Sachdeva](https://github.com/Akshatsachdev)

---
