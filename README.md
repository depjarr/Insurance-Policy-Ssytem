<<<<<<< HEAD
# Sistem Manajemen Polis Asuransi Kendaraan

Halo! Saya bikin aplikasi ini buat ngelola data polis asuransi kendaraan secara praktis. Aplikasinya saya buat pakai **React** di bagian frontend dan **.NET Web API** di backend. Cocok banget buat simulasi sistem asuransi, misalnya di perusahaan kayak **Tob Insurance**.

## Cara Jalanin Aplikasi

Setelah download atau clone project ini, tinggal buka terminal di folder project, terus jalankan perintah-perintah di bawah ini:

### `npm start`

Buat ngejalanin aplikasi dalam mode pengembangan.  
Buka [http://localhost:3000](http://localhost:3000) di browser buat lihat tampilannya.

Nanti halaman bakal otomatis refresh kalau saya (atau kamu) ngedit kode.

### `npm test`

Buat ngejalanin unit test yang udah saya siapkan.  
Pakai React Testing Library, jadi gampang buat cek tampilan atau interaksi di komponen.

### `npm run build`

Buat generate versi produksi dari aplikasi.  
File-nya otomatis dioptimalkan, udah siap buat di-upload ke server hosting atau cloud.

### `npm run eject`

Kalau pengin ngubah konfigurasi bawaan dari React, bisa pakai perintah ini.  
Tapi hati-hati ya, sekali eject, nggak bisa dibalikin.

## Teknologi yang Dipakai

- **Frontend**: React.js
- **Backend**: ASP.NET Core Web API
- **Database**: MySQL
- **Library**:
  - Axios (buat konek ke API)
  - SheetJS (buat download data ke Excel)
  - React Icons (biar tombol edit & hapus pakai ikon)
  - React Testing Library (buat ngetes komponen)

## Fitur Utama

- Tambah, edit, hapus data polis
- Nomor polis digenerate otomatis dari backend
- Premi dihitung otomatis berdasarkan TSI & rate
- Cari data polis pakai keyword (nama, mobil, dll)
- Export data ke Excel (.xlsx)
- Tampilan modern & responsif

## Kenapa Saya Bikin Aplikasi Ini?

Proyek ini merupakan test koding yang diberikan oleh PT Asuransi Total Bersama.

## Kalau Mau Belajar Lebih Lanjut

Kalau kamu pengin tahu lebih banyak soal teknologi yang saya pakai, ini beberapa link yang bisa dibaca:

- [React Docs](https://reactjs.org/)
- [Create React App Docs](https://create-react-app.dev/)
- [ASP.NET Core Docs](https://learn.microsoft.com/en-us/aspnet/core/)
- [SheetJS Docs](https://sheetjs.com/)
- [React Icons](https://react-icons.github.io/react-icons/)

---
=======
🚗 Auto Insurance Policy System

Terdapat 2 bagian yaitu : 
1. Frontend: Dibuat dengan React.js
2. Backend: Dibuat dengan ASP.NET Core (.NET 7) Web API

Untuk Databasenya menggunakan SQLite dan langsung auto-generate lewat Entity Framework Core

Tujuan utamanya adalah bikin sistem manajemen polis asuransi yang simpel, tapi powerful — bisa nambah, edit, hapus, cari, dan ekspor data ke Excel.

Di dalam test ini memiliki beberapa fitur :

1. Tambah dan edit polis asuransi
2. Cari berdasarkan nama, nomor polis, atau merk mobil
3. Auto generate nomor polis
4. Auto hitung premi dari TSI dan rate
5. Ekspor data ke Excel (.xlsx)

🏗️ Struktur Proyek

- Front End

/auto-insurance-ui
│
├── src/
│   ├── api.js
│   ├── App.js
│   ├── App.css
│   ├── PolicyList.jsx
│   ├── PolicyList.css
│   └── ... (file React lainnya)
│
├── public/
│   └── index.html
│
├── build/        ← folder hasil build (setelah deploy)
│
├── package.json
└── README.md

- Back End

/AutoInsuranceAPI
│
├──
│   ├── Controllers/
│   ├── Models/
│   ├── Data/
│   ├── insurance.db
│   ├── appsettings.json
│   ├── Program.cs
│   └── README.md
│
├── /frontend
│   ├── src/
│   ├── public/
│   ├── build/
│   ├── package.json
│   └── README.md
│
└── README.md


🚀 Cara Menjalankan Proyek
1. Jalankan Backend (ASP.NET Core)

dotnet run
Akan otomatis jalan di: https://localhost:5218
Endpoint utama API: https://localhost:5218/api/policies

Swagger juga aktif untuk test API manual.

2. Jalankan Frontend (React)

npm install
npm start
Akan jalan di: http://localhost:3000
Frontend akan otomatis ambil data dari backend melalui API http://localhost:5218.
>>>>>>> 96b59c7d1cf2089d04a12aa414e3523a8a4dd310
