🛡️ Backend Auto Insurance API

Halo! Ini adalah backend API sederhana yang saya buat untuk mengelola data polis asuransi mobil. 

Proyek ini dibangun menggunakan ASP.NET Core (.NET 7) dan Entity Framework Core dengan SQLite sebagai database-nya. 

Fungsinya kurang lebih seperti sistem manajemen polis, di mana saya bisa menambah, mengedit, menghapus, mencari, dan menghitung premi otomatis berdasarkan TSI (Total Sum Insured) dan rate premi yang diinput.

API ini sudah saya siapkan supaya bisa langsung connect ke frontend React (yang biasanya jalan di http://localhost:3000), jadi saya tambahkan konfigurasi CORS agar keduanya bisa saling ngobrol tanpa error. 

Semua endpoint yang saya buat bisa diakses lewat Swagger, jadi gampang banget buat ngetes API-nya. Misalnya ada endpoint untuk mengambil semua data (GET /api/policies), cari polis berdasarkan keyword (GET /api/policies/search), lihat jumlah total data (GET /api/policies/count), sampai bikin, edit, dan hapus polis asuransi.

Untuk menjalankannya, cukup pastikan .NET SDK sudah terinstal, lalu tinggal jalankan dotnet run di folder proyek ini. Nanti database SQLite-nya akan otomatis dibuat dan bisa langsung dipakai.

Saya juga aktifkan fitur Swagger supaya dokumentasi API-nya bisa dibuka di browser, jadi nggak perlu ngetes manual pakai Postman atau semacamnya.

Struktur foldernya cukup simpel—ada folder Models buat class Policy, Data untuk AppDbContext, dan Controllers tempat semua logic API saya taruh. Policy number akan tergenerate otomatis saat data baru dibuat, dengan format tanggal + urutan harian, misalnya 250713-001, 250713-002, dan seterusnya.