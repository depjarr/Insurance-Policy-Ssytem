// Import file DbContext agar backend bisa terhubung ke database
using AutoInsuranceApi.Data;
// Import EF Core untuk pengaturan database (di sini pakai SQLite)
using Microsoft.EntityFrameworkCore;

// Mulai konfigurasi aplikasi WebAPI
var builder = WebApplication.CreateBuilder(args);

// -------------------- SERVICE REGISTRATION --------------------

// Tambah CORS biar frontend React bisa akses backend ini (localhost:3000 ke 5218)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
        policy.WithOrigins("http://localhost:3000")   // alamat aplikasi React
              .AllowAnyHeader()
              .AllowAnyMethod());
});

// Registrasi controller agar endpoint bisa diakses via HTTP
builder.Services.AddControllers();

// Registrasi database (pakai SQLite, string koneksi di appsettings.json)
builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseSqlite(builder.Configuration.GetConnectionString("Default")));

// Swagger buat dokumentasi API otomatis (cuma muncul saat development)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Build aplikasi
var app = builder.Build();

// -------------------- MIDDLEWARE PIPELINE --------------------

// Kalau masih development, tampilkan halaman Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Redirect semua HTTP ke HTTPS (biar lebih aman)
app.UseHttpsRedirection();

// Aktifkan CORS di sini (sebelum ke controller), biar request dari frontend gak ditolak
app.UseCors("AllowReactApp");

// Aktifkan sistem authorization (meskipun belum dipakai di sini)
app.UseAuthorization();

// Daftarkan semua controller yang ada
app.MapControllers();

// -------------------- DATABASE INIT --------------------

// Saat aplikasi pertama dijalankan, pastikan database langsung dibuat
// Ini buat ngehindarin error kalau file SQLite-nya belum ada
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated(); // Buat database otomatis kalau belum ada
}

// Jalankan aplikasinya
app.Run();
