// Namespace untuk mengelompokkan model-model dalam aplikasi
namespace AutoInsuranceApi.Models
{
    // Kelas Policy mewakili satu data polis asuransi mobil
    public class Policy
    {
        // Primary key (ID unik untuk setiap polis)
        public int Id { get; set; }

        // Nomor polis, akan digenerate otomatis
        public string PolicyNumber { get; set; } = "";

        // Nama pihak yang menerima manfaat asuransi
        public string BeneficiaryName { get; set; } = "";

        // Merek mobil yang diasuransikan
        public string CarBrand { get; set; } = "";

        // Tipe atau model mobil
        public string CarType { get; set; } = "";

        // Total Sum Insured (nilai pertanggungan dalam rupiah)
        public decimal TSI { get; set; }

        // Rate premi (dalam persen)
        public decimal PremiumRate { get; set; }

        // Jumlah premi yang harus dibayar (otomatis dihitung)
        public decimal PremiumAmount { get; set; }

        // Tanggal mulai berlakunya polis
        public DateOnly StartDate { get; set; }

        // Tanggal berakhirnya polis
        public DateOnly EndDate { get; set; }
    }
}
