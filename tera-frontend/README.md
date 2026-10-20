# 🎨 TerasTani Frontend &mdash; Tactical Editorial Web Application

[![React Version](https://img.shields.io/badge/React-19.x-blue.svg)](https://react.dev/)
[![Vite Version](https://img.shields.io/badge/Vite-8.x-646CFF.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4.x-38bdf8.svg)](https://tailwindcss.com/)
[![Design System](https://img.shields.io/badge/Design%20System-Tactile%20Neo--Brutalism-DEAB42.svg)](#-design-system--estetika-visual)

> Aplikasi web antarmuka pengguna TerasTani yang dibangun dengan pendekatan estetika **Tactile Editorial Neo-Brutalism & Botanical Luxury**. Mengintegrasikan telemetri mikroklimat presisi, simulator Computer Vision AI, generator tiket QR lumbung komunal, dan dompet smart escrow.

---

## ⚡ CARA MENJALANKAN FRONTEND (`pnpm dev`)

Untuk menjalankan server pengembangan frontend:

### Opsi A: Dari Direktori Root Proyek (Direkomendasikan)
```bash
pnpm -C tera-frontend dev
```

### Opsi B: Dari Direktori `tera-frontend`
```bash
cd tera-frontend
pnpm dev
```

> [!TIP]
> Aplikasi client akan dapat diakses secara lokal di: **[http://localhost:5173](http://localhost:5173)**  
> Pastikan server backend Anda di port `5001` sudah aktif untuk melayani API otentikasi dan data.

---

## 📋 Daftar Isi
1. [Arsitektur & Pola Desain](#-arsitektur--pola-desain)
2. [Struktur Direktori Komprehensif](#-struktur-direktori-komprehensif)
3. [Manajemen State & Alur Otentikasi](#-manajemen-state--alur-otentikasi)
4. [Klien HTTP & Interceptor Jaringan](#-klien-http--interceptor-jaringan)
5. [Daftar Modul & Fitur Dasbor](#-daftar-modul--fitur-dasbor)
6. [Design System & Estetika Visual](#-design-system--estetika-visual)
7. [Skrip Pengujian & Build Produksi](#-skrip-pengujian--build-produksi)

---

## 🏛️ Arsitektur & Pola Desain

Frontend TerasTani dirancang dengan memadukan **Feature-Sliced Architecture** dan prinsip **Separation of Concerns (SoC)**:
- **Presentation Layer**: Komponen UI murni terisolasi di `components/common/` (Modal, Button, Badge).
- **Domain Layer**: Modul fitur fungsional di `features/dashboard/` dan `features/auth/`.
- **Infrastructure Layer**: Klien HTTP Axios terpusat dengan *interceptor* di `api/client.js`.
- **Application State Layer**: React Context terpadu di `context/AuthContext.jsx` untuk menyimpan sesi login, status peran, dan token Bearer.

---

## 📂 Struktur Direktori Komprehensif

```text
tera-frontend/
├── index.html                   # HTML Master Entrypoint
├── package.json                 # Manifest dependensi & skrip Vite
├── vite.config.js               # Konfigurasi bundler Vite 8 & plugin Tailwind v4
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
    │   └── auth.api.js          # API caller terisolasi: login, register, me, health
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
    │   └── validators.js        # Pengukur kekuatan kata sandi & validasi regex email
    │
    ├── components/              # Komponen Terpakai Ulang
    │   ├── common/              # Primitif UI
    │   │   └── Modal.jsx        # Modal dialog taktil (blur 2px, klik luar menutup, tombol Esc)
    │   └── layout/              # Struktur Tata Letak
    │       ├── Header.jsx       # Header editorial dengan sensor IoT & notifikasi
    │       ├── Sidebar.jsx      # Sidebar navigasi, metrik XP & tombol switch peran
    │       └── ProtectedRoute.jsx # Route guard penjaga akses /dashboard
    │
    ├── features/                # Modul Fitur Aplikasi
    │   ├── auth/                # Fitur Otentikasi
    │   │   └── AuthModals.jsx   # Modal login dan registrasi terpadu untuk landing page
    │   └── dashboard/           # Modul Tab Fitur Dasbor Utama
    │       ├── OverviewTab.jsx          # Tab 1: Ringkasan dasbor & plot pekarangan aktif
    │       ├── CalculatorTab.jsx        # Tab 2: Kalkulator estimasi lahan & keuntungan AI
    │       ├── VisionTab.jsx            # Tab 3: Simulator Computer Vision & mutu Grade A
    │       ├── LumbungTab.jsx           # Tab 4: Manajemen kuota lumbung & generator tiket QR
    │       ├── FinanceTab.jsx           # Tab 5: Dompet escrow & mutasi pencairan dana
    │       ├── GamificationTab.jsx      # Tab 6: Misi harian, perolehan XP & papan peringkat
    │       ├── DistributorQuotaTab.jsx  # Tab 7: Bursa kuota grosir sayur komersial
    │       ├── DistributorFleetTab.jsx  # Tab 8: Manifest armada pengangkut rantai dingin
    │       └── Modals/                  # Dialog Modal Fitur Dasbor
    │           ├── LogoutModal.jsx      # Konfirmasi penghentian sesi login
    │           ├── WithdrawModal.jsx    # Form penarikan saldo instan ke Bank/E-Wallet
    │           ├── ClusterModal.jsx     # Pemilih klaster lumbung RW terdekat
    │           └── QRTicketModal.jsx    # Pop-up tiket QR penyerahan panen resmi
    │
    └── pages/                   # Komponen Halaman Tunggal
        ├── Home.jsx             # Halaman Beranda Editorial Utama
        ├── Login.jsx            # Halaman Portal Otentikasi Mandiri
        ├── Register.jsx         # Halaman Pendaftaran Akun Warga & Distributor
        └── Dashboard.jsx        # Halaman Dasbor Utama (Orchestrator Komponen)
```

---

## 🔐 Manajemen State & Alur Otentikasi

### 1. `AuthContext.jsx` & `useAuth()`
Aplikasi memanfaatkan React Context untuk menyediakan state autentikasi yang reaktif:
```jsx
import { useAuth } from '../hooks/useAuth';

function MyComponent() {
  const { user, isAuthenticated, login, logout, switchRole } = useAuth();
  // ...
}
```

### 2. Mode Penilaian Juri (*Evaluator Superpower*)
Melalui fungsi `switchRole('user' | 'distributor')`, penilai dan juri dapat beralih antara tampilan **Warga Kultivator** dan **Mitra Distributor** secara instan di sidebar tanpa harus keluar dan masuk kembali.

### 3. Route Guard (`ProtectedRoute.jsx`)
Mencegah pengguna yang belum terotentikasi membuka halaman `/dashboard`. Jika sesi kosong atau kedaluwarsa, pengguna secara mulus dialihkan ke `/login`.

---

## 🌐 Klien HTTP & Interceptor Jaringan

Komunikasi jaringan ditangani oleh `src/api/client.js`:
- **Request Interceptor**: Mengambil token JWT dari `localStorage` dan menyuntikkannya sebagai `Authorization: Bearer <token>` pada setiap permintaan keluar.
- **Response Interceptor**:
  - Menormalisasi pesan error backend menjadi string ramah pengguna.
  - Jika menerima status **401 Unauthorized**, sistem secara otomatis menghapus kredensial usang dan mengarahkan kembali ke portal login.

---

## 🌿 Design System & Estetika Visual

Frontend TerasTani menggunakan gaya visual khas yang memadukan ketegasan arsitektural dan kemewahan organik:
- **Palet Warna Taktil**:
  - *Ivory / Paper*: `--color-ivory` (`#F4F0E8`), `--color-paper` (`#FAF9F6`)
  - *Botanical Moss*: `--color-moss-950` (`#06100B`), `--color-moss-900` (`#0B1912`)
  - *Harvest Ochre*: `--color-ochre-400` (`#DEAB42`), `--color-ochre-500` (`#C9942B`)
  - *Chlorophyll Leaf*: `--color-leaf-400` (`#389B63`), `--color-leaf-500` (`#287C4D`)
- **Bayangan Solid 2D Neo-Brutalist**:
  - Kelas utility: `shadow-[4px_4px_0px_0px_#171715]`, `shadow-[6px_6px_0px_0px_#171715]`
  - Tombol interaktif: `nb-btn`, `nb-btn-ochre`, `nb-btn-moss`
- **Modal Non-Intrusif**:
  - Overlay menggunakan bayangan gelap tipis (`bg-ink/35`) dengan efek blur minimal 1-2px (`backdrop-blur-[2px]`).
  - Menutup secara intuitif jika mengklik area di luar kotak modal atau menekan tombol `Esc`.
- **Custom Scrollbar**:
  - Menggunakan kelas `.scrollbar-thin` (5px lebar) dengan aksen *harvest ochre* agar tampilan scroll panel tetap ramping dan sejajar.

---

## 🛠️ Skrip Pengujian & Build Produksi

| Perintah | Deskripsi |
| :--- | :--- |
| `pnpm dev` | Menjalankan Vite development server dengan Hot Module Replacement (HMR) |
| `pnpm build` | Mengompilasi dan mengoptimalkan aset untuk rilis produksi ke folder `dist/` |
| `pnpm lint` | Menjalankan ESLint untuk memeriksa kualitas kode dan kepatuhan sintaksis |
| `pnpm preview` | Menjalankan server lokal untuk menguji hasil build produksi `dist/` |

> [!NOTE]
> Hasil kompilasi `pnpm build` telah diverifikasi bebas error dengan waktu transformasi modul **~300ms**.
