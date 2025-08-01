
````markdown
 🧾 Project Raseed Backend

A modular Node.js + TypeScript backend for Project Raseed, an AI-powered receipt management and financial advisory system.  
This backend simulates integrations with Google Cloud and Firebase services using mock implementations for efficient local development and testing.

---

 🚀 Features

- 🔐 Firebase Auth (Mock) – Simulates role-based login & session handling
- 🧾 Firestore (Mock) – Mimics database for users, receipts, transactions
- 📷 Google Vision API (Mock) – OCR for receipt scanning
- 🤖 Vertex AI (Mock) – Conversational assistant for budgeting tips
- 🌐 Translation API (Mock) – Multilingual chatbot support
- 🔔 Google Pub/Sub (Mock) – Handles async tasks
- 🧩 Modular Express.js – Well-structured and scalable backend design

---

 📦 Prerequisites

- Node.js ≥ 18.x
- TypeScript ≥ 5.x

---

 🔧 Getting Started

 🔗 Repository

GitHub: [Project-Raseed-Backend](https://github.com/Akshatsachdev/Project-Raseed-Backend)

 📁 Setup Instructions

1. Clone the Repository

```bash
git clone https://github.com/Akshatsachdev/Project-Raseed-Backend.git
cd Project-Raseed-Backend
````

2. Install Dependencies

```bash
npm install
```

3. Create `.env` File

Create a `.env` file in the root directory with the following content:

```env
PORT=8080
GOOGLE_CLOUD_PROJECT=project-raseed
```

4. Run in Development Mode

```bash
npm run dev
```

5. Build the Project

```bash
npm run build
```

6. Run Production Server

```bash
npm start
```

---

## 🗂️ Project Structure

```bash
project-raseed-backend/
├── src/
│   ├── configs/          # Firebase & GCP mock configurations
│   ├── controllers/      # Request handlers for API routes
│   ├── middlewares/      # Auth, validation, and error handling
│   ├── repositories/     # Mock Firestore data access logic
│   ├── routes/           # API route definitions
│   ├── services/         # Core business logic (OCR, AI, etc.)
│   ├── types/            # Global TypeScript interfaces and types
│   └── utils/            # Logger, helpers, etc.
├── dist/                 # Compiled JS output (after build)
├── .env                  # Environment config (not committed)
├── package.json
└── README.md
```

---

 🧪 API Testing (cURL / Postman)

 🔐 Register a User

```bash
curl -X POST http://localhost:8080/api/auth/register \
-H "Content-Type: application/json" \
-d '{"email":"test@example.com","password":"password123","role":"user"}'
```

---

 🧾 Upload a Receipt

```bash
curl -X POST http://localhost:8080/api/receipts/upload \
-H "Content-Type: application/json" \
-H "Authorization: Bearer mock-token-user_<random_string>" \
-d '{"imageUrl":"http://example.com/receipt.jpg","userId":"user_<random_string>"}'
```

---

 💬 Chat with AI Assistant

```bash
curl -X POST http://localhost:8080/api/assistant/chat \
-H "Content-Type: application/json" \
-H "Authorization: Bearer mock-token-user_<random_string>" \
-d '{"message":"What is my budget?","userId":"user_<random_string>","language":"en"}'
```

---

 🔐 Environment Variables

| Variable               | Description           | Default          |
| ---------------------- | --------------------- | ---------------- |
| `PORT`                 | Server listening port | `8080`           |
| `GOOGLE_CLOUD_PROJECT` | GCP mock project ID   | `project-raseed` |

---

 📄 License

MIT License © 2025 [Akshat Sachdeva](https://github.com/Akshatsachdev)

```
