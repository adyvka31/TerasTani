# 🌿 TerasTani &mdash; Decentralized Urban Agriculture Platform

[![Node.js Version](https://img.shields.io/badge/Node.js-%3E%3D20.0.0-brightgreen.svg)](https://nodejs.org/)
[![React Version](https://img.shields.io/badge/React-19.x-blue.svg)](https://react.dev/)
[![Express Version](https://img.shields.io/badge/Express-5.x-lightgrey.svg)](https://expressjs.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4.x-38bdf8.svg)](https://tailwindcss.com/)
[![Database](https://img.shields.io/badge/Database-PostgreSQL%20%2F%20Supabase-336791.svg)](https://supabase.com/)

> **TerasTani** adalah sistem operasi rantai pasok agrikultur perkotaan terdesentralisasi (*Decentralized Urban Micro-Farm OS*). Platform ini mengonsolidasikan panen mikro pekarangan dan balkon warga (radius 200–500 meter) ke titik kumpul **Lumbung RW (Hub Crate Komunal)**, memvalidasi kualitas secara objektif menggunakan **AI Computer Vision Spectrometry**, menerbitkan **Tiket Setor QR Digital**, dan mengamankan pembayaran dari distributor komersial (*off-taker*) melalui kontrak **Smart Escrow**.

---

## ⚡ PANDUAN CEPAT EVALUASI JURI

Seluruh sistem (Frontend & Backend) dapat langsung dijalankan dalam **satu langkah**:

### 1. Pasang Dependensi Monorepo
```bash
pnpm install
```

### 2. Pastikan Berkas `.env` Sudah Dikonfigurasi
Salin isi konfigurasi asli pada bagian [Konfigurasi Berkas `.env` Asli](#-konfigurasi-berkas-env-asli-siap-pakai) ke `tera-backend/.env` dan `tera-frontend/.env`.

### 3. Jalankan Aplikasi
```bash
pnpm dev
```

Aplikasi otomatis berjalan di:
- 🌐 **Frontend Client**: [http://localhost:5173](http://localhost:5173)
- ⚙️ **Backend API**: [http://localhost:5001](http://localhost:5001)
- 🩺 **Health Check**: [http://localhost:5001/api/v1/health](http://localhost:5001/api/v1/health)

---

### 🔑 Akun Evaluasi Cepat (1-Klik di Halaman Login)
Pada halaman login ([http://localhost:5173/login](http://localhost:5173/login)), gunakan tombol evaluasi instan berikut:

| Peran (*Role*) | Surel (*Email*) | Kata Sandi | Fokus Evaluasi Fitur |
| :--- | :--- | :--- | :--- |
| **Warga Kultivator** | `warga.rawasari@terastani.id` | `rahasia123` | Kalkulator Lahan AI, Plot Dasbor, Inspeksi Mutu AI, Tiket QR, Dompet & Escrow, Misi XP |
| **Mitra Distributor** | `distributor@segarlogistik.co.id` | `rahasia123` | Bursa Alokasi Kuota Grosir RW, Manifest Armada Cold Chain |
| **Admin Pengawas RW** | `admin@gmail.com` | `12345678` | Telemetri Sensor Lingkungan, Verifikasi Timbangan Lumbung |

> [!TIP]
> **Superpower Evaluasi Juri (Role Switcher):**  
> Setelah login, juri dapat berganti sudut pandang secara instan (*Kultivator* $\leftrightarrow$ *Distributor*) melalui tombol **"Ganti Tampilan Peran"** di bagian bawah sidebar tanpa perlu logout dan login ulang.

---

## 🔐 KONFIGURASI BERKAS `.env` ASLI (SIAP PAKAI)

Berikut adalah isi berkas `.env` asli yang siap digunakan untuk langsung terhubung ke database cloud Supabase aktif:

### 1. File: `tera-backend/.env`
Simpan kode berikut di dalam berkas `tera-backend/.env`:
```ini
# Port Server HTTP Express
PORT=5001

# Lingkungan Runtime
NODE_ENV=development

# Kebijakan CORS
CORS_ORIGIN=*

# PostgreSQL Database Connection URL (Supabase Cloud Pooler Aktif)
DATABASE_URL=postgresql://postgres.bjzkqyuhknqssygrcimx:teras12345678tani@aws-0-ap-southeast-2.pooler.supabase.com:5432/postgres

# Keamanan Token JWT
JWT_SECRET=terastani_jwt_secret_production_key_4096
JWT_EXPIRES_IN=7d
```

### 2. File: `tera-frontend/.env`
Simpan kode berikut di dalam berkas `tera-frontend/.env`:
```ini
# URL Endpoint API Backend
VITE_API_URL=http://localhost:5001

# Nama Aplikasi
VITE_APP_NAME=TerasTani
```

---

## 🏘️ Mengapa Berbasis RW? (Konsep Rantai Pasok Terdesentralisasi)

```mermaid
flowchart LR
    A["Warga A (5 kg)<br/>Warga B (12 kg)<br/>Warga C (8 kg)"] -->|"Jalan Kaki 200-500m<br/>(Tiket Setor QR)"| B["HUB LUMBUNG RW<br/>(Crate Pendingin 1.000 kg)"]
    B -->|"Truk Cold Chain<br/>(Jadwal 14:30 WIB)"| C["Supermarket &<br/>Restoran Horeka"]
    C -.->|"Pencairan Escrow Otomatis"| A

    style A fill:#f4f6f0,stroke:#2d5a27,stroke-width:2px
    style B fill:#fdfbf7,stroke:#c88a2c,stroke-width:2px
    style C fill:#f0f4f8,stroke:#2b4c7e,stroke-width:2px
```

1. **Zero-Mile Transport (Jarak Kaki 200–500m):** Sayuran daun sangat rentan layu. Warga cukup berjalan kaki 3 menit ke Balai RW untuk menyetor panen tanpa risiko rusak di perjalanan.
2. **Efisiensi Logistik Armada Distributor:** Truk pendingin 1–2 ton tidak perlu blusukan ke gang-gang perumahan. Cukup berhenti di satu titik lumbung RW untuk mengangkut ratusan kilogram sayur sekaligus.
3. **Kepastian Finansial (Smart Escrow):** Pembayaran dari distributor dikunci di sistem dan otomatis cair ke dompet warga seketika saat sayur ditimbang di lumbung.

---

## 🌟 8 Fitur Unggulan Dasbor

1. **Ringkasan Dasbor & Sensor IoT RW:** Telemetri mikroklimat hidup (lux cahaya, suhu, pH) dan pemantauan kartu plot budidaya pekarangan (Plot A, B, C) dengan pencatatan nutrisi harian.
2. **Kalkulator Lahan AI:** Simulasi presisi lubang tanam, estimasi panen biomassa, dan analisis laba bersih berdasarkan 4 tipe lahan sempit perkotaan (Balkon, Pekarangan, Rooftop, Dinding Vertikal). Terhubung langsung menyimpan plot ke dasbor.
3. **Inspeksi Mutu AI (Spektrometri Daun):** Pemindaian piksel kanvas dari webcam/foto untuk menganalisis klorofil SPAD, klorosis, dan sertifikasi komersial (**Grade A+** s/d **Grade D**) serta mengunci jaminan harga beli lumbung.
4. **Lumbung Komunitas & Tiket Setor QR:** Menerbitkan tiket setor resmi dengan kode batch unik (`TT-RW07-XXXXXX`) dan QR Code asli untuk penyerahan panen ke peti pendingin RW (*Crate Lumbung*).
5. **Dompet & Smart Escrow Settlement:** Pengelolaan saldo siap ditarik, saldo tertahan di escrow, serta buku besar transaksi (*ledger*) dengan fitur penarikan saldo instan ke Bank/E-Wallet.
6. **Misi Budidaya & Peringkat Komunal:** Misi harian/mingguan berhadiah XP, kenaikan pangkat kultivator, dan papan peringkat produktivitas warga se-kelurahan.
7. **Bursa Alokasi Kuota Grosir Distributor:** Portal B2B bagi mitra pembeli untuk memantau pasokan sayur yang terkumpul per RW, memesan kuota pasokan, dan mendanai escrow.
8. **Manifest Armada Logistik Cold Chain:** Pelacakan jadwal dan status rute armada truk berpendingin (*SCHEDULED* $\to$ *IN_TRANSIT* $\to$ *COMPLETED*).

---

## 📡 Ringkasan Endpoint RESTful API v1

| Modul | Endpoint | Akses | Fungsi |
| :--- | :--- | :---: | :--- |
| **Auth** | `POST /api/v1/auth/login` | Publik | Otentikasi & pengembalian JWT Bearer token |
| | `POST /api/v1/auth/register` | Publik | Pendaftaran akun baru kultivator / distributor |
| | `GET /api/v1/auth/me` | Bearer | Data profil, saldo dompet, dan poin XP |
| **Health** | `GET /api/v1/health` | Publik | Uptime server Express & koneksi database PostgreSQL |
| **Clusters** | `GET /api/v1/clusters` | Publik | Daftar klaster Lumbung RW & kapasitas crate aktif |
| **Sensors** | `GET /api/v1/sensors/latest` | Publik | Data telemetri mikroklimat sensor IoT |
| **Calculator** | `GET /api/v1/calculator/my` | Bearer | Daftar unit plot budidaya tersimpan milik pengguna |
| | `POST /api/v1/calculator/save` | Bearer | Menyimpan estimasi kalkulator lahan ke database |
| | `DELETE /api/v1/calculator/:id` | Bearer | Menghapus unit plot budidaya dari dasbor |
| **Harvests** | `GET /api/v1/harvests/my` | Bearer | Riwayat tiket setor panen QR milik pengguna |
| | `POST /api/v1/harvests/submit` | Bearer | Menerbitkan tiket setor panen QR ke Lumbung RW |
| **Quotas** | `GET /api/v1/quotas` | Publik | Daftar kuota pengadaan sayur grosir distributor |
| | `POST /api/v1/quotas/:id/book` | Bearer | Pemesanan alokasi kuota panen oleh distributor |
| **Fleets** | `GET /api/v1/fleets` | Publik | Manifest rute dan jadwal armada cold chain |
| | `PATCH /api/v1/fleets/:id/status`| Bearer | Pembaruan status operasional armada truk |
| **Wallet** | `GET /api/v1/wallet` | Bearer | Rincian saldo dompet, dana escrow, & buku besar |
| | `POST /api/v1/wallet/withdraw` | Bearer | Penarikan dana dompet ke rekening bank / e-wallet |
| **Gamify** | `GET /api/v1/gamification/missions` | Bearer | Daftar misi budidaya & status klaim hadiah |
| | `POST /api/v1/gamification/claim` | Bearer | Klaim hadiah poin XP dari misi yang selesai |
| | `GET /api/v1/gamification/leaderboard` | Publik | Papan peringkat kultivator se-kelurahan |

---

## 🎯 Poin Plus Teknis & UX (Penilaian Juri)

- **Parallel Background Data Fetching (`Promise.allSettled`):** Seluruh data dasbor dimuat secara paralel tanpa saling menghambat, mengeliminasi kedipan layar kosong saat memuat ulang halaman (*zero flash-of-empty-content*).
- **Indikator Loading Halus (*Subtle & Noticeable*):** Menggunakan titik berdenyut (*animated ping dot*) bertema Neo-Brutalist yang memberikan kepastian status koneksi server.
- **Bebas Native Browser Alert:** Seluruh dialog konfirmasi dan notifikasi penarikan saldo menggunakan modal dialog taktil kustom tanpa memicu pesan `localhost says...` standar peramban.
- **Clean Layered Backend Architecture:** Pemisahan tegas antara *Controller* (HTTP), *Service* (Logika Bisnis), dan *Repository* (Kueri SQL Terparameterisasi anti-SQL Injection).

---

<p align="center">
  <b>TerasTani Nusantara &copy; 2026. Decentralized Urban Agriculture Platform.</b>
</p>
