// Mengimpor pustaka axios, sebuah library HTTP client berbasis Promise yang digunakan untuk melakukan permintaan HTTP (GET, POST, PUT, DELETE, dll)
import axios from "axios";

// Membuat instance axios dengan konfigurasi dasar tertentu.
// Ini berguna untuk menyederhanakan pemanggilan API tanpa harus menuliskan baseURL berulang kali.
const api = axios.create({
  baseURL: "http://localhost:5218/api", // baseURL mengarah ke endpoint utama dari backend API. Tanpa /Policies agar lebih fleksibel untuk digunakan ke berbagai endpoint lain seperti /Policies, /Users, dll.
});

// Mengekspor instance 'api' agar dapat digunakan di file JavaScript lain, seperti saat melakukan request API di komponen React.
export default api;
