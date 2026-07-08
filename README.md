<div align="center">
  
  <img src="https://readme-typing-svg.demolab.com?font=Plus+Jakarta+Sans&weight=700&size=40&duration=3000&pause=500&color=0F4C81&center=true&vCenter=true&random=false&width=500&height=70&lines=CareerMatch;AI-Powered+Career+Recommendation" alt="CareerMatch Title" />
  
  <p align="center">
    <strong>🧠 AI-Powered Career Recommendation System</strong>
  </p>
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
