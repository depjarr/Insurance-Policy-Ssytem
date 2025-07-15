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
