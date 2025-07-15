// Mengimpor library Entity Framework Core untuk mengelola database
using Microsoft.EntityFrameworkCore;

// Mengimpor model Policy yang akan digunakan sebagai representasi tabel di database
using AutoInsuranceApi.Models;

namespace AutoInsuranceApi.Data
{
    // Kelas AppDbContext berfungsi sebagai jembatan antara aplikasi dan database
    public class AppDbContext : DbContext
    {
        // Konstruktor yang menerima opsi konfigurasi dan meneruskannya ke kelas dasar (DbContext)
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

        // DbSet mewakili tabel 'Policies' dalam database
        // Dengan ini, kita bisa melakukan operasi CRUD terhadap data polis asuransi
        public DbSet<Policy> Policies => Set<Policy>();
    }
}
