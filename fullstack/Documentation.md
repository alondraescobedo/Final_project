# Technical Documentation: Library Full-Stack Deployment

## 1. Platform Selection Justification

### Frontend: Vercel
**Why Vercel?** Vercel is chosen for the frontend because it excels at hosting static frontend applications with a generous free tier. It provides automated deployments directly integrated with GitHub via out-of-the-box CI/CD. The process of deploying plain HTML/JS is almost instantaneous, and Vercel automatically configures a robust Global CDN and HTTPS, making the UI highly accessible and scalable.

### Backend: Render & Database: Railway
**Why a hybrid architecture?** Render is selected for the backend Node.js API because of its seamless continuous integration from GitHub and reliable serverless infrastructure. Railway is utilized purely for its managed MySQL plugin.
- **Database Integrated Support:** Railway allows the provisioning of a managed MySQL database with just a couple of clicks, avoiding the overhead of external solutions like AWS RDS. 
- **Separation of Concerns:** By placing the API on Render and the Database on Railway, the load is distributed, and we take advantage of Render's free API hosting tier while using Railway's generous database storage tier.
- **Cross-Cloud Configuration:** Render environment variables (`DB_HOST`, `DB_PASSWORD`, etc.) are mapped to Railway's external TCP proxy endpoint, allowing secure internet-wide communication between the microservices.

## 2. Architecture Diagram

*(Please insert your Architectural Diagram image here proving how Vercel connects to Render through HTTP, and Render connects to Railway through TCP).*
`[Example: Vercel (Frontend Client)] -----> [Render (Node.js API)] ======> [Railway (MySQL Database)]`

## 3. Deployment Steps Followed

1. **Prepared Codebase:** Removed hardcoded local credentials and implemented `.env` for variables. Refactored the `cors` package in Express to accept cross-origin requests.
2. **Database Provisioning (Railway):** Created a MySQL service on Railway and executed the initial schema script. Extracted the public TCP Proxy credentials.
3. **Backend Deployment (Render):** Connected the GitHub repository to a new Render "Web Service" and configured the root directory to `fullstack`. Injected the Railway database credentials into Render's Environment Variables block. Handled port binding safely.
4. **API Integration (Frontend):** Located `frontend/app.js` and modified the `API_URL` constant from `localhost:3000` to the new Render-generated domain name.
5. **Frontend Deployment (Vercel):** Connected Vercel to the GitHub repository. Pointed the root directory to `fullstack/frontend`. Confirmed zero build errors.
6. **Final Validation:** Performed full CRUD workflow testing on the live Vercel URL to assure database mutability through the new API endpoint. 

## 4. Challenges Faced and Solutions

- **CORS Blocking:** 
  - *Challenge:* When testing the Vercel frontend, the browser would reject the request due to CORS policies on the backend because they are hosted on different domains.
  - *Solution:* Used the Express `cors` middleware, and set its origin precisely to accept requests.
- **Database Configuration Differences:**
  - *Challenge:* Local development used strict `DB_NAME` and `DB_PASSWORD` variables, but Railway provides `MYSQLDATABASE` and `MYSQLPASSWORD`.
  - *Solution:* Implemented fallback operators (`||`) inside `backend/config/db.js` to ensure the Node app dynamically adapted to whichever environment it was running in.

---

## 5. Deployment Screenshots

### Deployment Settings
*(Include a screenshot of your Railway environment variables screen here)*

### Running Application
*(Include a screenshot of your live Vercel frontend here)*
