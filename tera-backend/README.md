# ⚙️ TerasTani Backend &mdash; Core API & Micro-Engine Service

[![Node.js Version](https://img.shields.io/badge/Node.js-%3E%3D20.0.0-brightgreen.svg)](https://nodejs.org/)
[![Express Version](https://img.shields.io/badge/Express-5.x-lightgrey.svg)](https://expressjs.com/)
[![Database](https://img.shields.io/badge/Database-PostgreSQL%20%2F%20Supabase-336791.svg)](https://supabase.com/)
[![Architecture](https://img.shields.io/badge/Architecture-Clean%20Layered-orange.svg)](#-arsitektur-sistem-clean-layered-architecture)
[![License](https://img.shields.io/badge/License-ISC-green.svg)](#-lisensi)

> Layanan API terpusat dan mesin bisnis TerasTani yang dibangun di atas **Express 5**, **PostgreSQL** (Supabase Connection Pool), dan arsitektur modular berlapis (_Clean Layered Architecture_). Menyediakan otentikasi aman JWT, RBAC multi-peran, pencatatan latensi transaksi mikrodetik, otomasi kalkulasi mikroklimat lahan, verifikasi tiket timbang QR terdesentralisasi, dan sistem penyelesaian finansial _Smart Escrow_.

---

## ⚡ CARA CEPAT MENJALANKAN BACKEND (`pnpm dev`)

Untuk menjalankan server backend pengembangan secara instan:

### Opsi A: Dari Direktori Root Monorepo (Direkomendasikan)

```bash
# Menjalankan backend saja
pnpm -C tera-backend dev

# Atau menjalankan backend + frontend sekaligus
pnpm dev
```

### Opsi B: Dari Direktori `tera-backend/`

```bash
cd tera-backend
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

## 🔧 KONFIGURASI LINGKUNGAN (`.env`)

Berkas `.env` terletak di root folder `tera-backend/`. Buat berkas baru atau salin dari template [`.env.example`](./.env.example):

```bash
cp .env.example .env
```

### Isi Lengkap Berkas `tera-backend/.env`:

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

### Tabel Rincian Variabel Lingkungan Backend:

| Variabel         | Tipe Data | Wajib  | Nilai Default   | Penjelasan Fungsional                                                                                      |
| :--------------- | :-------: | :----: | :-------------- | :--------------------------------------------------------------------------------------------------------- |
| `PORT`           | `Number`  | Tidak  | `5001`          | Port listen server Express HTTP.                                                                           |
| `NODE_ENV`       | `String`  | Tidak  | `development`   | Mode eksekusi aplikasi (`development`, `production`, `test`). Mengontrol tingkat verbositas error logging. |
| `CORS_ORIGIN`    | `String`  | Tidak  | `*`             | Konfigurasi domain asal yang diizinkan melakukan AJAX/Fetch request ke server API.                         |
| `DATABASE_URL`   | `String`  | **Ya** | _(None)_        | Connection string ke cluster PostgreSQL / Supabase Cloud lengkap dengan kredensial SSL.                    |
| `JWT_SECRET`     | `String`  | **Ya** | `terastani_...` | Kunci simetris kriptografi HMAC-SHA256 untuk memverifikasi keaslian token Bearer.                          |
| `JWT_EXPIRES_IN` | `String`  | Tidak  | `7d`            | Durasi validitas token JWT sebelum kedaluwarsa.                                                            |

---

## 📋 Daftar Isi

1. [Arsitektur Sistem (Clean Layered Architecture)](#-arsitektur-sistem-clean-layered-architecture)
2. [Struktur Direktori Komprehensif](#-struktur-direktori-komprehensif)
3. [Dokumentasi Katalog RESTful API v1](#-dokumentasi-katalog-restful-api-v1)
4. [Keamanan, Otentikasi, & RBAC](#-keamanan-otentikasi--rbac)
5. [Pipeline Validasi & Standarisasi Error](#-pipeline-validasi--standarisasi-error)
6. [Skema Basis Data & Akun Evaluasi Juri](#-skema-basis-data--akun-evaluasi-juri)
7. [Graceful Shutdown & Keandalan Proses](#-graceful-shutdown--keandalan-proses)
8. [Daftar Skrip Eksekusi](#-daftar-skrip-eksekusi)

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

    subgraph Routing ["Routing & Security Layer"]
        Logger --> Router["Master Aggregator Router (/api/v1)"]
        Router --> AuthMW["JWT Auth & RBAC Middleware"]
        AuthMW --> Validator["Fail-Fast Request Validator"]
    end

    subgraph Controllers ["Presentation / Controller Layer"]
        Validator --> Controller["Controller Handlers (Request / Response)"]
    end

    subgraph Services ["Domain & Business Logic Layer"]
        Controller --> Service["Domain Services (Business Logic)"]
    end

    subgraph Repositories ["Data Access / Repository Layer"]
        Service --> Repo["Repositories (Parameterized SQL Queries)"]
    end

    subgraph Database ["Persistence Layer"]
        Repo --> Pool["pg.Pool (PostgreSQL / Supabase)"]
    end
```

### Manfaat Penerapan Pola Ini:

1. **Separation of Concerns (SoC):** Controller hanya mengurus HTTP request/response, Service hanya mengurus aturan bisnis, dan Repository murni mengeksekusi kueri SQL.
2. **Keamanan SQL Anti-Injection:** Seluruh interaksi database dilakukan melalui kueri terparameterisasi (`$1, $2, ...`) di repositori terisolasi.
3. **Resiliensi & Testability:** Logika bisnis terisolasi dari framework Express sehingga mudah diuji (_unit test_) secara terpisah.

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
├── README.md                    # Dokumentasi komprehensif backend
└── src/
    ├── app.js                   # Konfigurasi middleware & router Express
    ├── server.js                # Server bootstrapper & graceful shutdown handler
    ├── config/                  # Konfigurasi eksternal & koneksi
    │   ├── constants.js         # Konstanta HTTP status, peran akun, & error codes
    │   ├── db.config.js         # Pool koneksi PostgreSQL (pg.Pool) & ping helper
    │   └── env.config.js        # Validasi dan agregasi variabel process.env
    ├── controllers/             # Controller penangan request HTTP
    │   ├── auth.controller.js   # Endpoint login, register, dan verifikasi profil
    │   ├── dashboard.controller.js # Endpoint agregasi data dasbor utama
    │   └── health.controller.js # Endpoint diagnostik kesehatan sistem & database
    ├── middlewares/             # Middleware filter & interceptor
    │   ├── auth.middleware.js   # Verifikasi token JWT & proteksi RBAC
    │   ├── error.middleware.js  # Penanganan error global terpusat
    │   ├── logger.middleware.js # Pencatat latensi HTTP request beresolusi tinggi
    │   └── validation.middleware.js # Validasi fail-fast skema payload request
    ├── repositories/            # Data Access Object (DAO) terisolasi
    │   ├── user.repository.js   # Kueri SQL terparameterisasi tabel users
    │   ├── harvest.repository.js# Kueri SQL tiket panen dan verifikasi lumbung
    │   ├── wallet.repository.js # Kueri mutasi escrow & penarikan saldo
    │   └── cluster.repository.js# Kueri klaster RW & log sensor IoT
    ├── routes/                  # Definisi rute RESTful berversi /api/v1
    │   ├── auth.routes.js       # Rute /api/v1/auth (login, register, me)
    │   ├── health.routes.js     # Rute /api/v1/health (diagnostik)
    │   ├── cluster.routes.js    # Rute /api/v1/clusters
    │   ├── sensor.routes.js     # Rute /api/v1/sensors
    │   ├── land-calculation.routes.js # Rute /api/v1/calculator
    │   ├── harvest.routes.js    # Rute /api/v1/harvests
    │   ├── quota.routes.js      # Rute /api/v1/quotas
    │   ├── fleet.routes.js      # Rute /api/v1/fleets
    │   ├── wallet.routes.js     # Rute /api/v1/wallet
    │   ├── gamification.routes.js # Rute /api/v1/gamification
    │   └── index.js             # Master aggregator rute v1 & rute legacy
    ├── seed/                    # Skrip pengisian data awal
    │   └── seed.js              # Idempotent database seeder (3 akun uji coba juri)
    ├── services/                # Logika bisnis inti murni
    │   ├── auth.service.js      # Hashing bcrypt, verifikasi kredensial, & JWT
    │   └── wallet.service.js    # Perhitungan saldo dan pelepasan escrow otomatis
    ├── utils/                   # Helper dan cetak biru fungsional
    │   ├── api-error.js         # Kelas galat operasional terstruktur (ApiError)
    │   ├── api-response.js      # Kelas format respons standar (ApiResponse)
    │   └── async-handler.js     # Wrapper pembungkus async/await anti-try-catch
    └── validations/             # Aturan validasi payload request
        └── auth.validation.js   # Aturan validasi registrasi & login pengguna
```

---

## 📡 Dokumentasi Katalog RESTful API v1

Seluruh endpoint backend dikelompokkan ke dalam routing versioned `/api/v1`:

### 1. Modul Otentikasi & Pengguna (`/api/v1/auth`)

- `POST /api/v1/auth/register` (Publik): Mendaftarkan akun kultivator atau distributor baru.
- `POST /api/v1/auth/login` (Publik): Memverifikasi kredensial dan mengembalikan JWT Bearer token.
- `GET /api/v1/auth/me` (Bearer): Mengambil profil akun, saldo dompet, dan poin XP pengguna aktif.

### 2. Modul Diagnostik & Pemantauan (`/api/v1/health`)

- `GET /api/v1/health` (Publik): Memeriksa status kesehatan server Express dan koneksi _live ping_ ke PostgreSQL.

### 3. Modul Klaster Lumbung RW & Sensor IoT (`/api/v1/clusters`, `/api/v1/sensors`)

- `GET /api/v1/clusters` (Publik): Mengambil daftar seluruh klaster Lumbung RW beserta kapasitas peti crate terisi.
- `GET /api/v1/clusters/:id/sensors` (Publik): Mengambil riwayat telemetri sensor lingkungan (lux, suhu, pH) klaster tertentu.

### 4. Modul Kalkulator Lahan AI Presisi (`/api/v1/calculator`)

- `GET /api/v1/calculator/my` (Bearer): Mengambil daftar unit plot budidaya yang disimpan oleh kultivator.
- `POST /api/v1/calculator/save` (Bearer): Menyimpan estimasi lubang tanam, biomassa, dan jadwal panen ke database.
- `DELETE /api/v1/calculator/:id` (Bearer): Menghapus unit plot budidaya dari pemantauan dasbor pengguna.

### 5. Modul Setor Panen & Tiket QR (`/api/v1/harvests`)

- `GET /api/v1/harvests/my` (Bearer): Mengambil riwayat pengajuan tiket panen QR milik kultivator.
- `POST /api/v1/harvests/submit` (Bearer): Menerbitkan tiket setor panen QR digital baru ke Lumbung RW.
- `PATCH /api/v1/harvests/:id/confirm` (Bearer/Admin): Konfirmasi timbangan fisik di lumbung dan pencairan dana escrow.

### 6. Modul Pengadaan Grosir Distributor (`/api/v1/quotas`, `/api/v1/fleets`)

- `GET /api/v1/quotas` (Publik): Menampilkan kuota pasokan sayur daun yang dibuka per klaster RW.
- `POST /api/v1/quotas/:id/book` (Bearer/Distributor): Memesan alokasi pasokan komersial dan menyetor jaminan escrow.
- `GET /api/v1/fleets` (Publik): Menampilkan manifest jadwal armada truk logistik berpendingin.
- `PATCH /api/v1/fleets/:id/status` (Bearer): Memperbarui status rute armada (_SCHEDULED_ $\to$ _IN_TRANSIT_ $\to$ _COMPLETED_).

### 7. Modul Dompet Finansial & Smart Escrow (`/api/v1/wallet`)

- `GET /api/v1/wallet` (Bearer): Rincian saldo dompet siap ditarik, saldo tertahan di escrow, total penarikan, dan buku besar transaksi.
- `POST /api/v1/wallet/withdraw` (Bearer): Memproses penarikan saldo ke nomor rekening bank atau dompet digital.

### 8. Modul Misi & Peringkat Komunal (`/api/v1/gamification`)

- `GET /api/v1/gamification/missions` (Bearer): Mengambil daftar misi harian & mingguan beserta status penyelesaiannya.
- `POST /api/v1/gamification/claim` (Bearer): Mengklaim hadiah poin XP dari misi yang telah diselesaikan.
- `GET /api/v1/gamification/leaderboard` (Publik): Menampilkan papan peringkat kultivator teraktif se-kelurahan.

---

## 🛡️ Keamanan, Otentikasi, & RBAC

1. **Enkripsi Kata Sandi**:
   Menggunakan algoritma `bcryptjs` dengan **10 siklus salt** (_salt rounds_). Kata sandi mentah tidak pernah disimpan di database atau dipancarkan ke log sistem.
2. **Penandatanganan JWT (JSON Web Token)**:
   Mengenkapsulasi klaim identitas penting (`id`, `name`, `email`, `role`) dengan masa kedaluwarsa otomatis yang dapat dikonfigurasi.
3. **Role-Based Access Control (RBAC)**:
   Melalui middleware [`authorizeRoles`](./src/middlewares/auth.middleware.js), rute sensitif dapat dibatasi hanya untuk peran tertentu:
   - `user`: Mengakses telemetri pekarangan, lumbung komunal, dan dompet kultivator.
   - `distributor`: Mengakses kuota pesanan off-taker, jadwal logistik armada truk, dan escrow kontrak komersial.
4. **Pencegahan SQL Injection**:
   Seluruh query SQL pada [`user.repository.js`](./src/repositories/user.repository.js) menggunakan sintaks _parameterized queries_ bawaan driver `pg` (`$1, $2, ...`).

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
  "timestamp": "2026-10-21T18:00:00.000Z"
}
```

### Tabel Kode Error Sistem (`ERROR_CODES`):

| Kode Error                 | Status HTTP        | Deskripsi                                           |
| :------------------------- | :----------------- | :-------------------------------------------------- |
| `VALIDATION_ERROR`         | `400 Bad Request`  | Isian form tidak memenuhi kriteria panjang/format   |
| `AUTH_INVALID_CREDENTIALS` | `400 Bad Request`  | Surel atau kata sandi tidak cocok                   |
| `AUTH_UNAUTHORIZED`        | `401 Unauthorized` | Token Bearer tidak disertakan atau telah kadaluarsa |
| `AUTH_EMAIL_EXISTS`        | `409 Conflict`     | Alamat surel sudah digunakan oleh pengguna lain     |
| `NOT_FOUND`                | `404 Not Found`    | Rute URL atau sumber daya tidak ditemukan           |
| `INTERNAL_ERROR`           | `500 Server Error` | Eksepsi yang tidak tertangani pada server internal  |

---

## 🗄️ Skema Basis Data & Akun Evaluasi Juri

### Skema Tabel PostgreSQL Inti (`users`):

```sql
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    xp_points INTEGER DEFAULT 0,
    wallet_balance NUMERIC(15, 2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Akun Uji Coba Terverifikasi

Basis data Supabase telah diisi menggunakan seeder otomatis (`pnpm seed`) dengan 3 akun evaluator:

| No  | Tipe Akun / Persona                    | Alamat Surel                      | Kata Sandi   | Peran Sistem  |
| :-: | :------------------------------------- | :-------------------------------- | :----------- | :-----------: |
|  1  | **Administrator Sistem**               | `admin@gmail.com`                 | `12345678`   |    `user`     |
|  2  | **Warga Kultivator (Rawasari)**        | `warga.rawasari@terastani.id`     | `rahasia123` |    `user`     |
|  3  | **Mitra Distributor (Segar Logistik)** | `distributor@segarlogistik.co.id` | `rahasia123` | `distributor` |

---

## 🛑 Graceful Shutdown & Keandalan Proses

Backend TerasTani dilengkapi mekanisme _Graceful Shutdown_ pada [`server.js`](./src/server.js) untuk memastikan tidak ada transaksi yang terputus di tengah jalan saat server di-restart atau dihentikan:

- Mendengarkan sinyal operasi `SIGTERM` dan `SIGINT`.
- Menghentikan penerimaan koneksi HTTP baru secara tertib.
- Menutup seluruh koneksi aktif dalam pool PostgreSQL (`pool.end()`).
- Dilengkapi pengaman batas waktu paksa (_force exit fallback_) 10 detik apabila koneksi pihak ketiga mengalami _deadlock_.

---

## 📜 Daftar Skrip Eksekusi

Jalankan perintah berikut dari direktori `tera-backend/`:

| Skrip               | Perintah     | Deskripsi                                                                |
| :------------------ | :----------- | :----------------------------------------------------------------------- |
| **Development**     | `pnpm dev`   | Menjalankan server lokal dengan pemantauan otomatis nodemon di port 5001 |
| **Production**      | `pnpm start` | Menjalankan server dalam lingkungan produksi tanpa overhead pemantau     |
| **Database Seeder** | `pnpm seed`  | Memverifikasi koneksi database dan mengisi 3 akun uji coba juri          |

---

<p align="center">
  <b>TerasTani Backend Engine &copy; 2026. Arsitektur Bersih Skala Perusahaan.</b>
</p>
