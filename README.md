# Full Stack MERN Ecommerce Platform

A modern full-stack ecommerce platform built using the MERN Stack. The application provides a complete shopping experience for customers and a dedicated dashboard for sellers to manage products and orders.

## Features

### Authentication & Authorization

* Buyer Authentication
* Seller Authentication
* JWT-Based Authorization
* Protected Routes
* Role-Based Access Control

### Customer Features

* Browse Products
* Search Products
* Category-Based Filtering
* Product Details Page
* Multiple Product Images
* Shopping Cart
* Order Placement
* Order History

### Seller Features

* Seller Dashboard
* Product Creation & Management
* Multiple Image Upload Support
* Product Listing Management
* Inventory Foundation

### Payments

* Razorpay Payment Gateway Integration
* Secure Checkout Flow

### Performance Optimizations

* Image Upload Optimization using Sharp
* WebP Image Conversion
* Cloud Image Storage using ImageKit
* Responsive UI for Mobile and Desktop

---

## Tech Stack

### Frontend

* React.js
* Tailwind CSS
* React Router
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Authentication

* JWT (JSON Web Token)
* bcryptjs

### Media Management

* ImageKit
* Sharp
* Multer

### Payment Gateway

* Razorpay

---

## Project Structure

```bash
Frontend/
├── src
├── components
├── pages
├── routes
└── assets

Backend/
├── controllers
├── models
├── routes
├── middleware
├── services
└── validations
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Backend Setup

```bash
cd Backend

npm install

npm run dev
```

### Frontend Setup

```bash
cd Frontend

npm install

npm run dev
```

---

## Environment Variables

Create a `.env` file inside the backend directory:

```env
PORT=
MONGODB_URI=

JWT_SECRET=

IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_URL_ENDPOINT=

RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

---

## Future Improvements

* Google Authentication
* Wishlist System
* Product Reviews & Ratings
* Inventory Tracking
* Advanced Seller Analytics
* Admin Dashboard
* Email Notifications

---

## Learning Outcomes

This project helped me gain hands-on experience with:

* Full Stack MERN Development
* REST API Design
* Authentication & Authorization
* Payment Gateway Integration
* Media Upload Handling
* Image Optimization
* Role-Based Access Control
* Scalable Application Architecture

---

## Author

Hemant Maru

LinkedIn: https://www.linkedin.com/in/hemant-maru-63012029a

---

⭐ If you found this project useful, consider giving it a star.
