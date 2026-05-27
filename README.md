# 🌍 Breathe ESG Platform

A full-stack ESG (Environmental, Social, Governance) dashboard platform built using **React**, **Django REST Framework**, and deployed using **Vercel** and **Render**.

The platform allows users to upload SAP CSV files, process ESG records, classify emissions into Scope 1 / 2 / 3, monitor flagged records, and visualize ESG statistics in real time.

---

# 🚀 Live Deployment

## 🔗 Frontend (Vercel)
👉 https://breathe-esg-platform-flax.vercel.app/

## 🔗 Backend API (Render)
👉 https://breathe-esg-backend-m7vp.onrender.com/api/dashboard/stats/

---

# 📸 Features

✅ Upload SAP CSV files  
✅ ESG record normalization  
✅ Scope classification (Scope 1 / 2 / 3)  
✅ Dashboard analytics  
✅ Flagged record detection  
✅ REST API integration  
✅ Real-time frontend updates  
✅ Full cloud deployment  
✅ Responsive dashboard UI  

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Vite
- Axios

## Backend
- Django
- Django REST Framework

## Database
- SQLite3

## Deployment
- Vercel (Frontend)
- Render (Backend)

---

# 📂 Project Structure

```bash
breathe-esg-platform/
│
├── backend/
│   ├── audits/
│   ├── companies/
│   ├── emissions/
│   ├── ingestion/
│   ├── config/
│   └── manage.py
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

---

# ⚙️ Backend Setup (Django)

## 1️⃣ Clone Repository

```bash
git clone https://github.com/Sonali1554/breathe-esg-platform.git

cd breathe-esg-platform
```

---

## 2️⃣ Open Backend Folder

```bash
cd backend
```

---

## 3️⃣ Create Virtual Environment

```bash
python -m venv venv
```

---

## 4️⃣ Activate Virtual Environment

### Windows

```bash
venv\Scripts\activate
```

### Mac/Linux

```bash
source venv/bin/activate
```

---

## 5️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```

---

## 6️⃣ Run Migrations

```bash
python manage.py makemigrations

python manage.py migrate
```

---

## 7️⃣ Start Backend Server

```bash
python manage.py runserver
```

Backend runs on:

```bash
http://127.0.0.1:8000/
```

---

# 💻 Frontend Setup (React + Vite)

## 1️⃣ Open Frontend Folder

```bash
cd frontend
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Install Axios

```bash
npm install axios
```

---

## 4️⃣ Start Frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173/
```

---

# 📡 API Endpoints

## Dashboard Stats

```http
GET /api/dashboard/stats/
```

---

## Recent Records

```http
GET /api/records/recent/
```

---

## Upload SAP CSV

```http
POST /api/upload/sap/
```

---

# 📊 ESG Dashboard Features

The dashboard displays:

- Total ESG Records
- Flagged Records
- Scope 1 Emissions
- Scope 2 Emissions
- Scope 3 Emissions
- Recent uploaded records

---

# 📁 Sample CSV Format

```csv
category,quantity,scope
Electricity,1200,Scope 2
Diesel,500,Scope 1
Flight Travel,150000,Scope 3
```

---

# ☁️ Deployment Steps

# 🔹 Backend Deployment (Render)

1. Push project to GitHub
2. Create Render Web Service
3. Connect GitHub repository
4. Set Root Directory:

```bash
backend
```

5. Build Command:

```bash
pip install -r requirements.txt
```

6. Start Command:

```bash
python manage.py migrate && gunicorn config.wsgi:application
```

7. Deploy

---

# 🔹 Frontend Deployment (Vercel)

1. Import GitHub repository
2. Select frontend folder
3. Deploy using Vite preset
4. Add production backend API URL
5. Redeploy project

---

# 🧠 Challenges Solved

During development, the following real-world engineering issues were solved:

✅ Django deployment issues  
✅ Gunicorn configuration  
✅ ALLOWED_HOSTS errors  
✅ CORS policy issues  
✅ Frontend build failures  
✅ Axios dependency issues  
✅ API integration issues  
✅ Database migration problems  
✅ Production deployment debugging  

---

# 🔮 Future Improvements

- Authentication & Authorization
- PostgreSQL integration
- ESG charts and analytics
- AI anomaly detection
- File history tracking
- Admin dashboard
- Export reports
- Dark mode UI

---

# 👩‍💻 Author

## Sonali Kumari

### GitHub
https://github.com/Sonali1554

---

# ⭐ If You Like This Project

Give this repository a ⭐ on GitHub!

---
