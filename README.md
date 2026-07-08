<div align="center">
  
  <img src="https://readme-typing-svg.demolab.com?font=Plus+Jakarta+Sans&weight=700&size=40&duration=3000&pause=500&color=0F4C81&center=true&vCenter=true&random=false&width=500&height=70&lines=CareerMatch;AI-Powered+Career+Recommendation" alt="CareerMatch Title" />
  
  <p align="center">
    <strong>🧠 AI-Powered Career Recommendation System</strong>
  </p>

  <p align="center">
    <a href="#-tentang-proyek">Tentang</a> •
    <a href="#-tujuan-proyek">Tujuan</a> •
    <a href="#-teknologi-yang-digunakan">Teknologi</a> •
    <a href="#-arsitektur-sistem">Arsitektur</a> •
    <a href="#-alur-kerja-sistem">Alur Kerja</a> •
    <a href="#-quick-start">Quick Start</a> •
    <a href="#-struktur-proyek">Struktur</a> •
    <a href="#-api-endpoints">API</a> •
    <a href="#-tim-pengembang">Tim</a>
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

## 📖 Tentang Proyek

**CareerMatch** adalah sebuah platform rekomendasi karier berbasis kecerdasan buatan (AI) yang dikembangkan untuk membantu individu — baik mahasiswa, fresh graduate, maupun profesional — dalam menemukan jalur karier yang paling sesuai dengan kemampuan (skill) yang mereka miliki.

Tidak seperti platform rekomendasi karier pada umumnya yang hanya mengandalkan pencocokan kata kunci (keyword matching), CareerMatch menggunakan pendekatan **semantic understanding** yang mampu memahami makna dan konteks dari setiap skill yang dimasukkan oleh pengguna.

Sistem ini tidak hanya memberikan rekomendasi karier, tetapi juga memberikan panduan konkret mengenai **kesenjangan skill (skill gap)** yang perlu dipelajari oleh pengguna untuk mencapai karier impiannya. Dengan demikian, CareerMatch berfungsi sebagai asisten karier pintar yang membantu pengguna merencanakan langkah profesional mereka secara lebih terarah dan terukur.

---

## 🎯 Tujuan Proyek

### Tujuan Utama

| No | Tujuan | Penjelasan |
|----|--------|------------|
| 1 | **Membantu menemukan karier yang sesuai** | Berdasarkan skill yang dimiliki, mengurangi kebingungan dalam menentukan arah karier |
| 2 | **Memberikan analisis skill gap** | Mengetahui secara spesifik skill yang sudah dikuasai dan yang perlu dipelajari |
| 3 | **Rekomendasi personal dan akurat** | Memanfaatkan teknologi AI untuk rekomendasi yang tidak generik |
| 4 | **Menyimpan riwayat rekomendasi** | Memungkinkan pengguna melacak perkembangan karier dari waktu ke waktu |

### Tujuan Teknis

| No | Tujuan | Penjelasan |
|----|--------|------------|
| 1 | **Arsitektur microservices** | Memisahkan tanggung jawab antar komponen untuk skalabilitas dan maintainability |
| 2 | **Integrasi model AI** | Fine-tuned BGE-small untuk semantic matching antara skill dan karier |
| 3 | **Sistem responsif** | Latensi rendah untuk pengalaman pengguna yang interaktif dan nyaman |

---

## 🧠 Mengapa Proyek Ini Dibuat?

Proyek ini lahir dari keprihatinan terhadap banyaknya individu yang mengalami kesulitan dalam menentukan jalur karier yang tepat.

### Masalah yang Dihadapi Pengguna

| Masalah | Dampak | Contoh Kasus |
|---------|--------|--------------|
| ❌ **Ketidakjelasan arah karier** | Pengguna bingung menentukan langkah selanjutnya | Mahasiswa TI tidak tahu posisi apa yang cocok dengan skill-nya |
| ❌ **Keterampilan tidak terpetakan** | Potensi diri tidak tergali secara maksimal | Fresh graduate tidak sadar bahwa skill-nya sesuai untuk posisi tertentu |
| ❌ **Informasi karier tersebar** | Sulit mengakses informasi kebutuhan skill industri | Setiap lowongan mencantumkan persyaratan skill yang berbeda-beda |
| ❌ **Rekomendasi generik** | Saran yang diberikan terlalu umum dan tidak personal | Platform lain memberikan rekomendasi berdasarkan keyword saja |
| ❌ **Kurangnya analisis skill gap** | Pengguna tidak tahu apa yang harus dipelajari selanjutnya | Tidak ada panduan belajar yang terarah untuk mencapai karier tertentu |

### Solusi yang Ditawarkan

CareerMatch hadir sebagai solusi yang menggabungkan kekuatan **kecerdasan buatan (AI)** dan **analisis data** untuk memberikan rekomendasi karier yang personal, akurat, dan terarah.

| Pendekatan | Teknologi | Manfaat untuk Pengguna |
|------------|-----------|------------------------|
| 🔍 **Semantic Matching** | Fine-tuned BGE-small + FAISS | Mencocokkan skill dengan kebutuhan karier secara cerdas, tidak sekadar keyword |
| 🧠 **Vector Embeddings** | Sentence Transformers | Merepresentasikan skill dalam ruang vektor 384 dimensi untuk pengukuran kemiripan yang akurat |
| 📊 **Skill Gap Analysis** | Set Intersection/Difference | Memberikan insight jelas tentang skill yang dikuasai dan yang perlu dipelajari |
| ⚡ **Real-time Processing** | FastAPI + NestJS | Respons cepat dengan latensi rendah, pengalaman interaktif |
| 📈 **Recommendation History** | PostgreSQL | Menyimpan riwayat untuk tracking perkembangan karier |

---

## 🏗️ Arsitektur Sistem

CareerMatch menerapkan arsitektur **microservices** yang memisahkan tanggung jawab setiap komponen. Arsitektur ini dinilai **aman dan solid** dari sudut pandang penguji Tugas Akhir maupun praktisi industri.
