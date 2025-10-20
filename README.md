# 🚀 OpalGlow

**OpalGlow** is a modern **e-commerce platform** built with **Express.js** for the backend and **React.js** for the frontend. It provides a seamless shopping experience with features like product browsing, cart management, authentication, and payment integration.  

The system focuses on:

- **🛒 Product Catalog & Management**  
  Browse, search, and manage products with categories, pricing, and stock availability.  

- **💳 Shopping Cart & Checkout**  
  Add products to the cart, manage quantities, and complete secure purchases.  

- **🔐 Authentication & Authorization**  
  Users can register, login, and access protected routes using JWT-based authentication.  

- **📦 Order Management**  
  Track and manage customer orders with order history and status updates.  

- **⚡ Real-time Features**  
  Integrates with Supabase for real-time updates and notifications.  

---

## 🧰 Tech Stack

- **Backend:** Express.js, Node.js, MongoDB, JWT  
- **Frontend:** React.js, Vite, Tailwind CSS  
- **Database:** MongoDB Atlas  
- **Realtime & Storage:** Supabase  
- **Authentication:** JWT  

---

## 📦 Prerequisites

- Node.js v18+  
- npm / yarn  
- Git  
- MongoDB account (for development)  
- Supabase account (for development)  

---

## ⚙️ Development Setup

### 1. Clone Repository

```bash
git clone https://github.com/hello-sahasraka/OpalGlow.git
cd OpalGlow
````

---

### 2. Backend Setup (Express.js + MongoDB)

```bash
cd backend

# Install dependencies
npm install
# or
yarn install

# Create a .env file (example variables)
# MONGO_URL=<your_mongodb_connection_string>
# JWT_KEY=<your_jwt_secret>
# EMAIL_USER=<your_email_address>
# EMAIL_PASS=<your_email_password>

# Start backend server
npm run dev
# or
yarn dev
```

Backend API will be available at `http://localhost:5000` (default).

---

### 3. Frontend Setup (React + Vite)

```bash
cd ../frontend

# Install dependencies
npm install
# or
yarn install

# Create a .env file (example variables)
# VITE_BACKEND_URL=<backend_api_url>
# VITE_SUPABASE_URL=<your_supabase_url>
# VITE_SUPABASE_KEY=<your_supabase_key>

# Start frontend development server
npm run dev
# or
yarn dev
```

Frontend will be available at `http://localhost:5173` (default Vite port).

---

## 🧾 Running the System

* Ensure **backend server** is running at the configured URL.
* Launch **frontend** to access the e-commerce app.
* Configure `.env` files with your MongoDB and Supabase credentials for local development.

---

## ✅ Tips

* Keep both **backend** and **frontend** running simultaneously.
* Use environment variables to keep credentials secure.
* Tailwind CSS classes can be customized in `tailwind.config.js` for styling changes.

---

## 🧼 Troubleshooting

* **Backend not starting:** Check that MongoDB URL and JWT secret are correctly set in `.env`.
* **Frontend not loading:** Ensure `VITE_BACKEND_URL` points to the running backend server.
* **Supabase issues:** Verify your Supabase URL and Key in `.env`.
