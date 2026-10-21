# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

1. **Warga Kultivator Perkotaan (Primary)**: Warga perumahan atau penghuni apartemen dengan lahan pekarangan atau balkon mikro (2×3 m² hingga 30 m²) yang membudidayakan sayuran hidroponik bernilai tinggi (Selada Romaine, Pakcoy, Bayam Horenso, dsb.) dan membutuhkan kepastian penyerapan panen dengan harga adil tanpa risiko gagal bayar.
2. **Pengurus Lumbung & Komunitas RW**: Koordinator klaster rukun warga yang mengelola titik timbang kumpul komunal (*Crate Lumbung RW*), mencatat telemetri sensor mikroklimat, dan memvalidasi lot panen warga.
3. **Mitra Distributor Komersial (Off-taker)**: Pelaku logistik rantai dingin (*cold-chain*), pemasok restoran, katering, supermarket, atau hotel yang membutuhkan suplai sayuran segar Grade A dalam volume kuota borongan (ratusan kilogram per minggu) dengan jaminan sertifikasi mutu konsisten.

## Product Purpose

TerasTani adalah platform agrikultur presisi dan agregasi panen perkotaan terdesentralisasi. Produk ini hadir untuk mengeliminasi inefisiensi penjualan eceran warga perkotaan dengan cara menggabungkan panen skala mikro ke dalam Lumbung RW berkuota komersial, menjamin standar mutu melalui Computer Vision bersertifikasi Grade A+, serta mengamankan perputaran kas warga melalui kontrak pembayaran *Smart Escrow*.

## Positioning

Tidak seperti marketplace e-commerce pertanian biasa (B2C) yang membebankan logistik dan pengemasan individual pada petani, atau aplikasi panduan berkebun yang pasif, TerasTani adalah **sistem agregasi panen komunal tertutup dengan sertifikasi mutu berbasis AI dan kontrak escrow otomatis**. TerasTani menghubungkan hulu pekarangan warga langsung ke hilir distributor industri tanpa perantara spekulatif.

## Operating Context

- **Lingkungan Penggunaan**: Dioperasikan oleh warga di balkon/pekarangan rumah saat memeriksa tanaman dan menimbang panen; oleh pengurus RW di balai warga/pos lumbung; serta oleh distributor di kantor logistik atau saat armada penjemputan bergerak ke klaster.
- **Perangkat**: Responsif di desktop dan peramban ponsel pintar (*mobile web*), mendukung akses kamera langsung untuk inspeksi foto daun dan pemindaian tiket QR timbang.
- **Ritual Kunci**: Panen pagi hari (06:00–08:00 WIB), pemindaian AI untuk indeks klorofil SPAD, pembuatan tiket setor QR, agregasi ke keranjang lumbung RW, dan pencairan dana escrow instan ke rekening bank/e-wallet.

## Capabilities and Constraints

- **Telemetri Mikroklimat IoT**: Pembacaan parameter radiasi cahaya ($W/m^2$), suhu udara, kelembaban, serta pH/EC larutan nutrisi per klaster RW.
- **Kalkulator Lahan AI**: Algoritma simulasi kapasitas lubang tanam (NFT/vertikal/raised bed), kebutuhan nutrisi AB Mix, estimasi tonase panen, dan proyeksi omzet bersih yang tersimpan di PostgreSQL database.
- **Computer Vision Spectral Engine**: Analisis spektral pixel canvas secara lokal dan real-time dari kamera/file untuk estimasi SPAD, rasio klorosis, dan sertifikasi 8-tier commercial grading (Grade A+ s/d Grade D).
- **Lumbung QR Dispatch**: Penerbitan kode QR scannable untuk setiap lot panen warga guna penimbangan cepat di lumbung RW.
- **Dompet Smart Escrow**: Ledger keuangan terisolasi dengan proteksi saldo pesanan distributor dan integrasi penarikan dana ke rekening perbankan (BCA, Mandiri, BRI, GoPay, OVO).
- **Gamifikasi Misi & Leaderboard**: Poin XP, peningkatan level kultivator, dan papan peringkat warga teladan se-kelurahan.

## Brand Commitments

- **Identitas Visual**: *Tactile Editorial Neo-Brutalism & Botanical Luxury*.
- **Palet Warna**: Latar kertas arsip mineral (*Paper* `#FAF9F6`, *Ivory* `#F4F0E8`), kanopi hutan dalam (*Botanical Moss* `#0B1912`, `#122B1E`), keemasan panen raya (*Harvest Ochre* `#F59E0B`, `#FBBF24`), dan tinta arsitektural (*Ink* `#171715`).
- **Prinsip Taktil**: Border tegas `border-2 border-ink`, bayangan offset solid 2D (`shadow-[3px_3px_0px_0px_#171715]`), cap stempel artesanal (*botanical seal*), dan grid cetak editorial terstruktur.
- **Anti-Pattern Banned**: Menolak elemen generik "AI slop" (seperti ikon sprout default acak tanpa makna geometris, gradasi warna ungu/neon klise, dan kartu template seragam yang tidak mencerminkan jiwa agrikultur presisi).

## Evidence on Hand

- Database riil PostgreSQL di Supabase dengan klaster RW aktif, katalog komoditas, riwayat sensor, dan seeder multi-akun tester.
- Dokumentasi teknis lengkap di `README.md`, `tera-backend/README.md`, dan `tera-frontend/README.md`.
- Aset fotografi editorial lokal beresolusi tinggi di `tera-frontend/src/assets/`.
- Algoritma agronomi matematis terkalibrasi di `tera-frontend/src/utils/plantVisionEngine.js`.

## Product Principles

1. **Craft over Cliché**: Setiap elemen antarmuka, logo, dan tipografi harus mencerminkan instrumen agrikultur presisi dan arsip botani mewah, bukan template AI generik.
2. **Kolektivitas Komunal**: Desain selalu menonjolkan kekuatan gotong royong warga kota yang terhubung ke rantai pasok industri.
3. **Ketegasan Fungsional & Taktil**: Tombol, tiket, dan metrik memiliki bobot visual fisik yang mantap dan memuaskan saat disentuh (*tactile satisfaction*).
4. **Transparansi Data Radikal**: Setiap angka hasil kalkulator, nilai SPAD klorofil, dan saldo rupiah escrow memiliki asal-usul matematis yang jelas.
