# 🧠 Smart Interview Practice Platform

A full-stack AI-powered web application that helps users practice both **technical coding questions** and **behavioral interview questions**, with **automated evaluation** using LLMs (Google PaLM via MakerSuite or Vertex AI) and **real-time processing** via **Kafka**.

---

## 🚀 Features

- 🔐 JWT-based Authentication with Role-based Authorization
- 👥 User Registration with Email Confirmation (SendGrid)
- 🎯 Practice Coding & Behavioral Questions
- 📊 AI Evaluation of Answers using Google PaLM
- 🧩 Real-Time Answer Processing via Kafka
- 🛠️ Admin Dashboard to manage Users, Roles, Questions, and Answers
- 🗂️ Export Users and Answers as PDF (Admin Panel)
- 🌐 Secure RESTful APIs using ASP.NET Core
- 💬 React Frontend with RTK Query, React Hook Form, and Role-based UI

---

## 🧰 Tech Stack

### 🔹 Backend
- ASP.NET Core Web API
- Entity Framework Core (Code First)
- JWT Authentication + ASP.NET Identity
- Google PaLM API (via MakerSuite or Vertex AI)
- Apache Kafka (Producer/Consumer integration)
- SendGrid for Email Services
- Azure SQL for Cloud Hosting

### 🔸 Frontend
- React with TypeScript
- Redux Toolkit & RTK Query
- React Router v6
- React Hook Form + Yup Validation
- Axios (if used for manual API calls)
- Tailwind CSS or Bootstrap (customizable)

---

## 🏗️ Architecture

```text
[ React Frontend ]
      ⬇️
[ ASP.NET Core API ]
      ⬇️
[ Kafka Producer ]
      ⬇️
[ Kafka Topic ]
      ⬇️
[ Kafka AI Consumer ]
      ⬇️
[ Google PaLM Evaluation ]
      ⬇️
[ Save Evaluation to DB ]
