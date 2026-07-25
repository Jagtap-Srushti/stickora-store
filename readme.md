# 🛍️ Stickora – Decorative Stickers E-Commerce Platform

![Java](https://img.shields.io/badge/Java-21-orange?style=flat-square&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/SpringBoot-3.x-brightgreen?style=flat-square&logo=springboot)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-blue?style=flat-square&logo=postgresql)
![JWT](https://img.shields.io/badge/JWT-Authentication-yellow?style=flat-square&logo=jsonwebtokens)
![Stripe](https://img.shields.io/badge/Stripe-Payment-purple?style=flat-square&logo=stripe)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

> **Stickora** is a full-stack, enterprise-grade e-commerce web application engineered for browsing, purchasing, and managing decorative stickers. Built with a modern decoupled architecture, it features secure token-based authentication, role-based authorization, seamless Stripe payment gateway integration, and a fully responsive user interface.

---

## 🚀 Live Demo & Links

* **Live Demo:** [View Live Demo](https://stickora-store.vercel.app/)
  
---

## 📌 Features

### 👤 Customer Features
* **User Authentication & Authorization:** Secure registration and login powered by JWT (JSON Web Tokens) and BCrypt password hashing.
* **Catalog Browsing:** Explore a wide variety of decorative stickers with dynamic search and filtering capabilities.
* **Product Details:** In-depth view of individual stickers, pricing, and stock availability.
* **Shopping Cart & Checkout:** Add/remove items, manage quantities, and complete secure checkouts.
* **Payment Integration:** Live test-mode checkout processing via the Stripe Payment Gateway.
* **Responsive UI:** Fully optimized layout across mobile, tablet, and desktop devices.

### 🛠️ Administrator Features
* **Admin Dashboard:** Secure, role-restricted management portal (`ROLE_ADMIN`).
* **Product Catalog Management:** Perform full CRUD operations (Add, Update, Delete products).
* **Inventory Oversight:** Monitor active inventory levels and manage store listings seamlessly.

---

## 🏗️ Tech Stack

* **Frontend:** React.js, Vite, JavaScript, CSS, Axios, React Router DOM
* **Backend:** Java 21, Spring Boot, Spring Security, Spring Data JPA / Hibernate, Maven
* **Database:** PostgreSQL (Hosted on NeonDB)
* **Payment Gateway:** Stripe API
* **Deployment & Hosting:** Vercel (Frontend), Render (Backend)

---
## 📸 Preview

| Home Page (Light Mode) | Home Page (Dark Mode) |
|:---:|:---:|
| ![](Frontend/src/assets/screenshot/image1.png) | ![](Frontend/src/assets/screenshot/image2.png) |

| Contact Us | About Us |
|:---:|:---:|
| ![](Frontend/src/assets/screenshot/image4.png) | ![](Frontend/src/assets/screenshot/image12.png) |

| Product Details | Shopping Cart |
|:---:|:---:|
| ![](Frontend/src/assets/screenshot/image3.png) | ![](Frontend/src/assets/screenshot/image5.png) |

| Checkout | Stripe Payment |
|:---:|:---:|
| ![](Frontend/src/assets/screenshot/image6.png) | ![](Frontend/src/assets/screenshot/image7.png) |

| Profile | Orders |
|:---:|:---:|
| ![](Frontend/src/assets/screenshot/image8.png) | ![](Frontend/src/assets/screenshot/image9.png) |

| Admin Order Management | Admin Contact Messages |
|:---:|:---:|
| ![](Frontend/src/assets/screenshot/image10.png) | ![](Frontend/src/assets/screenshot/image11.png) |

## 🧩 Architecture
 
<!--
Add a real architecture diagram here (e.g. drawn in draw.io, Excalidraw, or Mermaid
exported as PNG) showing: React Client -> REST API (Spring Boot) -> PostgreSQL,
plus JWT filter chain and Stripe as an external service.
Save it to docs/architecture.png and reference it below.
-->
 
<div align="center">
  <img src="docs/architecture.png" alt="Stickora System Architecture" width="800"/>
</div>
**Request flow :**
 
```mermaid
flowchart LR
    A[React Client] -- REST / JSON --> B[Spring Boot API]
    B -- JWT Auth Filter --> C{Role Check}
    C -- ROLE_USER --> D[Customer Endpoints]
    C -- ROLE_ADMIN --> E[Admin Endpoints]
    B -- JPA / Hibernate --> F[(PostgreSQL)]
    B -- Payment Intent --> G[Stripe API]
```
 
---


