# GharSwaad Delight — Homemade Food Platform 🍛

A complete food ordering and kitchen operations platform for **GharSwaad Homemade Food**, offering fresh homestyle meals to offices, small industrial workplaces, and homes.

The project is structured into **separate frontend and backend** directories, fully written in **JavaScript** (`.jsx` / `.js`).

---

## 🏗️ Project Architecture

```
ghar-swaad-joy-main/
├── backend/                     # Node.js + Express API Server (JavaScript)
│   ├── config/
│   │   └── db.js                # MongoDB connection with resilient in-memory fallback
│   ├── controllers/             # Business logic controllers
│   │   ├── authController.js    # Admin login & JWT verification
│   │   ├── menuController.js    # CRUD menu operations
│   │   ├── orderController.js   # Order creation, pipeline status & live tracking
│   │   ├── customerController.js# Customer CRM metrics & lifetime spend
│   │   └── settingController.js # Operational settings & order acceptance switch
│   ├── data/
│   │   ├── seedData.js          # Authentic seed menu, settings & demo orders
│   │   └── store.js             # Unified resilient datastore
│   ├── middleware/
│   │   └── auth.js              # JWT Authorization middleware
│   ├── models/                  # Mongoose Schemas (MenuItem, Order, Setting)
│   ├── routes/                  # Express REST routes (/api/...)
│   ├── .env                     # Server environment variables
│   ├── package.json             # Express dependencies & scripts
│   └── server.js                # Server entry point (Port 5000)
│
├── frontend/                    # React 18 + Vite Web App (JavaScript JSX)
│   ├── src/
│   │   ├── assets/              # Dish images (thali, roti, rice, snack)
│   │   ├── components/          # Header, Footer, Logo, OrdersTable, UI controls
│   │   ├── context/
│   │   │   └── StoreContext.jsx # Central Store (Cart, Menu, Orders, API sync & offline cache)
│   │   ├── pages/
│   │   │   ├── customer/        # Home, Menu, Cart, Checkout, Success, Track, About, Contact
│   │   │   └── admin/           # Login, Dashboard, Orders, OrderDetail, Menu, Customers, CRM, Settings
│   │   ├── services/
│   │   │   └── api.js           # Axios client configured with base URL & JWT interceptor
│   │   ├── utils/
│   │   │   └── formatters.js    # Currency (INR), date formatting, WhatsApp link generator
│   │   ├── App.jsx              # React Router DOM v6 route definitions
│   │   ├── main.jsx             # React DOM root entry
│   │   └── index.css            # Tailwind styles, OKLCH palette, print styles
│   ├── index.html               # Google Fonts (Fraunces & Nunito Sans) & metadata
│   ├── tailwind.config.js       # Brand color palette (primary forest green, accent saffron, gold)
│   ├── vite.config.js           # Vite config with path alias (@) & backend proxy
│   └── package.json             # React dependencies
```

---

## 🚀 Getting Started

### 1. Running the Backend API

```sh
cd backend
npm install
npm run dev
```

* API will run at: `http://localhost:5000/api`
* Health check: `http://localhost:5000/api/health`
* Default Admin Login: `admin@gharswaad.in` / `gharswaad123`

> **Note**: If MongoDB is not installed locally, the backend automatically operates using the resilient in-memory store pre-populated with GharSwaad's dishes and sample orders.

---

### 2. Running the Frontend

In a separate terminal:

```sh
cd frontend
npm install
npm run dev
```

* Frontend will run at: `http://localhost:5173`
* Vite automatically proxies `/api` requests to the backend at port 5000.
* Has an offline fallback so the UI works even when the backend server is stopped.

---

## 📱 Application Modules

### Customer Web Experience
- **Home (`/`)**: Hero banner, quality pillars, popular daily thalis, team lunch inquiry.
- **Menu (`/menu`)**: Category filter, Full/Half portion toggles, quantity picker, add to cart.
- **Cart (`/cart`)**: Real-time total calculation, free delivery progress tracker.
- **Checkout (`/checkout`)**: Capture delivery type (Office, Home, Small Industry/Workplace), company name, cash on delivery vs UPI.
- **Order Success (`/order-success`)**: Order ID display and direct WhatsApp kitchen contact.
- **Track Order (`/track`)**: Step-by-step progress stepper (Order Received → Confirmed → Cooking → Packed → Out for Delivery → Delivered).
- **About (`/about`) & Contact (`/contact`)**: Brand story, kitchen standards, contact form.

### Kitchen Admin Operations Dashboard
- **Admin Login (`/admin/login`)**: Secure authentication for kitchen staff.
- **Dashboard (`/admin/dashboard`)**: Today's orders & revenue, Recharts order pipeline chart, recent deliveries.
- **Live Orders (`/admin/orders`)**: Real-time status update dropdown, quick view, WhatsApp customer trigger.
- **Order Details (`/admin/orders/:id`)**: Full bill breakdown, customer contact, thermal receipt printing (`window.print()`).
- **Menu Management (`/admin/menu`)**: Add/edit/delete dishes, portion details, dual pricing, instant out-of-stock toggle.
- **Customers CRM (`/admin/customers`)**: Lifetime spend tracking, order frequency, workplace categorization.
- **Order History (`/admin/order-history`)**: Delivered and cancelled orders archive.
- **Settings (`/admin/settings`)**: Turn order acceptance ON/OFF, set minimum order, delivery fees, and UPI VPA.
