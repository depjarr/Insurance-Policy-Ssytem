// reportWebVitals.js

// Fungsi ini akan dipanggil jika kamu ingin mengukur performa aplikasi React.
// Misalnya: waktu load awal, respons input pengguna, dsb.
// `onPerfEntry` adalah callback yang menerima hasil metrik performa.
const reportWebVitals = onPerfEntry => {
  // Cek apakah parameter yang diberikan adalah fungsi valid
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Import modul 'web-vitals' secara dinamis (lazy-load)
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Panggil semua fungsi pengukur performa dan kirim hasilnya ke callback
      getCLS(onPerfEntry);   // CLS = Cumulative Layout Shift (stabilitas layout)
      getFID(onPerfEntry);   // FID = First Input Delay (respon pertama user)
      getFCP(onPerfEntry);   // FCP = First Contentful Paint (konten pertama muncul)
      getLCP(onPerfEntry);   // LCP = Largest Contentful Paint (konten utama muncul)
      getTTFB(onPerfEntry);  // TTFB = Time To First Byte (respons awal dari server)
    });
  }
};

// Mengekspor fungsi reportWebVitals agar bisa digunakan di file lain
export default reportWebVitals;
