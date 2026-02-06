# Rock Paper Scissors Pro - Secure Game Module

A professional, pixel-perfect implementation of the classic Rock-Paper-Scissors game, featuring secure user authentication and highly responsive design.

## ≡ƒÜÇ Live Demo
- **Direct Backend/Frontend (Render)**: [https://rock-paper-scissors-26.onrender.com/](https://rock-paper-scissors-26.onrender.com/)

## Γ£¿ Key Features
- **Surgical Precision UI**: Pixel-perfect layout with mathematically aligned game elements.
- **Production-Grade Security**:
  - User Registration & Login with **JWT (JSON Web Tokens)**.
  - Password encryption using **Bcrypt** (12 salt rounds).
- **Responsive Design**: Flawless experience across Mobile, Tablet, and Desktop using Vanilla CSS.
- **Interactive Feedback**: Custom toast notification system for real-time user engagement.
- **State Management**: Persistent user scores across sessions.

## ≡ƒ¢á∩╕Å Technology Stack
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6 Modules).
- **Backend**: Node.js, Express.js.
- **Security**: JWT, Bcrypt.
- **Hosting**: Netlify (Frontend), Render (Backend).

## ≡ƒôª Project Structure
```text
Γö£ΓöÇΓöÇ public/                # Frontend assets and logic
Γöé   Γö£ΓöÇΓöÇ assets/            # Game icons and images
Γöé   Γö£ΓöÇΓöÇ css/               # Modular CSS files
Γöé   Γö£ΓöÇΓöÇ js/                # ES6 Javascript modules
Γöé   ΓööΓöÇΓöÇ _redirects         # Netlify proxy configuration
Γö£ΓöÇΓöÇ server/                # Backend source code
Γöé   Γö£ΓöÇΓöÇ controllers/       # Auth and business logic
Γöé   Γö£ΓöÇΓöÇ middleware/        # JWT Authentication guards
Γöé   Γö£ΓöÇΓöÇ models/            # Data access layer
Γöé   ΓööΓöÇΓöÇ routes/            # API endpoints
Γö£ΓöÇΓöÇ data/                  # Local storage for user data
ΓööΓöÇΓöÇ server.js              # Entry point for the Node server
```

## ΓÜÖ∩╕Å Setup Instructions

### Prerequisites
- Node.js (v14+)
- npm

### Local Installation
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file and add your `JWT_SECRET`.
4. Run `npm start` to start the server at `http://localhost:3000`.

## ≡ƒ¢í∩╕Å Evaluation Criteria Met
- [x] Vanilla CSS implementation (No Frameworks).
- [x] Secure Password Encryption.
- [x] Fully responsive using Modular CSS.
- [x] Professional naming conventions and clean code structure.
