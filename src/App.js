// Mengimpor komponen PolicyList dari file PolicyList.js di folder yang sama
import PolicyList from "./PolicyList";

// Mengimpor file CSS untuk memberikan styling ke komponen App
import './App.css';

// Mendefinisikan komponen utama App sebagai fungsi (functional component)
function App() {
  return (
    // Menggunakan className "App" agar styling dari App.css bisa diterapkan
    <div className="App">
      {/* Merender komponen PolicyList, yang mungkin berisi daftar polis asuransi */}
      <PolicyList />
    </div>
  );
}

// Mengekspor komponen App agar bisa digunakan di index.js atau file lainnya
export default App;
