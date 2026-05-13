# Application for library system

HOME <img width="1176" height="609" alt="Screenshot 2026-05-13 161904" src="https://github.com/user-attachments/assets/69879429-27dc-467d-83cb-6ef15074fd16" 

login <img width="335" height="396" alt="Screenshot 2026-05-13 162643" src="https://github.com/user-attachments/assets/3861c724-64e2-4482-94c3-529c313fbbf6" />

Register <img width="500" height="472" alt="Screenshot 2026-05-13 164456" src="https://github.com/user-attachments/assets/2943b00c-cc02-414f-b849-14544393a2c8" />

Blog <img width="1184" height="611" alt="Screenshot 2026-05-13 162952" src="https://github.com/user-attachments/assets/ed8c2b94-565c-4be9-9c09-2899ebd06633" />

# 📚 KLE Library Management System

> A high-performance **Library Management System** with an F1-inspired modern UI, supporting multi-user portals for **Students, Employees, and Admins**.

---

## 🚀 Features

- 🔐 Authentication System
- 👨‍🎓 Student Portal
- 👨‍💼 Employee Portal
- 🛠️ Admin Dashboard
- 📖 Book Management
- 🔍 Smart Search & Filtering
- 🎨 Responsive Modern UI
- ⚡ Fast React + Vite Performance
- 📦 REST API Integration
- 🧩 Reusable Component Architecture

---

## 🛠️ Tech Stack

| Frontend | Backend | Styling | Tools |
|----------|----------|----------|-------|
| React 19 | Express.js | Tailwind CSS | Vite |
| TypeScript | Node.js | Motion UI | TSX |

---

# 📂 Project Structure

```bash
KLE-Library/
│
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── BookCard.tsx
│   │   ├── BookModal.tsx
│   │   ├── Login.tsx
│   │   └── Register.tsx
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── server.ts
├── package.json
├── vite.config.ts
└── tsconfig.json
⚙️ Installation
1️⃣ Clone Repository
git clone https://github.com/your-username/kle-library.git
cd kle-library
2️⃣ Install Dependencies
npm install
3️⃣ Run Development Server
npm run dev
🖥️ Available Scripts
npm run dev      # Start development server
npm run build    # Build production app
npm run start    # Start backend server
npm run lint     # TypeScript validation
📸 Core Modules
👨‍🎓 Student
View Books
Search Library
Borrow Books
View Book Details
👨‍💼 Employee
Manage Borrow Requests
Track Issued Books
🛠️ Admin
Add/Edit/Delete Books
Manage Users
Full System Access
🔍 Search & Filters
const [searchQuery, setSearchQuery] = useState('');
const [filterType, setFilterType] =
  useState<'ALL' | 'LATEST' | 'ANIMATED'>('ALL');
📦 API Example
const response = await fetch('/api/books');
const data = await response.json();
🎨 UI Highlights
Smooth Motion Animations
F1 Inspired Theme
Responsive Layout
Modal Based Book Details
Interactive Navigation
