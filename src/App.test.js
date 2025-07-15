// Mengimpor fungsi render untuk merender komponen secara virtual dalam pengujian
// screen digunakan untuk mengakses elemen-elemen dalam virtual DOM hasil render
import { render, screen } from '@testing-library/react';

// Mengimpor komponen App yang akan diuji
import App from './App';

// Mendefinisikan unit test dengan deskripsi 'renders learn react link'
test('renders learn react link', () => {
  // Merender komponen App ke dalam virtual DOM
  render(<App />);
  
  // Mencari elemen yang mengandung teks 'learn react' (tidak case sensitive karena /i)
  const linkElement = screen.getByText(/learn react/i);
  
  // Mengharapkan bahwa elemen tersebut memang ada di dalam dokumen
  expect(linkElement).toBeInTheDocument();
});
