// Mengimpor React agar bisa menggunakan JSX dan fitur React lainnya
import React from 'react';

// Mengimpor ReactDOM (khusus untuk DOM browser) dan API createRoot (versi React 18 ke atas)
import ReactDOM from 'react-dom/client';

// Mengimpor file CSS global yang berisi styling dasar untuk body dan font
import './index.css';

// Mengimpor komponen utama aplikasi
import App from './App';

// Mengimpor fungsi untuk mengukur performa aplikasi (opsional, bisa digunakan untuk logging atau analytics)
import reportWebVitals from './reportWebVitals';

// Mengambil elemen HTML dengan id="root" sebagai tempat untuk merender aplikasi React
const root = ReactDOM.createRoot(document.getElementById('root'));

// Merender komponen App ke dalam root DOM
root.render(
  // React.StrictMode membantu menemukan masalah potensial di aplikasi selama pengembangan (tidak berpengaruh di production)
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Memanggil fungsi untuk melaporkan data performa web vital (seperti LCP, FID, CLS) jika diperlukan
// Bisa diganti dengan reportWebVitals(console.log) atau dikirim ke analytics endpoint
reportWebVitals();
