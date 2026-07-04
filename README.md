# 🛒 FreshKart

A scalable full-stack grocery delivery platform built using the PERN stack. FreshKart provides a seamless online grocery shopping experience with dedicated interfaces for Customers, Admins, and Delivery Partners.

---

## 🚀 Features

### 👤 Customer
- User Registration & Login (JWT Authentication)
- Browse Products
- Search & Filter Products
- Add / Update / Remove Cart Items
- Place Orders
- Secure Online Payments (Razorpay)
- Order History

### 🛠️ Admin
- Dashboard
- Product Management
- Inventory Management
- Order Management
- Customer Management
- Delivery Partner Assignment

### 🚚 Delivery Partner
- View Assigned Orders
- Update Delivery Status
- Manage Active Deliveries

---

## 🏗️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express.js
- JWT Authentication
- REST APIs

### Database
- PostgreSQL
- Prisma ORM

### Cloud & Services
- Cloudinary
- Razorpay

### Developer Tools
- Git
- GitHub
- Postman

---

## 📂 Project Structure

```
FreshKart/
│
├── client/                 # React Frontend
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── app.js
│   │
│   ├── prisma/
│   └── package.json
│
└── README.md
```

---

## 🔐 Authentication

- JWT Access Token
- Refresh Token
- HTTP Only Cookies
- Role-Based Access Control

Roles:
- Customer
- Admin
- Delivery Partner

---

## 📦 Core Modules

- Authentication
- Product Management
- Cart Management
- Order Management
- Payment Integration
- Image Upload
- Inventory Management
- Delivery Management

---

## 📊 Database

Database: PostgreSQL

ORM:
- Prisma ORM

Key Tables

- Users
- Products
- Cart
- CartItems
- Orders
- OrderItems

---

## ⚡ API Features

- RESTful API Design
- Pagination
- Search
- Filtering
- Validation Middleware
- Error Handling
- Async Request Handling

---

## 🛠️ Installation

### Clone Repository

```bash
git clone https://github.com/Adityayati15/Grocery-Delivery-Platform.git
```

### Navigate

```bash
cd Grocery-Delivery-Platform
```

### Install Dependencies

Frontend

```bash
cd client
npm install
```

Backend

```bash
cd server
npm install
```

### Configure Environment Variables

Create a `.env` file inside the server directory.

```env
PORT=

DATABASE_URL=

ACCESS_TOKEN_SECRET=

REFRESH_TOKEN_SECRET=

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=

RAZORPAY_KEY_ID=

RAZORPAY_KEY_SECRET=
```

### Run Backend

```bash
npm run dev
```

### Run Frontend

```bash
npm run dev
```

---

## 📸 Screenshots

Add screenshots here after completing the project.

- Home Page
- Product Listing
- Product Details
- Cart
- Checkout
- Admin Dashboard
- Delivery Dashboard

---

## 🎯 Future Improvements

- Wishlist
- Coupons & Discounts
- Email Notifications
- Real-time Order Tracking
- Product Reviews & Ratings
- Redis Caching
- Docker Deployment
- CI/CD Pipeline

---

## 👨‍💻 Author

**Aditya Yati**

GitHub:
https://github.com/Adityayati15

LinkedIn:
(Add your LinkedIn URL)

---
