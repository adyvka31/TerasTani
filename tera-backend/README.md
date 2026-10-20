# ⚙️ TerasTani Backend &mdash; Core API & Micro-Engine Service

[![Node.js Version](https://img.shields.io/badge/Node.js-%3E%3D20.0.0-brightgreen.svg)](https://nodejs.org/)
[![Express Version](https://img.shields.io/badge/Express-5.x-lightgrey.svg)](https://expressjs.com/)
[![Database](https://img.shields.io/badge/Database-PostgreSQL%20%2F%20Supabase-336791.svg)](https://supabase.com/)
[![Architecture](https://img.shields.io/badge/Architecture-Clean%20Layered-orange.svg)](#-arsitektur-sistem-clean-layered-architecture)
[![License](https://img.shields.io/badge/License-ISC-green.svg)](#lisensi)

> Layanan API terpusat dan mesin bisnis TerasTani yang dibangun di atas Express 5, PostgreSQL (Supabase Connection Pool), dan arsitektur modular berlapis (*Clean Layered Architecture*). Menyediakan otentikasi aman JWT, RBAC multi-peran, pencatatan latensi transaksi beresolusi tinggi, dan integrasi data agrikultur presisi.

---

## ⚡ CARA MENJALANKAN BACKEND (`pnpm dev`)

Untuk menjalankan server backend pengembangan secara instan:

### Opsi A: Dari Direktori Root Proyek (Direkomendasikan)
```bash
pnpm -C tera-backend dev
```

### Opsi B: Dari Direktori `tera-backend`
```bash
cd tera-backend
pnpm dev
```

### Opsi C: Menjalankan Sekaligus Bersama Frontend
```bash
# Dari root monorepo TerasTani
pnpm dev
```

### 1. Inisialisasi Akun Uji Coba & Seeder Basis Data
Jalankan seeder bawaan untuk memverifikasi skema PostgreSQL Supabase dan membuat akun tester juri:
```bash
# Dari root monorepo
pnpm -C tera-backend seed

# Atau dari dalam direktori tera-backend
pnpm seed
```

### 2. Verifikasi Status Kesehatan Server (Diagnostic Endpoint)
Buka peramban atau terminal Anda:
```bash
curl http://localhost:5001/api/v1/health
```
Respons yang diharapkan:
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Sistem TerasTani Berjalan Normal",
  "data": {
    "status": "HEALTHY",
    "uptime": 12.45,
    "services": {
      "database": "UP",
      "api": "UP"
    },
    "environment": "development",
    "version": "1.0.0"
  }
}
```

> [!IMPORTANT]
> **Catatan Port 5001 (Solusi Konflik macOS AirPlay Receiver):**  
> Pada macOS (Monterey ke atas), port `5000` secara default dicadangkan oleh sistem operasi untuk **AirPlay Receiver (`AirTunes`/`ControlCenter`)**, yang akan memblokir request eksternal dengan kode error `HTTP 403 Forbidden`. Oleh karena itu, backend TerasTani secara baku berjalan di port **`5001`**. Seluruh klien frontend telah disinkronisasi ke port ini.

---

## 📋 Daftar Isi
1. [Arsitektur Sistem (Clean Layered Architecture)](#-arsitektur-sistem-clean-layered-architecture)
2. [Struktur Direktori Komprehensif](#-struktur-direktori-komprehensif)
3. [Konfigurasi Lingkungan (`.env`)](#-konfigurasi-lingkungan-env)
4. [Dokumentasi RESTful API & Endpoint](#-dokumentasi-restful-api--endpoint)
5. [Keamanan, Otentikasi, & RBAC](#-keamanan-otentikasi--rbac)
6. [Pipeline Validasi & Standarisasi Error](#-pipeline-validasi--standarisasi-error)
7. [Skema Basis Data & Akun Evaluasi Juri](#-skema-basis-data--akun-evaluasi-juri)
8. [Graceful Shutdown & Keandalan Proses](#-graceful-shutdown--keandalan-proses)
9. [Daftar Skrip Eksekusi](#-daftar-skrip-eksekusi)

---

## 🏛️ Arsitektur Sistem (Clean Layered Architecture)

Backend TerasTani memisahkan tugas teknis secara tegas menggunakan pola **Layered Architecture** tingkat enterprise:

```mermaid
flowchart TD
    Client["Client (Browser / Postman / IoT)"] -->|HTTP Request| Server["HTTP Listener (server.js)"]
    Server --> ExpressApp["Express App (app.js)"]
    
    subgraph Middlewares ["Global Middleware Pipeline"]
        ExpressApp --> CORS["CORS Security"]
        CORS --> Parsers["Body Parser (JSON 10MB)"]
        Parsers --> Logger["Request Latency Logger"]
    end
    
    subgraph Routing ["Routing & Validation Layer"]
        Logger --> MasterRouter["Master Router (/api/v1 & legacy)"]
        MasterRouter --> ValMW["Schema Validation Middleware"]
    end
    
    subgraph Controllers ["Presentation & Controller Layer"]
        ValMW --> AuthCtrl["auth.controller.js"]
        MasterRouter --> HealthCtrl["health.controller.js"]
    end
    
    subgraph Services ["Business Logic Domain Layer"]
        AuthCtrl --> AuthService["auth.service.js"]
        AuthService --> Encrypt["bcryptjs (Salt 10)"]
        AuthService --> TokenGen["jsonwebtoken (JWT)"]
    end
    
    subgraph Repositories ["Data Access Layer (Repository Pattern)"]
        AuthService --> UserRepo["user.repository.js"]
    end
    
    subgraph Database ["Persistence Layer"]
        UserRepo --> DBConfig["db.config.js (pg.Pool)"]
        HealthCtrl --> DBConfig
        DBConfig --> Supabase[("Supabase PostgreSQL Database")]
    end
    
    subgraph Handling ["Centralized Response / Error"]
        AuthCtrl --> ResSuccess["ApiResponse.success()"]
        AuthCtrl -.->|throw ApiError| ErrMW["error.middleware.js"]
        ErrMW --> ResError["Standard Error Envelope"]
    end
```

### Penjelasan Lapisan Arsitektur
1. **Infrastructure & Server Layer (`src/server.js`)**:
   Mengelola siklus hidup proses Node.js, pembacaan port dinamis, verifikasi *handshake* database saat *startup*, dan pendengar sinyal interupsi sistem (`SIGINT`, `SIGTERM`) untuk *graceful shutdown*.
2. **Application Layer (`src/app.js`)**:
   Konfigurasi Express utama, proteksi header CORS, kuota muatan JSON (10MB untuk penanganan *payload* gambar simulator Computer Vision), dan integrasi *catch-all* rute 404.
3. **Middleware Pipeline Layer (`src/middlewares/`)**:
   - `logger.middleware.js`: Menghitung waktu respons per rute secara presisi menggunakan `process.hrtime()`.
   - `validation.middleware.js`: Memvalidasi kelengkapan dan format payload request sebelum masuk ke *controller*.
   - `auth.middleware.js`: Menolak request tanpa token Bearer JWT yang sah serta menerapkan validasi hak akses peran (*Role-Based Access Control*).
   - `error.middleware.js`: Mengonversi galat operasional dan eksepsi sistem menjadi format respons JSON terpadu.
4. **Routing Layer (`src/routes/`)**:
   Mendistribusikan lalu lintas ke rute modular versi standar (`/api/v1/auth`, `/api/v1/health`) serta menyediakan rute kompatibilitas langsung (`/login`, `/register`, `/health`).
5. **Presentation / Controller Layer (`src/controllers/`)**:
   Menerima request HTTP, memanggil *service* yang bersangkutan, dan mengembalikan data menggunakan helper standar `ApiResponse`.
6. **Domain / Service Layer (`src/services/`)**:
   Mengisolasi logika bisnis murni: hashing password dengan bcrypt, verifikasi token, pengecekan duplikasi surel, dan pembuatan sesi login.
7. **Data Access / Repository Layer (`src/repositories/`)**:
   Menangani seluruh kueri SQL terparameterisasi ke PostgreSQL. Mencegah kerentanan *SQL Injection* secara mutlak dan memisahkan logika database dari bisnis.
8. **Utilities Layer (`src/utils/`)**:
   Mencakup wrapper asynchronous `async-handler.js`, cetak biru error terstruktur `api-error.js`, dan format respons standar `api-response.js`.

---

## 📂 Struktur Direktori Komprehensif

```text
tera-backend/
├── .env                         # Konfigurasi variabel lingkungan lokal (diabaikan git)
├── .env.example                 # Template konfigurasi variabel lingkungan
├── index.js                     # Root entrypoint delegasi ke src/server.js
├── package.json                 # Definisi dependensi & skrip eksekusi
├── pnpm-lock.yaml               # Kunci deterministik dependensi pnpm
├── seed.js                      # Root runner seeder database (delegasi ke src/seed)
└── src/
    ├── app.js                   # Konfigurasi middleware & router Express
    ├── server.js                # Server bootstrapper & graceful shutdown handler
    ├── config/                  # Konfigurasi eksternal & koneksi
    │   ├── constants.js         # Konstanta HTTP status, peran akun, & error codes
    │   ├── db.config.js         # Pool koneksi PostgreSQL (pg.Pool) & ping helper
    │   └── env.config.js        # Validasi dan agregasi variabel process.env
    ├── controllers/             # Controller penangan request HTTP
    │   ├── auth.controller.js   # Endpoint login, register, dan verifikasi profil
    │   └── health.controller.js # Endpoint diagnostik kesehatan sistem & database
    ├── middlewares/             # Middleware filter & interceptor
    │   ├── auth.middleware.js   # Verifikasi token JWT & proteksi RBAC
    │   ├── error.middleware.js  # Penanganan error global terpusat
    │   ├── logger.middleware.js # Pencatat latensi HTTP request beresolusi tinggi
    │   └── validation.middleware.js # Validasi fail-fast skema payload request
    ├── repositories/            # Data Access Object (DAO) terisolasi
    │   └── user.repository.js   # Kueri SQL terparameterisasi tabel users
    ├── routes/                  # Definisi rute RESTful
    │   ├── auth.routes.js       # Rute /api/v1/auth (login, register, me)
    │   ├── health.routes.js     # Rute /api/v1/health (diagnostik)
    │   └── index.js             # Master aggregator rute v1 & rute legacy
    ├── seed/                    # Skrip pengisian data awal
    │   └── seed.js              # Idempotent database seeder (3 akun uji coba)
    ├── services/                # Logika bisnis inti murni
    │   └── auth.service.js      # Hashing bcrypt, verifikasi kredensial, & JWT
    ├── utils/                   # Helper dan cetak biru fungsional
    │   ├── api-error.js         # Kelas galat operasional terstruktur (ApiError)
    │   ├── api-response.js      # Kelas format respons standar (ApiResponse)
    │   └── async-handler.js     # Wrapper pembungkus async/await anti-try-catch
    └── validations/             # Aturan validasi payload request
        └── auth.validation.js   # Aturan validasi registrasi & login pengguna
```

---

## 🔧 Konfigurasi Lingkungan (`.env`)

Buat berkas `.env` di dalam folder `tera-backend/` atau sesuaikan dari [`.env.example`](file:///Users/adyvka/Documents/Competition%20Porjects/TerasTani/tera-backend/.env.example):

```ini
# ==============================================================================
# KONFIGURASI SERVER TERASTANI BACKEND
# ==============================================================================

# Port server HTTP (Default: 5001 untuk menghindari bentrok AirPlay port 5000)
PORT=5001

# Lingkungan runtime (development | production | test)
NODE_ENV=development

# Kebijakan CORS (Cross-Origin Resource Sharing)
CORS_ORIGIN=*

# ==============================================================================
# KONEKSI BASIS DATA POSTGRESQL (SUPABASE CONNECTION POOL)
# ==============================================================================
# Format: postgresql://[user]:[password]@[host]:[port]/[database]
DATABASE_URL=postgresql://postgres.qgoxlrvqvxkfqhfspspn:DaffaAura17_@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres

# ==============================================================================
# OTENTIKASI & KEAMANAN TOKEN JWT
# ==============================================================================
# Kunci rahasia untuk menandatangani Bearer token JWT (min. 32 karakter pada produksi)
JWT_SECRET=terastani_secure_jwt_token_secret_key_2026_super_safe

# Durasi masa aktif sesi token
JWT_EXPIRES_IN=7d
```

---

## 📡 Dokumentasi RESTful API & Endpoint

Semua endpoint didesain dengan format respon ganda (*Dual Format Compatibility*) agar kompatibel dengan pemanggilan klien langsung maupun arsitektur RESTful standar:

### 1. Registrasi Akun Pengguna
- **Method & Path**: `POST /api/v1/auth/register` *(atau rute pintas `POST /register`)*
- **Akses**: Publik
- **Request Body**:
```json
{
  "name": "Budi Santoso",
  "email": "budi.santoso@terastani.id",
  "password": "PasswordAman123",
  "role": "user"
}
```
- **Response Sukses (HTTP 201 Created)**:
```json
{
  "success": true,
  "statusCode": 201,
  "message": "Registrasi akun TerasTani berhasil!",
  "data": {
    "user": {
      "id": 4,
      "name": "Budi Santoso",
      "email": "budi.santoso@terastani.id",
      "role": "user"
    }
  }
}
```

---

### 2. Autentikasi & Login Pengguna
- **Method & Path**: `POST /api/v1/auth/login` *(atau rute pintas `POST /login`)*
- **Akses**: Publik
- **Request Body**:
```json
{
  "email": "warga.rawasari@terastani.id",
  "password": "rahasia123"
}
```
- **Response Sukses (HTTP 200 OK)**:
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Login berhasil! Selamat datang kembali di TerasTani.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 2,
    "name": "Warga Kultivator Rawasari",
    "email": "warga.rawasari@terastani.id",
    "role": "user"
  },
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 2,
      "name": "Warga Kultivator Rawasari",
      "email": "warga.rawasari@terastani.id",
      "role": "user"
    }
  }
}
```

---

### 3. Profil Pengguna yang Sedang Login
- **Method & Path**: `GET /api/v1/auth/me`
- **Akses**: Terproteksi (Wajib menyertakan header `Authorization: Bearer <TOKEN>`)
- **Response Sukses (HTTP 200 OK)**:
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Data profil pengguna berhasil diambil.",
  "data": {
    "user": {
      "id": 2,
      "name": "Warga Kultivator Rawasari",
      "email": "warga.rawasari@terastani.id",
      "role": "user"
    }
  }
}
```

---

### 4. Diagnostik Kesehatan Layanan & Koneksi Basis Data
- **Method & Path**: `GET /api/v1/health` *(atau rute pintas `GET /health`)*
- **Akses**: Publik
- **Response Sukses (HTTP 200 OK saat terhubung, HTTP 503 jika basis data terputus)**:
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Sistem TerasTani Berjalan Normal",
  "data": {
    "status": "HEALTHY",
    "uptime": 2341.12,
    "timestamp": "2026-10-20T11:04:12.000Z",
    "services": {
      "database": "UP",
      "api": "UP"
    },
    "environment": "development",
    "version": "1.0.0"
  }
}
```

---

## 🛡️ Keamanan, Otentikasi, & RBAC

1. **Enkripsi Kata Sandi**:
   Menggunakan algoritma `bcryptjs` dengan **10 siklus salt** (*salt rounds*). Kata sandi mentah tidak pernah disimpan di database atau dipancarkan ke log sistem.
2. **Penandatanganan JWT (JSON Web Token)**:
   Mengenkapsulasi klaim identitas penting (`id`, `name`, `email`, `role`) dengan masa kedaluwarsa otomatis yang dapat dikonfigurasi.
3. **Role-Based Access Control (RBAC)**:
   Melalui middleware [`authorizeRoles`](file:///Users/adyvka/Documents/Competition%20Porjects/TerasTani/tera-backend/src/middlewares/auth.middleware.js#L34-L44), rute sensitif dapat dibatasi hanya untuk peran tertentu:
   - `user`: Mengakses telemetri pekarangan, lumbung komunal, dan dompet kultivator.
   - `distributor`: Mengakses kuota pesanan off-taker, jadwal logistik armada truk, dan escrow kontrak komersial.
4. **Pencegahan SQL Injection**:
   Seluruh query SQL pada [`user.repository.js`](file:///Users/adyvka/Documents/Competition%20Porjects/TerasTani/tera-backend/src/repositories/user.repository.js) menggunakan sintaks *parameterized queries* bawaan driver `pg` (`$1, $2, ...`).

---

## 🚨 Pipeline Validasi & Standarisasi Error

### Skema Respons Galat Standar
Jika terjadi kesalahan validasi atau otentikasi, server mengembalikan struktur respons yang seragam:

```json
{
  "success": false,
  "statusCode": 400,
  "errorCode": "VALIDATION_ERROR",
  "message": "Format data yang dikirimkan tidak valid.",
  "errors": [
    {
      "field": "email",
      "message": "Format alamat email tidak valid."
    },
    {
      "field": "password",
      "message": "Kata sandi minimal harus terdiri dari 6 karakter."
    }
  ],
  "timestamp": "2026-10-20T11:05:00.000Z"
}
```

### Tabel Kode Error Sistem (`ERROR_CODES`)
| Kode Error | Status HTTP | Deskripsi |
| :--- | :--- | :--- |
| `VALIDATION_ERROR` | `400 Bad Request` | Isian form tidak memenuhi kriteria panjang/format |
| `AUTH_INVALID_CREDENTIALS`| `400 Bad Request` | Surel atau kata sandi tidak cocok |
| `AUTH_UNAUTHORIZED` | `401 Unauthorized` | Token Bearer tidak disertakan atau telah kadaluarsa |
| `AUTH_EMAIL_EXISTS` | `409 Conflict` | Alamat surel sudah digunakan oleh pengguna lain |
| `NOT_FOUND` | `404 Not Found` | Rute URL atau sumber daya tidak ditemukan |
| `INTERNAL_ERROR` | `500 Server Error` | Eksepsi yang tidak tertangani pada server internal |

---

## 🗄️ Skema Basis Data & Akun Evaluasi Juri

### Skema Tabel PostgreSQL (`users`)
```sql
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Akun Uji Coba Terverifikasi
Basis data Supabase telah diisi menggunakan seeder otomatis (`pnpm seed`) dengan 3 akun evaluator:

| No | Tipe Akun / Persona | Alamat Surel | Kata Sandi | Peran Sistem |
| :-: | :--- | :--- | :--- | :-: |
| 1 | **Administrator Sistem** | `admin@gmail.com` | `12345678` | `user` |
| 2 | **Warga Kultivator (Rawasari)** | `warga.rawasari@terastani.id` | `rahasia123` | `user` |
| 3 | **Mitra Distributor (Segar Logistik)** | `distributor@segarlogistik.co.id` | `rahasia123` | `distributor` |

---

## 🛑 Graceful Shutdown & Keandalan Proses

Backend TerasTani dilengkapi mekanisme *Graceful Shutdown* pada [server.js](file:///Users/adyvka/Documents/Competition%20Porjects/TerasTani/tera-backend/src/server.js#L26-L49) untuk memastikan tidak ada transaksi yang terputus di tengah jalan saat server di-restart atau dihentikan:
- Mendengarkan sinyal operasi `SIGTERM` dan `SIGINT`.
- Menghentikan penerimaan koneksi HTTP baru secara tertib.
- Menutup seluruh koneksi aktif dalam pool PostgreSQL (`pool.end()`).
- Dilengkapi pengaman batas waktu paksa (*force exit fallback*) 10 detik apabila koneksi pihak ketiga mengalami *deadlock*.

---

## 📜 Daftar Skrip Eksekusi

Jalankan perintah berikut dari direktori `tera-backend/`:

| Skrip | Perintah | Deskripsi |
| :--- | :--- | :--- |
| **Development** | `pnpm dev` | Menjalankan server lokal dengan pemantauan otomatis nodemon |
| **Production** | `pnpm start` | Menjalankan server dalam lingkungan produksi tanpa overhead pemantau |
| **Database Seeder** | `pnpm seed` | Memverifikasi koneksi database dan mengisi 3 akun uji coba juri |

---

<p align="center">
  <b>TerasTani Backend Engine &copy; 2026. Arsitektur Bersih Skala Perusahaan.</b>
</p>
