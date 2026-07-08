<div align="center">
  
  <img src="https://readme-typing-svg.demolab.com?font=Plus+Jakarta+Sans&weight=700&size=40&duration=3000&pause=500&color=0F4C81&center=true&vCenter=true&random=false&width=500&height=70&lines=CareerMatch;AI-Powered+Career+Recommendation" alt="CareerMatch Title" />
  
  <p align="center">
    <strong>🧠 AI-Powered Career Recommendation System</strong>
  </p>

  <p align="center">
    <a href="#-alur-kerja-komunikasi-data">Alur Kerja</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-ai-ml-stack">AI/ML Stack</a> •
    <a href="#-arsitektur-sistem">Arsitektur</a> •
    <a href="#-quick-start">Quick Start</a> •
    <a href="#-project-structure">Structure</a> •
    <a href="#-api-endpoints">API</a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Next.js-14+-000000?style=for-the-badge&logo=next.js&logoColor=white" />
    <img src="https://img.shields.io/badge/NestJS-10+-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" />
    <img src="https://img.shields.io/badge/FastAPI-0.136+-009688?style=for-the-badge&logo=fastapi&logoColor=white" />
    <img src="https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-3.0+-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/PyTorch-2.12+-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white" />
    <img src="https://img.shields.io/badge/Sentence_Transformers-5.5+-FFD700?style=for-the-badge&logo=huggingface&logoColor=black" />
    <img src="https://img.shields.io/badge/FAISS-1.14+-EA6B6B?style=for-the-badge&logo=facebook&logoColor=white" />
    <img src="https://img.shields.io/badge/Hugging_Face-2.2+-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black" />
    <img src="https://img.shields.io/badge/Transformers-5.9+-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black" />
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/PostgreSQL-15+-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
    <img src="https://img.shields.io/badge/Pandas-2.0+-150458?style=for-the-badge&logo=pandas&logoColor=white" />
    <img src="https://img.shields.io/badge/NumPy-1.24+-013243?style=for-the-badge&logo=numpy&logoColor=white" />
    <img src="https://img.shields.io/badge/Docker-24.0+-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Status-Production_Ready-2E7D32?style=for-the-badge" />
    <img src="https://img.shields.io/badge/License-MIT-3C873A?style=for-the-badge" />
  </p>

</div>

---

## 📖 Overview

**CareerMatch** adalah sistem rekomendasi karier berbasis **kecerdasan buatan (AI)** yang membantu pengguna menemukan jalur karier yang sesuai berdasarkan **skill yang dimiliki**. Sistem ini memanfaatkan teknologi **Natural Language Processing (NLP)** dan **semantic search** untuk mencocokkan kemampuan pengguna dengan kebutuhan industri.

### 🎯 Problem Statement

Banyak pencari kerja dan mahasiswa kesulitan menentukan jalur karier yang tepat karena:

| Masalah | Dampak |
|---------|--------|
| ❌ Tidak tahu karier apa yang cocok | Kebingungan dalam menentukan langkah karir |
| ❌ Keterampilan tidak terpetakan | Tidak sadar potensi yang dimiliki |
| ❌ Informasi karier tersebar | Sulit mengetahui skill yang dibutuhkan |
| ❌ Rekomendasi tidak personal | Saran yang diberikan terlalu generik |

### 💡 Our Solution

CareerMatch hadir dengan pendekatan **AI-First** yang mengubah cara pengguna menemukan karier melalui:

<div align="center">
  
| Capability | Technology | Business Value |
|------------|------------|----------------|
| 🔍 **Semantic Matching** | Fine-tuned BGE-small + FAISS | Mencocokkan skill dengan karier secara cerdas |
| 🧠 **Vector Embeddings** | Sentence Transformers | Representasi skill dalam 384 dimensi |
| 📊 **Skill Gap Analysis** | Set Intersection/Difference | Mengetahui skill yang perlu dipelajari |
| ⚡ **Real-time** | FastAPI + NestJS | Respons cepat & interaktif |
</div>

---

## 🏗️ Arsitektur Sistem

CareerMatch menerapkan arsitektur **microservices** yang memisahkan tanggung jawab setiap komponen:

---

## 🔄 Alur Kerja Komunikasi Data yang Konsisten

Berikut ilustrasi skenario ketika pengguna mengklik tombol **"Cari Rekomendasi"** di Frontend:

### 🚀 Step-by-Step Flow

```mermaid
sequenceDiagram
    participant User as 👤 User
    participant FE as Frontend (Next.js)
    participant BE as Backend (NestJS)
    participant AI as AI Service (FastAPI)
    participant DB as Database (PostgreSQL)

    User->>FE: Klik "Cari Rekomendasi"
    FE->>BE: POST /recommendations (Header: JWT Token)
    
    BE->>DB: Query skill pengguna
    DB-->>BE: ["PHP", "Laravel", "MySQL", "Docker"]
    
    BE->>BE: Gabungkan skill → "PHP, Laravel, MySQL, Docker"
    BE->>AI: POST http://localhost:8000/recommend
    
    AI->>AI: Preprocessing (cleaning, tokenization)
    AI->>AI: Generate vector embedding (BGE-small)
    AI->>AI: Cosine Similarity vs career vectors
    AI-->>BE: [{career: "Fullstack Dev", match: 89%}, ...]
    
    loop For each career
        BE->>DB: Query skills required
        DB-->>BE: ["PHP", "Laravel", "React", "Docker"]
        BE->>BE: Set Intersection → "Sudah Dikuasai"
        BE->>BE: Set Difference → "Perlu Dipelajari"
    end
    
    BE->>DB: Simpan riwayat rekomendasi
    BE-->>FE: JSON Response (structured data)
    
    FE->>User: Render hasil rekomendasi
