# 🌎 LATAM Identity Demo – Okta Hosted Login + Express.js

This is a live working demo of an Okta-hosted login flow using Node.js + Express, built for showcasing secure identity access with regional branding (LATAM).  
It demonstrates full OAuth 2.0 flow with user assignment, MFA (Okta Verify), and secure session handling.

---

## 🚀 Live Demo

👉 [okta-latam-demo.onrender.com](https://okta-latam-demo.onrender.com)

Use credentials for a test user assigned to the app in your Okta org.

---

## ✨ Features

- ✅ Okta-hosted login UI (custom-branded)
- ✅ Secure authentication via OAuth 2.0 Authorization Code flow
- ✅ MFA via Okta Verify
- ✅ Custom environment branding (Brazilian flag, color scheme)
- ✅ Hosted on [Render](https://render.com) and linked to GitHub

---

## 🧪 Technologies Used

- [Okta Developer Platform](https://developer.okta.com/)
- [Express.js](https://expressjs.com/)
- [Okta OIDC Middleware](https://github.com/okta/okta-oidc-js)
- Node.js
- Render (cloud deployment)

---

## 🛠 Setup & Deployment

### 1. Clone this repo

```bash
git clone https://github.com/calademos/samples-nodejs-express-4.git
cd samples-nodejs-express-4/okta-hosted-login
```

### 2. Create a `.env` file

```bash
ISSUER=https://dev-98456248.okta.com/oauth2/default
CLIENT_ID=<your-client-id>
CLIENT_SECRET=<your-client-secret>
APP_BASE_URL=http://localhost:3000
```

### 3. Start locally

```bash
npm install
npm start
```

---

## ☁️ Deployment (Render)

- Root directory: `okta-hosted-login`
- Build command: `npm install`
- Start command: `npm start`
- Environment variables:
  - `ISSUER`
  - `CLIENT_ID`
  - `CLIENT_SECRET`
  - `APP_BASE_URL` → `https://your-app.onrender.com`

---

## 🔐 Okta Configuration

### Application Settings:
- **Login redirect URI**:  
  `https://your-app.onrender.com/authorization-code/callback`

- **Logout redirect URI**:  
  `https://your-app.onrender.com`

### Assign Users:
- Go to **Directory → People**
- Create a user (e.g. `joao.silva@example.com`)
- Assign them to the app under **Applications → Assignments**

---

## 🌍 LATAM Context (Interview/Use Case)

This demo simulates a multinational LATAM enterprise securing access to internal apps with localized login branding (e.g., Brazil). It demonstrates how Okta supports:
- Regional identity access
- Country-specific policies (via groups or rules)
- Multilingual, secure login experiences

---

## 🧑 Author

Created by [Matt Gueiros](https://www.linkedin.com/in/mattgueiros) as part of a live technical demo for LATAM-focused enterprise identity roles.

---

## 📜 License

Apache-2.0 © Okta