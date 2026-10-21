# 🎨 TerasTani Frontend &mdash; Tactical Editorial Web Application

[![React Version](https://img.shields.io/badge/React-19.x-blue.svg)](https://react.dev/)
[![Vite Version](https://img.shields.io/badge/Vite-8.x-646CFF.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4.x-38bdf8.svg)](https://tailwindcss.com/)
[![Design System](https://img.shields.io/badge/Design%20System-Tactile%20Neo--Brutalism-DEAB42.svg)](#-design-system--estetika-visual)
[![License](https://img.shields.io/badge/License-ISC-green.svg)](#-lisensi)

> Aplikasi web antarmuka pengguna TerasTani yang dibangun dengan pendekatan estetika **Tactile Editorial Neo-Brutalism & Botanical Luxury**. Mengintegrasikan telemetri mikroklimat presisi, simulator Computer Vision AI spektrometri daun, generator tiket QR lumbung komunal terdesentralisasi, dan sistem penyelesaian finansial dompet smart escrow.

---

## ⚡ CARA CEPAT MENJALANKAN FRONTEND (`pnpm dev`)

Untuk menjalankan server pengembangan frontend:

### Opsi A: Dari Direktori Root Monorepo (Direkomendasikan)

```bash
# Menjalankan frontend saja
pnpm -C tera-frontend dev

# Atau menjalankan frontend + backend sekaligus
pnpm dev
```

### Opsi B: Dari Direktori `tera-frontend/`

```bash
cd tera-frontend
pnpm dev
```

> [!TIP]
> Aplikasi client akan dapat diakses secara lokal di: **[http://localhost:5173](http://localhost:5173)**  
> Pastikan server backend Anda di port `5001` sudah aktif untuk melayani otentikasi sesi dan sinkronisasi basis data.

---

## 🔧 KONFIGURASI LINGKUNGAN (`.env`)

Frontend TerasTani menggunakan variabel lingkungan berbasis Vite (`import.meta.env`) yang didefinisikan di dalam berkas `.env` pada root direktori `tera-frontend/`.

### 1. Salin Berkas Template

```bash
cp .env.example .env
```

### 2. Isi Berkas `tera-frontend/.env`:

```ini

VITE_API_URL=http://localhost:5001
VITE_APP_NAME=TerasTani

```

### 3. Tabel Rincian Variabel Lingkungan Frontend:

| Variabel        | Tipe Data | Wajib  | Nilai Default           | Penjelasan Fungsional                                                                                                         |
| :-------------- | :-------: | :----: | :---------------------- | :---------------------------------------------------------------------------------------------------------------------------- |
| `VITE_API_URL`  | `String`  | **Ya** | `http://localhost:5001` | Alamat host REST API backend. Digunakan oleh klien Axios singleton (`api/client.js`) untuk seluruh pemanggilan endpoint data. |
| `VITE_APP_NAME` | `String`  | Tidak  | `TerasTani`             | Identitas judul aplikasi yang diakses melalui modul konfigurasi terpusat (`config/env.js`).                                   |

> [!NOTE]
> **Cara Vite Memproses Variabel Lingkungan:**  
> Seluruh variabel yang diawali dengan prefiks `VITE_` akan diekspos secara aman ke bundle kode klien melalui objek `import.meta.env`. Variabel ini dibaca dan divalidasi secara terpusat pada [`src/config/env.js`](./src/config/env.js).

---

## 📋 Daftar Isi

1. [Arsitektur & Pola Desain](#-arsitektur--pola-desain)
2. [Struktur Direktori Komprehensif](#-struktur-direktori-komprehensif)
3. [Mode Penilaian Juri (Role Switcher Superpower)](#-mode-penilaian-juri-role-switcher-superpower)
4. [Manajemen State & Alur Otentikasi](#-manajemen-state--alur-otentikasi)
5. [Klien HTTP & Interceptor Jaringan](#-klien-http--interceptor-jaringan)
6. [Daftar 8 Modul Fitur Dasbor](#-daftar-8-modul-fitur-dasbor)
7. [Design System & Estetika Visual](#-design-system--estetika-visual)
8. [Skrip Pengujian & Build Produksi](#-skrip-pengujian--build-produksi)

---

## 🏛️ Arsitektur & Pola Desain

Frontend TerasTani dirancang dengan memadukan **Feature-Sliced Architecture** dan prinsip **Separation of Concerns (SoC)**:

- **Presentation Layer**: Komponen UI murni terisolasi di `components/common/` (Modal, Button, Badge, QRCodeImage).
- **Domain Layer**: Modul fitur fungsional di `features/dashboard/` dan `features/auth/`.
- **Infrastructure Layer**: Klien HTTP Axios terpusat dengan _interceptor_ di `api/client.js`.
- **Application State Layer**: React Context terpadu di `context/AuthContext.jsx` untuk menyimpan sesi login, status peran, dan token Bearer.
- **Parallel Data Fetching**: Menggunakan `Promise.allSettled` pada saat pemuatan awal untuk memastikan dasbor terisi secara cepat tanpa menghalangi satu sama lain (_non-blocking_).

---

## 📂 Struktur Direktori Komprehensif

```text
tera-frontend/
├── index.html                   # HTML Master Entrypoint
├── package.json                 # Manifest dependensi & skrip Vite
├── vite.config.js               # Konfigurasi bundler Vite 8 & plugin Tailwind v4
├── .env                         # Konfigurasi variabel lingkungan lokal (diabaikan git)
├── .env.example                 # Template variabel lingkungan (VITE_API_URL)
├── README.md                    # Dokumentasi teknis aplikasi frontend
├── public/                      # Aset statis favicon dan ikon SVG
└── src/
    ├── main.jsx                 # Titik render utama React DOM
    ├── App.jsx                  # Root router, global provider & lazy suspense
    ├── App.css                  # Penyesuaian stylesheet global
    ├── index.css                # Directives Tailwind v4, custom scrollbar & utility classes
    │
    ├── api/                     # HTTP Client & Layanan API
    │   ├── client.js            # Axios singleton (injeksi token Bearer & penanganan 401)
    │   ├── auth.api.js          # API caller terisolasi: login, register, me, health
    │   └── dashboard.api.js     # API caller modul dasbor: kuota, panen, dompet, misi
    │
    ├── config/                  # Konfigurasi Lingkungan
    │   └── env.js               # Resolusi VITE_API_URL dan variabel runtime
    │
    ├── constants/               # Konstanta Aplikasi Terpusat
    │   ├── app.constants.js     # Klaster RW, komoditas panen, weather matrix, peran
    │   └── storage.keys.js      # Kunci aman penyimpanan localStorage
    │
    ├── context/                 # State Global React
    │   └── AuthContext.jsx      # Provider otentikasi, session store & role switcher
    │
    ├── hooks/                   # Custom Hooks
    │   ├── useAuth.js           # Hook untuk mengakses data sesi pengguna & aksi login/logout
    │   └── useLocalStorage.js   # Hook reaktif penyimpanan peramban
    │
    ├── utils/                   # Pustaka Utilitas Pembantu
    │   ├── formatters.js        # Format mata uang Rupiah (formatIDR), bobot (kg), tanggal
    │   ├── plantVisionEngine.js # Mesin spektrometri piksel kanvas Computer Vision
    │   └── validators.js        # Pengukur kekuatan kata sandi & validasi regex email
    │
    ├── components/              # Komponen Terpakai Ulang
    │   ├── common/              # Primitif UI
    │   │   ├── Modal.jsx        # Modal dialog taktil (blur 2px, klik luar menutup, tombol Esc)
    │   │   ├── QRCodeImage.jsx  # Generator gambar QR Code asli berbasis library qrcode
    │   │   └── CustomAlertModal.jsx # Pengganti popup alert peramban native
    │   └── layout/              # Struktur Tata Letak
    │       ├── Header.jsx       # Header editorial dengan sensor IoT & sync pill
    │       ├── Sidebar.jsx      # Sidebar navigasi, metrik XP & tombol switch peran
    │       └── ProtectedRoute.jsx # Route guard penjaga akses /dashboard
    │
    ├── features/                # Modul Fitur Aplikasi
    │   ├── auth/                # Fitur Otentikasi
    │   │   └── AuthModals.jsx   # Modal login dan registrasi terpadu untuk landing page
    │   └── dashboard/           # Modul Tab Fitur Dasbor Utama
    │       ├── OverviewTab.jsx          # Tab 1: Ringkasan dasbor & plot pekarangan aktif
    │       ├── CalculatorTab.jsx        # Tab 2: Kalkulator estimasi lahan & keuntungan AI
    │       ├── VisionTab.jsx            # Tab 3: Inspeksi mutu Computer Vision & spektrometri
    │       ├── LumbungTab.jsx           # Tab 4: Manajemen kuota lumbung & tiket setor QR
    │       ├── FinanceTab.jsx           # Tab 5: Dompet escrow & mutasi pencairan dana
    │       ├── GamificationTab.jsx      # Tab 6: Misi harian, perolehan XP & papan peringkat
    │       ├── DistributorQuotaTab.jsx  # Tab 7: Bursa kuota grosir sayur komersial
    │       ├── DistributorFleetTab.jsx  # Tab 8: Manifest armada pengangkut rantai dingin
    │       └── Modals/                  # Dialog Modal Fitur Dasbor
    │           ├── LogoutModal.jsx      # Konfirmasi penghentian sesi login
    │           ├── WithdrawModal.jsx    # Form penarikan saldo instan ke Bank/E-Wallet
    │           ├── ClusterModal.jsx     # Pemilih klaster lumbung RW terdekat
    │           ├── QRTicketModal.jsx    # Pop-up tiket QR penyerahan panen layar penuh
    │           └── ConfirmModal.jsx     # Modal konfirmasi aksi hapus data
    │
    └── pages/                   # Komponen Halaman Tunggal
        ├── Home.jsx             # Halaman Beranda Editorial Utama
        ├── Login.jsx            # Halaman Portal Otentikasi Mandiri
        ├── Register.jsx         # Halaman Pendaftaran Akun Warga & Distributor
        └── Dashboard.jsx        # Halaman Dasbor Utama (Orchestrator Komponen)
```

---

## ⚡ Mode Penilaian Juri (Role Switcher Superpower)

Untuk memfasilitasi pengujian menyeluruh oleh dewan juri tanpa hambatan friksi:

- **Pengalih Peran Instan di Sidebar**: Tombol _"Ganti Tampilan Peran"_ di bagian bawah navigasi sidebar memungkinkan juri berpindah antara:
  1. **Tampilan Kultivator (Warga RW):** Menampilkan menu budidaya, kalkulator lahan AI, kamera inspeksi mutu, tiket setor lumbung, dan dompet pencairan.
  2. **Tampilan Distributor (Mitra Off-Taker):** Menampilkan menu bursa kuota grosir sayur komersial dan manifest armada cold chain.
- Perpindahan peran terjadi secara reaktif melalui `AuthContext` tanpa perlu membersihkan sesi atau melakukan login ulang.

---

## 🔐 Manajemen State & Alur Otentikasi

### 1. `AuthContext.jsx` & `useAuth()`

Aplikasi memanfaatkan React Context untuk menyediakan state autentikasi yang reaktif:

```jsx
import { useAuth } from "../hooks/useAuth";

function MyComponent() {
  const { user, isAuthenticated, login, logout, switchRole } = useAuth();
  // ...
}
```

### 2. Route Guard (`ProtectedRoute.jsx`)

Mencegah pengguna yang belum terotentikasi membuka halaman `/dashboard`. Jika sesi kosong atau kedaluwarsa, pengguna secara mulus dialihkan ke `/login`.

---

## 🌐 Klien HTTP & Interceptor Jaringan

Komunikasi jaringan ditangani oleh `src/api/client.js`:

- **Request Interceptor**: Mengambil token JWT dari `localStorage` dan menyuntikkannya sebagai header `Authorization: Bearer <token>` pada setiap permintaan keluar.
- **Response Interceptor**:
  - Menormalisasi pesan error backend menjadi string ramah pengguna.
  - Jika menerima status **401 Unauthorized**, sistem secara otomatis membersihkan kredensial usang dan mengarahkan kembali ke portal login.

---

## 📊 Daftar 8 Modul Fitur Dasbor

|  Tab  | Nama Modul                                               | Fungsi Utama & Keterhubungan Data                                                                                                                                                       |
| :---: | :------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1** | **Ringkasan Dasbor (`OverviewTab.jsx`)**                 | Memantau telemetri mikroklimat hidup klaster RW, metrik aset escrow, dan kartu pemantauan unit budidaya rumah tangga (Plot A, B, C) dengan tombol pencatatan nutrisi harian.            |
| **2** | **Kalkulator Lahan AI (`CalculatorTab.jsx`)**            | Simulasi presisi lubang tanam, biomassa panen, dan analisis laba bersih berdasarkan 4 tipe lahan sempit perkotaan. Terhubung langsung menyimpan plot ke Ringkasan Dasbor.               |
| **3** | **Inspeksi Mutu AI (`VisionTab.jsx`)**                   | Spektrometri piksel kanvas dari webcam/foto untuk menganalisis klorofil SPAD, klorosis, dan menentukan Grade komersial (Grade A+, A, B, dll) serta mengunci jaminan harga beli lumbung. |
| **4** | **Lumbung Komunitas & QR (`LumbungTab.jsx`)**            | Menerbitkan Tiket Setor QR digital dengan kode batch unik (`TT-RW07-XXXXXX`) untuk agregasi panen mikro ke peti pendingin RW (_Crate Lumbung_).                                         |
| **5** | **Dompet & Smart Escrow (`FinanceTab.jsx`)**             | Mengelola saldo siap ditarik, saldo tertahan di escrow distributor, dan mutasi buku besar transparan dengan fitur penarikan instan ke rekening bank/e-wallet.                           |
| **6** | **Misi & Peringkat (`GamificationTab.jsx`)**             | Ekosistem insentif partisipatif berupa misi harian/mingguan berhadiah XP, kenaikan level kultivator, dan papan peringkat se-kelurahan.                                                  |
| **7** | **Alokasi Kuota Grosir (`DistributorQuotaTab.jsx`)**     | Portal pengadaan pasokan sayur daun komersial bagi mitra distributor untuk mengunci kuota dan menyetor jaminan escrow.                                                                  |
| **8** | **Manifest Armada Logistik (`DistributorFleetTab.jsx`)** | Pelacakan jadwal dan status pergerakan armada truk berpendingin cold chain dari titik lumbung RW ke gudang induk distributor.                                                           |

---

## 🌿 Design System & Estetika Visual

Frontend TerasTani menggunakan gaya visual khas **Tactile Editorial Neo-Brutalism & Botanical Luxury**:

- **Palet Warna Taktil**:
  - _Ivory / Paper_: `--color-ivory` (`#F4F0E8`), `--color-paper` (`#FAF9F6`)
  - _Botanical Moss_: `--color-moss-950` (`#06100B`), `--color-moss-900` (`#0B1912`)
  - _Harvest Ochre_: `--color-ochre-400` (`#DEAB42`), `--color-ochre-500` (`#C9942B`)
  - _Chlorophyll Leaf_: `--color-leaf-400` (`#389B63`), `--color-leaf-500` (`#287C4D`)
- **Bayangan Solid 2D Neo-Brutalist**:
  - Kelas utility: `shadow-[4px_4px_0px_0px_#171715]`, `shadow-[6px_6px_0px_0px_#171715]`
  - Tombol interaktif: `nb-btn`, `nb-btn-ochre`, `nb-btn-moss`, `nb-btn-paper`
- **Bebas Native Alert Peramban**:
  - Seluruh konfirmasi dan pemberitahuan menggunakan komponen modal dialog kustom bertema senada, menghapuskan pesan standar browser (_localhost says..._).
- **Indikator Loading Halus (_Subtle & Noticeable_)**:
  - Menerapkan titik animasi berdenyut (`animate-ping`) dengan teks status pemuatan yang jelas pada seluruh modul untuk menghilangkan kedipan panel kosong (_flash-of-empty-content_).
- **Custom Scrollbar**:
  - Menggunakan kelas `.scrollbar-thin` (5px lebar) dengan aksen _harvest ochre_ agar tampilan scroll panel tetap ramping dan sejajar.

---

## 🛠️ Skrip Pengujian & Build Produksi

| Perintah       | Deskripsi                                                                            |
| :------------- | :----------------------------------------------------------------------------------- |
| `pnpm dev`     | Menjalankan Vite development server dengan Hot Module Replacement (HMR) di port 5173 |
| `pnpm build`   | Mengompilasi dan mengoptimalkan aset untuk rilis produksi ke folder `dist/`          |
| `pnpm lint`    | Menjalankan ESLint untuk memeriksa kualitas kode dan kepatuhan sintaksis             |
| `pnpm preview` | Menjalankan server lokal untuk menguji hasil build produksi `dist/`                  |

> [!NOTE]
> Hasil kompilasi `pnpm build` telah diverifikasi bebas error dengan waktu transformasi modul **~500ms**.

---

<p align="center">
  <b>TerasTani Frontend Client &copy; 2026. Taktil, Presisi, Berkelanjutan.</b>
</p>
