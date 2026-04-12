# Technical Documentation: Library Full-Stack Deployment

## 1. Platform Selection Justification

### Frontend: Vercel
**Why Vercel?** Vercel is chosen for the frontend because it excels at hosting static frontend applications with a generous free tier. It provides automated deployments directly integrated with GitHub via out-of-the-box CI/CD. The process of deploying plain HTML/JS is almost instantaneous, and Vercel automatically configures a robust Global CDN and HTTPS, making the UI highly accessible and scalable.

### Backend & Database: Railway
**Why Railway?** Railway is selected for the backend Node.js API and the MySQL database. 
- **Database Integrated Support:** Railway allows the provisioning of a managed MySQL database with just a couple of clicks, avoiding the overhead of external solutions like AWS RDS while keeping latency low. 
- **Ease of Configuration:** Railway natively injects dynamic environment variables directly into the deployment container. Our codebase was proactively modified (`backend/config/db.js`) to parse Railway's unique MySQL variables (`MYSQLHOST`, `MYSQLPASSWORD`, etc.), completely automating the connection phase.
- **Git Integration:** Railway's automatic webhook integration means that code pushed to GitHub builds and deploys simultaneously without complex Docker configurations.

## 2. Architecture Diagram

*(Please insert your Architectural Diagram image here proving how Vercel connects to Railway through HTTP, and Railway connects to its MySQL plugin).*
`[Example: Vercel (Client)] -----> [Railway (Node.js API)] -----> [Railway (MySQL)]`

## 3. Deployment Steps Followed

1. **Prepared Codebase:** Removed hardcoded local credentials and implemented `.env` for variables. Refactored the `cors` package in Express to accept cross-origin requests.
2. **Database Provisioning (Railway):** Created a MySQL service on Railway and executed the initial schema script.
3. **Backend Deployment (Railway):** Connected the GitHub repository to a new Railway project and configured the root directory to `fullstack`. Automatically injected database credentials into the service context. Handled port binding safely.
4. **API Integration (Frontend):** Located `frontend/app.js` and modified the `API_URL` constant from `localhost:3000` to the new Railway-generated domain name.
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
