// Mengimpor namespace yang diperlukan
using AutoInsuranceApi.Data;         // Untuk akses ke DbContext (database)
using AutoInsuranceApi.Models;       // Untuk model Policy
using Microsoft.AspNetCore.Mvc;      // Untuk fitur Web API (Controller, Route, dll)
using Microsoft.EntityFrameworkCore; // Untuk query async ke database

namespace AutoInsuranceApi.Controllers;

// Menandai bahwa ini adalah API controller dan rutenya diawali dengan /api/policies
[ApiController]
[Route("api/[controller]")]
public class PoliciesController : ControllerBase
{
    private readonly AppDbContext _db; // Dependency injection untuk akses database

    // Constructor controller, menerima DbContext dari dependency injection
    public PoliciesController(AppDbContext db)
    {
        _db = db;
    }

    // Endpoint GET: /api/policies
    // Mengambil semua data polis, bisa pakai query `q` untuk filter
    [HttpGet]
    public async Task<IActionResult> GetAll(string? q)
    {
        var query = _db.Policies.AsQueryable();

        if (!string.IsNullOrWhiteSpace(q))
        {
            query = query.Where(p =>
                p.BeneficiaryName.Contains(q) ||
                p.PolicyNumber.Contains(q) ||
                p.CarBrand.Contains(q) ||
                p.CarType.Contains(q));
        }

        return Ok(await query.ToListAsync());
    }

    // Endpoint GET: /api/policies/search?keyword=
    // Fitur pencarian berdasarkan kata kunci
    [HttpGet("search")]
    public async Task<IActionResult> Search([FromQuery] string keyword)
    {
        if (string.IsNullOrWhiteSpace(keyword))
            return Ok(new List<Policy>());

        var lowerKeyword = keyword.ToLower(); // Supaya pencarian tidak case-sensitive
        var policies = await _db.Policies
            .Where(p => p.BeneficiaryName.ToLower().Contains(lowerKeyword) ||
                        p.PolicyNumber.ToLower().Contains(lowerKeyword) ||
                        p.CarBrand.ToLower().Contains(lowerKeyword) ||
                        p.CarType.ToLower().Contains(lowerKeyword))
            .ToListAsync();

        return Ok(policies);
    }

    // Endpoint GET: /api/policies/count
    // Mengembalikan jumlah total data polis
    [HttpGet("count")]
    public async Task<IActionResult> Count()
    {
        var count = await _db.Policies.CountAsync();
        return Ok(new { count });
    }           

    // Endpoint GET: /api/policies/{id}
    // Mengambil data polis berdasarkan ID
    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var data = await _db.Policies.FindAsync(id);
        return data == null ? NotFound() : Ok(data);
    }

    // Endpoint POST: /api/policies
    // Menambahkan data polis baru ke database
    [HttpPost]
    public async Task<IActionResult> Create(Policy input)
    {
        input.PolicyNumber = GeneratePolicyNumber(); // Nomor polis otomatis
        input.PremiumAmount = CalculatePremium(input.TSI, input.PremiumRate); // Hitung premi

        _db.Policies.Add(input);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(Get), new { id = input.Id }, input); // HTTP 201
    }

    // Endpoint PUT: /api/policies/{id}
    // Mengupdate data polis berdasarkan ID
    [HttpPut("{id}")]
public async Task<IActionResult> Update(int id, Policy input)
{
    if (id != input.Id) return BadRequest();

    var existing = await _db.Policies.FindAsync(id);
    if (existing == null) return NotFound();

    // Tetap gunakan policy number lama
    existing.BeneficiaryName = input.BeneficiaryName;
    existing.CarBrand = input.CarBrand;
    existing.CarType = input.CarType;
    existing.TSI = input.TSI;
    existing.PremiumRate = input.PremiumRate;
    existing.StartDate = input.StartDate;
    existing.EndDate = input.EndDate;
    existing.PremiumAmount = CalculatePremium(input.TSI, input.PremiumRate);

    await _db.SaveChangesAsync();
    return NoContent();
}


    // Endpoint DELETE: /api/policies/{id}
        // Menghapus data polis berdasarkan ID
        [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var policy = await _db.Policies.FindAsync(id);
        if (policy == null) return NotFound(); // Data tidak ditemukan

        _db.Policies.Remove(policy);
        await _db.SaveChangesAsync();

        return NoContent(); // HTTP 204
    }

    // Fungsi private: Hitung jumlah premi berdasarkan TSI dan rate
    private static decimal CalculatePremium(decimal tsi, decimal rate)
    {
        return tsi * rate / 100;
    }

    // Fungsi private: Auto generate nomor polis berdasarkan tanggal dan urutan harian
   private string GeneratePolicyNumber()
{
    var prefix = DateTime.UtcNow.ToString("yyMMdd");

    // Cari policy number terbesar yang pernah dibuat di hari ini
    var last = _db.Policies
        .Where(p => p.PolicyNumber.StartsWith(prefix))
        .OrderByDescending(p => p.PolicyNumber)
        .Select(p => p.PolicyNumber)
        .FirstOrDefault();

    int nextNumber = 1;
    if (!string.IsNullOrEmpty(last))
    {
        // Ambil angka terakhir dari policy number (misal 250713-009 → 9)
        var parts = last.Split('-');
        if (parts.Length == 2 && int.TryParse(parts[1], out int lastNum))
        {
            nextNumber = lastNum + 1;
        }
    }

    return $"{prefix}-{nextNumber:D3}";
}
}
