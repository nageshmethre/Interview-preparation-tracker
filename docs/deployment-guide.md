# PrepSpace Production Deployment Manual: stream-in.app

To deploy the **PrepSpace Interview Preparation Tracker** on your custom domain **`stream-in.app`**, you will host the **Frontend SPA on Vercel** and the **Spring Boot Backend on Render (or Railway)** using a managed MySQL database.

---

## 1. Architecture Mappings
- **Frontend URL**: `https://stream-in.app` (Hosted on Vercel)
- **Backend API URL**: `https://api.stream-in.app/api` (Hosted on Render/Railway)
- **Database**: Cloud MySQL 8 instance (Hosted on Aiven.io, Railway, or Render)

---

## 2. Step 1: Deploy Backend Service (Render)

Render uses the multi-stage `Dockerfile` in the root of the project to build the JAR and run the Java container automatically.

1. **Create Cloud MySQL Instance**:
   - Go to [Aiven.io](https://aiven.io/) or [Clever Cloud](https://www.clever-cloud.com/) and spin up a free-tier **MySQL 8** database instance.
   - Note down the database Connection URI, Host, Port, Username, and Password.
2. **Deploy on Render**:
   - Log into [Render Dashboard](https://dashboard.render.com/) and click **New > Web Service**.
   - Connect your GitHub repository `nageshmethre/Interview-preparation-tracker`.
   - Set **Runtime** to **Docker** (it will automatically locate the root `Dockerfile`).
   - Add the following **Environment Variables** in Render settings:
     | Key | Value | Description |
     | :--- | :--- | :--- |
     | `DB_HOST` | `YOUR_CLOUD_DB_HOST` | Hostname of your cloud MySQL |
     | `DB_PORT` | `3306` (or custom port) | MySQL connection port |
     | `DB_NAME` | `interview_tracker` | Database schema name |
     | `DB_USER` | `YOUR_DB_USERNAME` | Master user |
     | `DB_PASSWORD` | `YOUR_DB_PASSWORD` | Master password |
   - Click **Deploy Web Service**.
3. **Map Custom Domain `api.stream-in.app`**:
   - Go to the **Settings** tab of your Render Web Service.
   - Scroll to **Custom Domains** and click **Add Custom Domain**.
   - Enter: `api.stream-in.app`.
   - Note the Render target domain (e.g. `interview-prep-api.onrender.com`) to use in your DNS settings.

---

## 3. Step 2: Deploy Frontend SPA (Vercel)

Vercel will build and host the HTML, CSS, and dynamic client JavaScript.

1. **Deploy on Vercel**:
   - Log into [Vercel Dashboard](https://vercel.com/) and click **Add New > Project**.
   - Import the GitHub repository `nageshmethre/Interview-preparation-tracker`.
   - In the configuration settings, set **Root Directory** to `frontend`.
   - Leave the build and install commands empty (it's a static HTML/JS app).
   - Click **Deploy**.
2. **Map Custom Domain `stream-in.app`**:
   - Once deployed, go to **Project Settings > Domains** in Vercel.
   - Click **Add** and enter `stream-in.app`. Select the option to redirect `www.stream-in.app` to `stream-in.app`.
   - Note down the Vercel A record IP and CNAME alias for your DNS configuration.

---

## 4. Step 3: Configure DNS Records (Domain Registrar)

Log into the registrar where you purchased `stream-in.app` (e.g., GoDaddy, Namecheap, Google Domains, Cloudflare) and open the **DNS Settings** page. 

Add or update the following records:

| Type | Host/Name | Value/Points To | TTL | Description |
| :---: | :---: | :--- | :---: | :--- |
| **A** | `@` | `76.76.21.21` | Auto/1 Hr | Point your main domain to Vercel |
| **CNAME** | `www` | `cname.vercel-dns.com.` | Auto/1 Hr | Point www traffic to Vercel |
| **CNAME** | `api` | `YOUR_RENDER_SERVICE_URL.onrender.com` | Auto/1 Hr | Point backend calls to Render |

> [!IMPORTANT]
> Once you save the DNS records, it may take between **5 minutes to 24 hours** for DNS propagation to complete globally.

---

## 5. Security Headers and CORS (Troubleshooting)

- **CORS Configuration**: The backend REST API is already configured to accept CORS requests from `https://stream-in.app` (via `SecurityConfig.java`). If you decide to add subdomains or change frontend URLs, update the origins list in `SecurityConfig`.
- **SSL Certificates**: Both Vercel and Render automatically provision free, auto-renewing Let's Encrypt SSL certificates for `stream-in.app` and `api.stream-in.app` within minutes of DNS records verification.
