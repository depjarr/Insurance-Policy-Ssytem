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
