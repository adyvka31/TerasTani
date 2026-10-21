# 🌿 TerasTani &mdash; Decentralized Urban Agriculture Platform

[![Node.js Version](https://img.shields.io/badge/Node.js-%3E%3D20.0.0-brightgreen.svg)](https://nodejs.org/)
[![React Version](https://img.shields.io/badge/React-19.x-blue.svg)](https://react.dev/)
[![Vite Version](https://img.shields.io/badge/Vite-8.x-646CFF.svg)](https://vitejs.dev/)
[![Express Version](https://img.shields.io/badge/Express-5.x-lightgrey.svg)](https://expressjs.com/)
[![TailwindCSS Version](https://img.shields.io/badge/TailwindCSS-4.x-38bdf8.svg)](https://tailwindcss.com/)
[![Database](https://img.shields.io/badge/Database-PostgreSQL%20%2F%20Supabase-336791.svg)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-ISC-green.svg)](#-lisensi--tim-pengembang)

> **TerasTani** adalah sistem operasi rantai pasok agrikultur presisi perkotaan terdesentralisasi (*Decentralized Urban Micro-Farm Operating System*). Platform ini mengonsolidasikan panen mikro pekarangan dan balkon warga perkotaan (radius jalan kaki 200–500 meter) ke titik kumpul **Lumbung RW (Hub Crate Komunal)**, memvalidasi mutu sayur daun secara objektif menggunakan **AI Computer Vision Spectrometry**, menerbitkan **Tiket Setor QR Digital**, mengamankan transaksi dengan **Smart Escrow Financial Settlement**, serta menyuplai kebutuhan grosir distributor komersial (*off-taker* / Horeka) melalui armada logistik berpendingin (*Cold Chain Fleet*).

---

## ⚡ CARA CEPAT MENJALANKAN APLIKASI (EVALUASI JURI)

Seluruh ekosistem monorepo (Frontend & Backend) dapat dijalankan dalam **satu perintah terpadu**:

### 1. Pasang Dependensi Monorepo
```bash
pnpm install
```

### 2. Salin Berkas Konfigurasi Lingkungan (`.env`)
```bash
# Salin konfigurasi backend & frontend dari template
cp tera-backend/.env.example tera-backend/.env
cp tera-frontend/.env.example tera-frontend/.env
```

### 3. Jalankan Mode Pengembangan Bersama
```bash
pnpm dev
```

> [!IMPORTANT]
> Perintah `pnpm dev` di atas akan otomatis mengaktifkan:
> - 🌐 **Frontend Web Client**: [http://localhost:5173](http://localhost:5173)
> - ⚙️ **Backend RESTful API**: [http://localhost:5001](http://localhost:5001)
> - 🩺 **Health Diagnostic Endpoint**: [http://localhost:5001/api/v1/health](http://localhost:5001/api/v1/health)

---

### 🔑 Kredensial Uji Coba Cepat (Evaluasi Juri)

Untuk mempermudah pengujian, halaman login ([http://localhost:5173/login](http://localhost:5173/login)) telah dilengkapi **tombol 1-klik instan**:

| Peran (*Role*) | Surel (*Email*) | Kata Sandi | Fokus Evaluasi Fitur |
| :--- | :--- | :--- | :--- |
| **Warga Kultivator** | `warga.rawasari@terastani.id` | `rahasia123` | Kalkulator Lahan AI, Plot Dasbor, Inspeksi Mutu AI, Tiket QR, Dompet & Escrow, Misi XP |
| **Mitra Distributor** | `distributor@segarlogistik.co.id` | `rahasia123` | Bursa Alokasi Kuota Grosir RW, Manifest Armada Cold Chain, Pemesanan Kuota B2B |
| **Admin Pengawas RW** | `admin@gmail.com` | `12345678` | Telemetri Sensor Lingkungan, Pengelolaan Hub RW, Verifikasi Timbang Lumbung |

> [!TIP]
> **Superpower Evaluasi Juri (Role Switcher):**  
> Setelah login, Anda dapat beralih sudut pandang secara instan (*Kultivator* $\leftrightarrow$ *Distributor*) melalui tombol **"Ganti Tampilan Peran"** di bagian bawah sidebar tanpa perlu melakukan proses logout dan login ulang!

---

## 🔧 KONFIGURASI LINGKUNGAN (`.env`)

Sistem TerasTani menggunakan konfigurasi berbasis variabel lingkungan (*Environment Variables*) yang terisolasi antara backend dan frontend:

### 1. Konfigurasi Backend (`tera-backend/.env`)

Berkas ini mengontrol port HTTP, koneksi basis data PostgreSQL, keamanan token JWT, dan kebijakan CORS.

```ini
# ==============================================================================
# TERASTANI BACKEND CONFIGURATION (tera-backend/.env)
# ==============================================================================

# Port server HTTP (Default: 5001 - Mencegah bentrok dengan macOS AirPlay di port 5000)
PORT=5001

# Lingkungan runtime aplikasi (development | production | test)
NODE_ENV=development

# Kebijakan Cross-Origin Resource Sharing (CORS)
CORS_ORIGIN=*

# PostgreSQL Connection String (Supabase Cloud Pooler / PostgreSQL Lokal)
DATABASE_URL=postgresql://postgres.user:password@aws-0-ap-southeast-2.pooler.supabase.com:5432/postgres

# Keamanan JWT (JSON Web Token)
JWT_SECRET=terastani_jwt_secret_production_key_4096_secure
JWT_EXPIRES_IN=7d
```

#### Rincian Variabel Backend:
| Variabel | Tipe | Default | Penjelasan |
| :--- | :---: | :---: | :--- |
| `PORT` | `Number` | `5001` | Port listen server Express. Sengaja menggunakan `5001` untuk kompatibilitas macOS. |
| `NODE_ENV` | `String` | `development` | Mengatur mode kerja Express (`development` atau `production`). |
| `CORS_ORIGIN` | `String` | `*` | Domain asal yang diizinkan memanggil API (misal `http://localhost:5173`). |
| `DATABASE_URL` | `String` | *(URL Supabase)* | URI koneksi PostgreSQL terenkripsi SSL dengan PgBouncer pooling. |
| `JWT_SECRET` | `String` | `terastani_...` | Kunci simetris rahasia untuk menandatangani dan memverifikasi token sesi JWT. |
| `JWT_EXPIRES_IN`| `String` | `7d` | Masa berlaku sesi token sebelum pengguna diminta login kembali. |

---

### 2. Konfigurasi Frontend (`tera-frontend/.env`)

Berkas ini mengontrol URL endpoint backend yang ditargetkan oleh klien Axios pada saat kompilasi Vite:

```ini
# ==============================================================================
# TERASTANI FRONTEND CONFIGURATION (tera-frontend/.env)
# ==============================================================================

# Base URL API Backend TerasTani
VITE_API_URL=http://localhost:5001

# Identitas Aplikasi
VITE_APP_NAME=TerasTani
```

#### Rincian Variabel Frontend:
| Variabel | Tipe | Default | Penjelasan |
| :--- | :---: | :---: | :--- |
| `VITE_API_URL` | `String` | `http://localhost:5001` | Alamat host REST API backend untuk seluruh pemanggilan HTTP Axios. |
| `VITE_APP_NAME`| `String` | `TerasTani` | Nama entitas aplikasi yang ditampilkan pada peramban. |

---

## 📋 Daftar Isi
1. [Latar Belakang & Keselarasan SDGs](#-latar-belakang--keselarasan-sdgs)
2. [Arsitektur Sistem (Enterprise Architecture)](#-arsitektur-sistem-enterprise-architecture)
3. [Konsep Hub Lumbung RW Terdesentralisasi](#-konsep-hub-lumbung-rw-terdesentralisasi)
4. [Skema Basis Data (Entity-Relationship Diagram)](#-skema-basis-data-entity-relationship-diagram)
5. [Struktur Direktori Monorepo](#-struktur-direktori-monorepo)
6. [Fitur Utama Ekosistem](#-fitur-utama-ekosistem)
7. [Dokumentasi Katalog RESTful API v1](#-dokumentasi-katalog-restful-api-v1)
8. [Design System & Estetika Visual](#-design-system--estetika-visual)
9. [Sub-Modul Repositori](#-sub-modul-repositori)
10. [Lisensi & Tim Pengembang](#-lisensi--tim-pengembang)

---

## 🌍 Latar Belakang & Keselarasan SDGs

Pertanian perkotaan (*urban farming*) menghadapi kendala fragmentasi: panen warga skala mikro (5–15 kg) tidak memiliki nilai tawar di hadapan jaringan ritel besar, sementara distributor Horeka kesulitan mendapatkan sayuran daun segar berkualitas tanpa rantai dingin yang efisien.

TerasTani hadir menyelesaikan masalah ini dengan menyelaraskan diri pada target **PBB Sustainable Development Goals (SDGs)**:
- **SDG 2 (Zero Hunger):** Memperkuat ketahanan pangan kota melalui sirkulasi produksi lokal yang mandiri dan terjangkau.
- **SDG 11 (Sustainable Cities and Communities):** Mengubah pekarangan pasif dan balkon beton menjadi zona hijau produktif berbasis komunitas RW.
- **SDG 12 (Responsible Consumption and Production):** Memangkas susut pangan (*food loss*) akibat rantai distribusi panjang dari perkebunan luar kota.
- **SDG 13 (Climate Action):** Memangkas jejak karbon (*food miles*) pengangkutan sayur melalui sistem agregasi jarak dekat (*zero-mile transport*).

---

## 🏛️ Arsitektur Sistem (Enterprise Architecture)

TerasTani mengadopsi standar **Clean Layered Architecture** pada backend dan **Feature-Sliced Architecture** pada frontend:

```mermaid
graph TD
    subgraph Client ["Frontend Layer (React 19 + Vite 8 + Tailwind 4)"]
        UI["Tactile Editorial Interface<br/>(Neo-Brutalist & Botanical Luxury)"]
        CTX["AuthContext & Role Switcher Store"]
        CLIENT["Resilient Axios HTTP Client<br/>(Bearer Token & 401 Interceptors)"]
        PARALLEL["Parallel Data Fetcher<br/>(Promise.allSettled Sync)"]
        UI --> CTX
        CTX --> CLIENT
        CLIENT --> PARALLEL
    end

    subgraph Gateway ["Middleware & Security Pipeline"]
        CORS["CORS & Origin Whitelist"]
        LOGGER["High-Resolution Latency Logger"]
        ROUTER["Versioned Master Router (/api/v1)"]
        AUTH_MW["JWT & RBAC Middleware"]
        VALID_MW["Payload Sanitizer & Fail-Fast Validator"]
        PARALLEL --> CORS
        CORS --> LOGGER
        LOGGER --> ROUTER
        ROUTER --> AUTH_MW
        AUTH_MW --> VALID_MW
    end

    subgraph ServiceLayer ["Business Logic & Service Layer"]
        AUTH_SVC["Authentication Service"]
        CALC_SVC["Land Calculator Engine"]
        VISION_SVC["Plant Vision Spectrometry"]
        ESCROW_SVC["Smart Escrow Settlement"]
        VALID_MW --> AUTH_SVC
        VALID_MW --> CALC_SVC
        VALID_MW --> VISION_SVC
        VALID_MW --> ESCROW_SVC
    end

    subgraph DatabaseLayer ["Persistence Layer"]
        PG["PostgreSQL (Supabase Cloud Pool / PgBouncer)"]
        AUTH_SVC --> PG
        CALC_SVC --> PG
        VISION_SVC --> PG
        ESCROW_SVC --> PG
    end
```

---

## 🏘️ Konsep Hub Lumbung RW Terdesentralisasi

Mengapa TerasTani membagi operasi ke dalam klaster Rukun Warga (RW)?

```
[Rumah Warga A (5 kg)] ──┐
[Rumah Warga B (12 kg)] ──┼──> [ HUB LUMBUNG RW 07 ] ──> [ TRUK COLD CHAIN DISTRIBUTOR ]
[Rumah Warga C (8 kg)]  ──┘    (Terkumpul: 840 kg)        (Kirim ke Supermarket / Horeka)
```

1. **Radius Jalan Kaki (*Walking Distance 200–500m*):** Sayur daun sangat cepat layu. Dengan lumbung di tingkat RW, warga cukup berjalan kaki 3–5 menit untuk menyetor hasil panen tanpa ongkos transportasi.
2. **Titik Konsolidasi Logistik Crate:** Truk pendingin 1–2 ton milik distributor tidak perlu masuk ke gang-gang pemukiman warga; truk cukup berhenti di titik akses lumbung RW untuk mengangkut muatan masal (500–1.000 kg).
3. **Telemetri Mikroklimat Nyata:** Sensor IoT mengukur cahaya, suhu, dan kelembapan per klaster RW secara spesifik untuk memandu rekomendasi tanam yang akurat.

---

## 🗄️ Skema Basis Data (Entity-Relationship Diagram)

Struktur relasional PostgreSQL di Supabase yang mengikat ekosistem dari kultivator hingga distributor secara kontinu:

```mermaid
erDiagram
    USERS ||--o{ HARVEST_SUBMISSIONS : creates
    USERS ||--o{ USER_WALLETS : owns
    USERS ||--o{ LAND_CALCULATIONS : saves
    USERS ||--o{ USER_MISSIONS : completes
    USER_WALLETS ||--o{ WALLET_TRANSACTIONS : records
    CLUSTERS ||--o{ SENSOR_LOGS : records
    CLUSTERS ||--o{ HARVEST_SUBMISSIONS : aggregates
    CLUSTERS ||--o{ DISTRIBUTOR_QUOTAS : provisions
    DISTRIBUTOR_QUOTAS ||--o{ FLEET_SCHEDULES : dispatches

    USERS {
        uuid id PK
        string email UK
        string name
        string role
        integer xp_points
        decimal wallet_balance
        string password_hash
        timestamp created_at
    }

    CLUSTERS {
        uuid id PK
        string rw_number
        string village_name
        string leader_name
        integer active_nodes
        decimal target_weight_kg
        decimal current_weight_kg
        string pickup_time
    }

    HARVEST_SUBMISSIONS {
        uuid id PK
        uuid user_id FK
        uuid cluster_id FK
        string crop_name
        decimal claimed_weight_kg
        string ai_quality_grade
        string qr_ticket_code UK
        string status
        timestamp created_at
    }

    USER_WALLETS {
        uuid id PK
        uuid user_id FK
        decimal balance
        decimal pending_escrow
        decimal total_withdrawn
        timestamp updated_at
    }

    WALLET_TRANSACTIONS {
        uuid id PK
        uuid wallet_id FK
        string type
        decimal amount
        string notes
        timestamp created_at
    }

    DISTRIBUTOR_QUOTAS {
        uuid id PK
        uuid cluster_id FK
        string crop_name
        decimal target_weight_kg
        decimal collected_weight_kg
        decimal price_per_kg
        string status
    }

    FLEET_SCHEDULES {
        uuid id PK
        uuid quota_id FK
        string vehicle_name
        string driver_name
        string route_name
        string pickup_time
        string status
    }
```

---

## 📂 Struktur Direktori Monorepo

```text
TerasTani/
├── .gitignore                   # Ignore rules build, node_modules, dan file .env
├── package.json                 # Master npm scripts (concurrently pnpm dev & build)
├── pnpm-workspace.yaml          # Konfigurasi monorepo pnpm
├── README.md                    # Dokumentasi utama proyek TerasTani
│
├── tera-backend/                # Core RESTful API Service (Express 5 + Clean Layered)
│   ├── .env                     # Kredensial runtime lokal (PORT, DATABASE_URL, JWT)
│   ├── .env.example             # Template konfigurasi environment backend
│   ├── index.js                 # Entrypoint runtime aplikasi backend
│   ├── package.json             # Manifest dependensi & skrip backend
│   ├── seed.js                  # Shortcut runner seeder database
│   ├── README.md                # Dokumentasi komprehensif backend
│   └── src/
│       ├── app.js               # Express application builder, CORS & error pipeline
│       ├── server.js            # Port listener & graceful shutdown handlers
│       ├── config/              # env.config, db.config (pg.Pool), constants
│       ├── controllers/         # HTTP handlers (auth, dashboard, harvest, quota, wallet)
│       ├── services/            # Logika bisnis inti murni
│       ├── repositories/        # Kueri database PostgreSQL terisolasi (parameterized SQL)
│       ├── routes/              # Routing versioned /api/v1 (14 modul API)
│       ├── middlewares/         # JWT auth, RBAC, error handler, latency logger, validator
│       ├── validations/         # Schema sanitasi & validasi input fail-fast
│       ├── utils/               # ApiError, ApiResponse, asyncHandler
│       └── seed/                # Seeder idempoten untuk akun tester juri
│
└── tera-frontend/               # Client Web Application (Vite 8 + React 19 + Tailwind 4)
    ├── .env                     # Variabel runtime frontend (VITE_API_URL)
    ├── .env.example             # Template variabel frontend
    ├── vite.config.js           # Konfigurasi Vite & Tailwind CSS v4
    ├── index.html               # Master HTML template
    ├── package.json             # Manifest dependensi client
    ├── README.md                # Dokumentasi komprehensif frontend
    └── src/
        ├── main.jsx             # DOM mounting point
        ├── App.jsx              # Routing, lazy suspense, dan global AuthProvider
        ├── index.css            # Tailwind directives, custom scrollbar & utility classes
        ├── api/                 # Axios client singleton & endpoints API terisolasi
        ├── config/              # Variabel lingkungan client terpusat (env.js)
        ├── constants/           # app.constants (klaster, tanaman, cuaca) & storage.keys
        ├── context/             # AuthContext (state session & role switcher)
        ├── hooks/               # useAuth, useLocalStorage
        ├── utils/               # formatters (formatIDR), plantVisionEngine, validators
        ├── components/
        │   ├── common/          # Modal taktil, QRCodeImage, Button, Badge
        │   └── layout/          # Header (telemetri IoT & sync pill), Sidebar, ProtectedRoute
        ├── features/
        │   ├── auth/            # AuthModals (Login & Register dialog)
        │   └── dashboard/       # 8 Modul Tab Dasbor & dialog modal terkait
        └── pages/               # Halaman mandiri: Home, Login, Register, Dashboard
```

---

## 🌟 Fitur Utama Ekosistem

1. **Dashboard Monitoring Real-Time & Sensor IoT RW**:
   - Menampilkan telemetri mikroklimat hidup (intensitas cahaya $W/m^2$, suhu lingkungan, pH air, kelembapan).
   - Sinkronisasi paralel di latar belakang tanpa kedipan halaman (*zero flash-of-empty-content*).
2. **Kalkulator Lahan AI Presisi**:
   - Menghitung kapasitas lubang tanam berdasarkan 4 jenis struktur lahan (Balkon, Pekarangan, Rooftop, Dinding Vertikal), luas efektif, dan paparan sinar surya harian.
   - Tombol *"Simpan ke Rencana Budidaya"* menyimpan simulasi ke database dan memunculkan unit pemantauan plot hidup.
3. **Computer Vision AI Quality Inspection (Spektrometri Daun)**:
   - Pemindaian spektral piksel kanvas dari webcam/foto: Indeks Klorofil SPAD, rasio klorosis/hama, dan penentuan sertifikasi komersial resmi (**Grade A+** hingga **Grade D**).
   - Mengunci harga beli resmi per kg dan mentransfer sertifikasi ke lumbung secara instan.
4. **Lumbung Komunitas & Tiket Setor QR Digital**:
   - Agregasi panen mikro warga ke peti pendingin RW (*Crate Lumbung*) dengan kode batch unik (`TT-RW07-XXXXXX`) dan QR Code asli yang dapat dipindai.
5. **Bursa Pasokan Panen Grosir Distributor**:
   - Portal pengadaan sayur komersial B2B bagi restoran dan ritel dengan transparansi bobot terkumpul, harga kontrak, dan pemesanan kuota real-time.
6. **Manifest Armada Logistik Cold Chain**:
   - Penjadwalan dan pelacakan status armada truk berpendingin (*SCHEDULED* $\to$ *IN_TRANSIT* $\to$ *COMPLETED*) untuk menjaga kesegaran panen.
7. **Smart Escrow Financial Wallet & Settlement**:
   - Dana distributor dikunci dalam rekening bersama (*Smart Escrow*) dan dicairkan otomatis ke dompet warga saat tiket ditimbang. Dilengkapi simulasi penarikan saldo instan ke Bank/E-Wallet.
8. **Misi Budidaya & Peringkat Komunal (Gamifikasi)**:
   - Misi harian/mingguan berhadiah Poin XP, kenaikan pangkat kultivator, dan papan peringkat se-kelurahan.

---

## 📡 Dokumentasi Katalog RESTful API v1

Backend TerasTani menyediakan arsitektur RESTful API berversi `/api/v1`:

| Modul | Method | Endpoint | Hak Akses | Deskripsi |
| :--- | :---: | :--- | :---: | :--- |
| **Auth** | `POST` | `/api/v1/auth/login` | Publik | Otentikasi email & kata sandi, menghasilkan JWT Bearer |
| | `POST` | `/api/v1/auth/register` | Publik | Registrasi akun kultivator atau distributor baru |
| | `GET` | `/api/v1/auth/me` | Bearer | Mendapatkan data profil, saldo dompet, dan poin XP |
| **Health** | `GET` | `/api/v1/health` | Publik | Diagnostik kesehatan server Express dan koneksi PostgreSQL |
| **Clusters** | `GET` | `/api/v1/clusters` | Publik | Daftar klaster Lumbung RW dan kapasitas peti crate aktif |
| **Sensors** | `GET` | `/api/v1/sensors/latest` | Publik | Data telemetri sensor lingkungan IoT per klaster RW |
| **Calculator** | `GET` | `/api/v1/calculator/my` | Bearer | Mengambil seluruh plot budidaya tersimpan milik pengguna |
| | `POST` | `/api/v1/calculator/save`| Bearer | Menyimpan hasil perhitungan simulasi lahan AI ke database |
| | `DELETE`| `/api/v1/calculator/:id` | Bearer | Menghapus unit plot budidaya dari pemantauan dasbor |
| **Harvests** | `GET` | `/api/v1/harvests/my` | Bearer | Riwayat tiket setor panen QR milik pengguna |
| | `POST` | `/api/v1/harvests/submit` | Bearer | Menerbitkan tiket setor panen QR baru ke Lumbung RW |
| **Quotas** | `GET` | `/api/v1/quotas` | Publik | Daftar alokasi kuota pengadaan grosir distributor |
| | `POST` | `/api/v1/quotas/:id/book`| Bearer | Pemesanan alokasi kuota panen RW oleh distributor |
| **Fleets** | `GET` | `/api/v1/fleets` | Publik | Jadwal dan status rute armada logistik cold chain |
| | `PATCH`| `/api/v1/fleets/:id/status`| Bearer | Pembaruan status pergerakan armada penjemput |
| **Wallet** | `GET` | `/api/v1/wallet` | Bearer | Rincian saldo dompet, dana tertahan di escrow, & mutasi |
| | `POST` | `/api/v1/wallet/withdraw`| Bearer | Penarikan saldo dompet ke rekening bank atau e-wallet |
| **Gamify** | `GET` | `/api/v1/gamification/missions`| Bearer | Daftar quest harian & mingguan beserta status klaim |
| | `POST` | `/api/v1/gamification/claim` | Bearer | Mengklaim hadiah XP dari misi budidaya yang selesai |
| | `GET` | `/api/v1/gamification/leaderboard`| Publik | Papan peringkat kultivator teraktif di kelurahan |

---

## 🎨 Design System & Estetika Visual

TerasTani menerapkan pendekatan desain **Tactile Editorial Neo-Brutalism & Botanical Luxury**:
- **Palet Warna Alami**:
  - *Ivory / Paper*: `#F4F0E8` / `#FAF9F6` (latar belakang taktil lembut)
  - *Botanical Moss*: `#0B1912` / `#122B1E` / `#24553B` (hijau kanopi hutan)
  - *Harvest Ochre*: `#C9942B` / `#DEAB42` (emas kematangan panen)
  - *Ink*: `#171715` (tinta hitam arsitektural)
- **Komponen Taktil 2D**: Border tegas `border-2 border-ink`, bayangan offset solid (`shadow-[4px_4px_0px_0px_#171715]`), tipografi serif editorial dipadukan monospace tabular.
- **Bebas Alert Peramban**: Seluruh interaksi menggunakan modal pop-up taktil beranimasi halus tanpa memicu `localhost says` peramban.

---

## 📚 Sub-Modul Repositori

Untuk dokumentasi teknis mendalam per modul aplikasi:
- [📖 Dokumentasi Frontend Client (`tera-frontend/README.md`)](./tera-frontend/README.md)
- [📖 Dokumentasi Backend API Core (`tera-backend/README.md`)](./tera-backend/README.md)
- [📄 Panduan Lengkap Konseptual Sistem Dari Nol](./panduan_lengkap_terastani_dari_nol.md)

---

## 📄 Lisensi & Tim Pengembang

Hak Cipta &copy; 2026 TerasTani Nusantara Inc. Seluruh hak cipta dilindungi undang-undang.  
Dikembangkan untuk kompetisi inovasi digital agrikultur dan ketahanan pangan nasional.
