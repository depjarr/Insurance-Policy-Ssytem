// Inisialisasi builder aplikasi ASP.NET Core
var builder = WebApplication.CreateBuilder(args);

// -------------------------------------------
// Konfigurasi CORS (Cross-Origin Resource Sharing)
// -------------------------------------------
// CORS digunakan agar frontend (misal: React di localhost:3000) bisa
// mengakses API backend ini tanpa diblok oleh browser.
// Di sini, kita menambahkan *kebijakan bernama "AllowAll"*
// yang mengizinkan semua origin, method, dan header (sangat terbuka).
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin()      // Mengizinkan akses dari domain mana saja
                        .AllowAnyMethod()       // Mengizinkan semua jenis HTTP method (GET, POST, PUT, DELETE, dll)
                        .AllowAnyHeader());     // Mengizinkan semua jenis header
});

// Membuat objek aplikasi dari builder
var app = builder.Build();

// -------------------------------------------
// Middleware untuk mengaktifkan CORS
// -------------------------------------------
// Harus diletakkan sebelum middleware lain yang mengandalkan request HTTP
// Di sini kita menggunakan kebijakan "AllowAll" yang sudah dikonfigurasi di atas.
app.UseCors("AllowAll");
