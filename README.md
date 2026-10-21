# 🌿 TerasTani &mdash; Decentralized Urban Agriculture Platform

[![Node.js Version](https://img.shields.io/badge/Node.js-%3E%3D20.0.0-brightgreen.svg)](https://nodejs.org/)
[![React Version](https://img.shields.io/badge/React-19.x-blue.svg)](https://react.dev/)
[![Express Version](https://img.shields.io/badge/Express-5.x-lightgrey.svg)](https://expressjs.com/)
[![TailwindCSS Version](https://img.shields.io/badge/TailwindCSS-4.x-38bdf8.svg)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL%20%2F%20Supabase-336791.svg)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-ISC-green.svg)](#lisensi)

> Platform agrikultur presisi perkotaan yang menghubungkan panen pekarangan mikro warga dengan mitra distributor komersial (*off-taker*) melalui otomasi sensor IoT, validasi Computer Vision Grade A, tiket timbang QR terdesentralisasi, dan kontrak *smart escrow*.

---

## ⚡ CARA CEPAT MENJALANKAN APLIKASI (`pnpm dev`)

Untuk menjalankan seluruh ekosistem (Frontend & Backend) dalam satu langkah:

### 1. Pasang Dependensi
```bash
pnpm install
```

### 2. Jalankan Mode Pengembangan
```bash
pnpm dev
```

> [!IMPORTANT]
> Perintah `pnpm dev` di atas akan otomatis mengaktifkan:
> - **Frontend Web Client**: [http://localhost:5173](http://localhost:5173)
> - **Backend REST API**: [http://localhost:5001](http://localhost:5001)
> - **Health Diagnostic Endpoint**: [http://localhost:5001/api/v1/health](http://localhost:5001/api/v1/health)

### 3. Akun Evaluasi Cepat (1-Klik di Halaman Login)
Buka [http://localhost:5173/login](http://localhost:5173/login) dan gunakan tombol **Akun Uji Coba Cepat (Evaluasi Juri)**:
- **Admin**: `admin@gmail.com` / `12345678`
- **Warga Kultivator**: `warga.rawasari@terastani.id` / `rahasia123`
- **Mitra Distributor**: `distributor@segarlogistik.co.id` / `rahasia123`

---

## 📋 Daftar Isi
1. [Pemetaan Rubrik Penilaian Kompetisi](#-pemetaan-rubrik-penilaian-kompetisi)
2. [Arsitektur Sistem (Enterprise Architecture)](#-arsitektur-sistem-enterprise-architecture)
3. [Skema Basis Data (Entity-Relationship Diagram)](#-skema-basis-data-entity-relationship-diagram)
4. [Struktur Direktori Monorepo](#-struktur-direktori-monorepo)
5. [Fitur Utama Ekosistem](#-fitur-utama-ekosistem)
6. [Panduan Instalasi & Konfigurasi Lingkungan](#-panduan-instalasi--konfigurasi-lingkungan)
7. [Dokumentasi API Ringkas](#-dokumentasi-api-ringkas)
8. [Design System & Estetika Visual](#-design-system--estetika-visual)
9. [Sub-Modul Repositori](#-sub-modul-repositori)
10. [Lisensi & Tim Pengembang](#-lisensi--tim-pengembang)

---

## 🏛️ Arsitektur Sistem (Enterprise Architecture)

TerasTani mengadopsi standar **Clean Layered Architecture** pada backend dan **Feature-Sliced Component Architecture** pada frontend:

```mermaid
graph TD
    subgraph Client ["Frontend Layer (React 19 + Vite 8)"]
        UI["Tactile Editorial Interface<br/>(Neo-Brutalist & Botanical Luxury)"]
        CTX["AuthContext & Role Perspective Store"]
        CLIENT["Resilient Axios HTTP Client<br/>(Bearer Token & 401 Interceptors)"]
        UI --> CTX
        CTX --> CLIENT
    end

    subgraph Gateway ["Middleware & Security Pipeline"]
        CORS["CORS & Origin Whitelist"]
        LOGGER["Latency Request Logger"]
        ROUTER["Versioned Master Router (/api/v1)"]
        AUTH_MW["JWT & RBAC Middleware"]
        VALID_MW["Payload Sanitizer & Validator"]
        CLIENT --> CORS
        CORS --> LOGGER
        LOGGER --> ROUTER
        ROUTER --> AUTH_MW
        AUTH_MW --> VALID_MW
    end

    subgraph ServiceLayer ["Business Logic & Repository Layer"]
        AUTH_SVC["Authentication Service"]
        USER_REPO["User Repository (Data Access Layer)"]
        VALID_MW --> AUTH_SVC
        AUTH_SVC --> USER_REPO
    end

    subgraph DatabaseLayer ["Persistence Layer"]
        PG["PostgreSQL (Supabase Cloud Pool)"]
        USER_REPO --> PG
    end
```

---

## 🗄️ Skema Basis Data (Entity-Relationship Diagram)

Struktur relasional PostgreSQL di Supabase yang mendukung integritas data multi-entitas dari kultivator hingga distributor:

```mermaid
erDiagram
    USERS ||--o{ HARVEST_SUBMISSIONS : creates
    USERS ||--o{ USER_WALLETS : owns
    USERS ||--o{ LAND_CALCULATIONS : saves
    USERS ||--o{ USER_MISSIONS : completes
    CLUSTERS ||--o{ SENSOR_LOGS : records
    CLUSTERS ||--o{ HARVEST_SUBMISSIONS : aggregates
    CLUSTERS ||--o{ DISTRIBUTOR_QUOTAS : provisions
    DISTRIBUTOR_QUOTAS ||--o{ FLEET_SCHEDULES : dispatches

    USERS {
        uuid id PK
        string email UK
        string name
        string role
        string password_hash
        timestamp created_at
    }

    CLUSTERS {
        uuid id PK
        string rw_number
        string village_name
        string leader_name
        integer active_growers
        decimal target_quota_kg
    }

    HARVEST_SUBMISSIONS {
        uuid id PK
        uuid user_id FK
        uuid cluster_id FK
        string crop_name
        decimal claimed_weight_kg
        string grade
        string qr_ticket_code UK
        string status
        timestamp submitted_at
    }

    USER_WALLETS {
        uuid id PK
        uuid user_id FK
        decimal balance
        decimal escrow_pending
        timestamp updated_at
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
        string vehicle_plate
        string driver_name
        timestamp pickup_time
        string status
    }
```

---

## 📂 Struktur Direktori Monorepo

```text
TerasTani/
├── .editorconfig                # Standar indentasi (2 spasi), charset UTF-8, LF line-endings
├── .gitignore                   # Ignore rules build, node_modules, log, dan file .env
├── package.json                 # Master npm package scripts (concurrently dev & build)
├── pnpm-workspace.yaml          # Konfigurasi monorepo pnpm packages
├── README.md                    # Dokumentasi utama proyek TerasTani
│
├── tera-backend/                # Core Backend API Service (Layered Architecture)
│   ├── .env                     # Kredensial lokal runtime
│   ├── .env.example             # Template konfigurasi environment
│   ├── index.js                 # Entrypoint runtime aplikasi backend
│   ├── package.json             # Manifest dependensi & skrip backend
│   ├── seed.js                  # Shortcut runner seeder database
│   ├── README.md                # Dokumentasi komprehensif backend
│   └── src/
│       ├── app.js               # Express application builder, CORS & error pipeline
│       ├── server.js            # Port listener & graceful shutdown handlers
│       ├── config/              # env.config, db.config (pool PG), constants
│       ├── controllers/         # HTTP handlers (auth.controller, health.controller)
│       ├── services/            # Logika bisnis (auth.service)
│       ├── repositories/        # Kueri database PostgreSQL terisolasi (user.repository)
│       ├── routes/              # Routing versioned /api/v1 dan legacy root
│       ├── middlewares/         # JWT auth, RBAC, error handler, logger, validator
│       ├── validations/         # Schema sanitasi & validasi input
│       ├── utils/               # ApiError, ApiResponse, asyncHandler
│       └── seed/                # Seeder idempoten untuk akun tester
│
└── tera-frontend/               # Client Web Application (Vite 8 + React 19)
    ├── .env.example             # Template variabel frontend (VITE_API_URL)
    ├── vite.config.js           # Konfigurasi Vite & Tailwind CSS v4
    ├── index.html               # Master HTML template
    ├── package.json             # Manifest dependensi client
    ├── README.md                # Dokumentasi komprehensif frontend
    └── src/
        ├── main.jsx             # DOM mounting point
        ├── App.jsx              # Routing, lazy suspense, dan global AuthProvider
        ├── index.css            # Tailwind directives, custom classes, scrollbar-thin
        ├── api/                 # Axios client singleton & endpoints auth.api
        ├── config/              # Variabel lingkungan client terpusat (env.js)
        ├── constants/           # app.constants (klaster, tanaman, cuaca) & storage.keys
        ├── context/             # AuthContext (state session & role switcher)
        ├── hooks/               # useAuth, useLocalStorage
        ├── utils/               # formatters (formatIDR) & validators
        ├── components/
        │   ├── common/          # Modal (backdrop 2px blur), Button, Badge
        │   └── layout/          # Header (sensor telemetry), Sidebar, ProtectedRoute
        ├── features/
        │   ├── auth/            # AuthModals (Login & Register modal)
        │   └── dashboard/       # 8 Tab Modul Dasbor & dialog modal terkait
        └── pages/               # Halaman mandiri: Home, Login, Register, Dashboard
```

---

## 🌟 Fitur Utama Ekosistem

1. **Dashboard Monitoring Real-Time**:
   - Telemetri mikroklimat hidup (intensitas cahaya $W/m^2$, suhu, pH air, kelembaban udara).
   - Simulasi waktu (*Pagi / Siang / Sore*) yang memperbarui kondisi tanaman dan rekomendasi AI.
2. **Kalkulator Lahan AI**:
   - Simulasi interaktif lubang tanam hidroponik, kebutuhan nutrisi AB mix, bobot panen, dan estimasi keuntungan bersih per siklus dengan garansi harga beli lumbung.
3. **Computer Vision AI Quality Inspection**:
   - Simulator pemindaian kamera tanaman dengan indeks klorofil SPAD, deteksi keseragaman daun, dan cap sertifikasi mutu komersial **Grade A+**.
4. **Lumbung Komunitas & Tiket QR**:
   - Penyatuan kuota panen warga ke titik kumpul RW (*Crate Lumbung*) dengan tiket QR digital unik untuk penimbangan transparan.
5. **Smart Escrow Financial Wallet**:
   - Saldo hasil panen tersimpan aman dalam kontrak escrow distributor dengan simulator penarikan dana instan ke Bank/E-Wallet.
6. **Gamifikasi & Papan Peringkat Komunal**:
   - Misi harian budidaya berhadiah Poin XP dan peringkat kultivator teladan se-kelurahan.
7. **Mode Penilaian Juri (Evaluator Switcher)**:
   - Tombol pengalih sudut pandang peran (*Warga* $\leftrightarrow$ *Distributor*) di sidebar untuk memudahkan evaluasi kompetisi tanpa perlu logout.

---

## 🛠️ Panduan Instalasi & Konfigurasi Lingkungan

### 1. Salin File Konfigurasi Environment
```bash
# Konfigurasi Backend
cp tera-backend/.env.example tera-backend/.env

# Konfigurasi Frontend
cp tera-frontend/.env.example tera-frontend/.env
```

### 2. Isi Variabel di `tera-backend/.env`
```env
PORT=5001
NODE_ENV=development
DATABASE_URL=postgresql://postgres.user:password@aws-0-ap-southeast-2.pooler.supabase.com:5432/postgres
JWT_SECRET=terastani_jwt_secret_key_4096_secure
JWT_EXPIRES_IN=7d
CORS_ORIGIN=*
```

> [!NOTE]
> Backend sengaja menggunakan port default **`5001`** untuk mencegah bentrok dengan port `5000` yang secara default digunakan oleh fitur sistem macOS AirPlay Receiver (*ControlCenter*).

### 3. Jalankan Seeding Akun Uji Coba
```bash
pnpm -C tera-backend seed
```

### 4. Eksekusi Server
```bash
pnpm dev
```

---

## 📡 Dokumentasi API Ringkas

Backend menyediakan routing modern berversi `/api/v1` sekaligus mendukung rute legacy:

| Method | Endpoint | Auth | Deskripsi |
| :--- | :--- | :---: | :--- |
| `GET` | `/health` / `/api/v1/health` | Publik | Diagnostik uptime, versi, dan koneksi PostgreSQL |
| `POST` | `/login` / `/api/v1/auth/login` | Publik | Otentikasi email & kata sandi, mengembalikan JWT Bearer |
| `POST` | `/register` / `/api/v1/auth/register` | Publik | Pendaftaran akun baru warga atau mitra distributor |
| `GET` | `/api/v1/auth/me` | Bearer | Mendapatkan profil pengguna yang sedang login |

---

## 🎨 Design System & Estetika Visual

TerasTani menerapkan pendekatan desain **Tactile Editorial Neo-Brutalism & Botanical Luxury**:
- **Palet Warna Alam & Mineral**:
  - *Ivory / Paper*: `#F4F0E8` / `#FAF9F6` (latar belakang kertas taktil lembut)
  - *Botanical Moss*: `#0B1912` / `#122B1E` / `#24553B` (hijau kanopi hutan dalam)
  - *Harvest Ochre*: `#C9942B` / `#DEAB42` (kuning keemasan panen raya)
  - *Ink*: `#171715` (tinta hitam pekat arsitektural)
- **Detail Taktil**: Border tegas `border-2 border-ink`, bayangan offset solid 2D (`shadow-[4px_4px_0px_0px_#171715]`), cap stempel artesanal, dan grid blueprint presisi.
- **Micro-Interactions**: Modal dengan *soft-dimming* (`bg-ink/35`) dan blur minimal 1-2px (`backdrop-blur-[2px]`), serta scrollbar tipis kustom (`scrollbar-thin`).

---

## 📚 Sub-Modul Repositori

Untuk dokumentasi teknis mendalam per modul, silakan baca berkas README khusus:
- [📖 Dokumentasi Frontend Client (tera-frontend/README.md)](file:///Users/adyvka/Documents/Competition%20Porjects/TerasTani/tera-frontend/README.md)
- [📖 Dokumentasi Backend API Core (tera-backend/README.md)](file:///Users/adyvka/Documents/Competition%20Porjects/TerasTani/tera-backend/README.md)

---

## 📄 Lisensi & Tim Pengembang

Hak Cipta &copy; 2026 TerasTani Nusantara Inc. Seluruh hak cipta dilindungi undang-undang.  
Dikembangkan untuk kompetisi inovasi digital agrikultur berkelanjutan.
