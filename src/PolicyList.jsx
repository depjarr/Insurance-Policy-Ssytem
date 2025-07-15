// Import library React dan hooks
import React, { useEffect, useState } from "react";
// Import konfigurasi API (axios instance)
import api from "./api";
// Import file CSS untuk styling komponen ini
import "./PolicyList.css";
// Import library untuk mengolah file Excel
import * as XLSX from "xlsx";
// Import ikon edit dan hapus dari react-icons
import { FaEdit, FaTrash } from "react-icons/fa";

// Komponen utama untuk daftar polis asuransi
const PolicyList = () => {
  // State untuk menyimpan daftar polis
  const [policies, setPolicies] = useState([]);
  // State untuk kata kunci pencarian
  const [searchTerm, setSearchTerm] = useState("");
  // State untuk menampilkan/menyembunyikan modal
  const [showModal, setShowModal] = useState(false);
  // State untuk menyimpan id polis yang sedang diedit (null jika tambah)
  const [editingId, setEditingId] = useState(null);
  // State untuk data form (tambah/edit)
  const [formData, setFormData] = useState({
    policyNumber: "",
    beneficiaryName: "",
    carBrand: "",
    carType: "",
    tsi: "",
    premiumRate: "",
    startDate: "",
    endDate: ""
  });

  // Fungsi untuk mengambil seluruh data polis dari server
  const fetchPolicies = async () => {
    try {
      const res = await api.get("/Policies");
      setPolicies(res.data); // Simpan data ke state
    } catch (err) {
      console.error("Error fetching policies:", err);
    }
  };

  // Fungsi untuk menangani pencarian data
  const handleSearch = async (e) => {
    e.preventDefault(); // Mencegah reload halaman
    try {
      // Jika pencarian kosong, tampilkan semua data
      if (searchTerm.trim() === "") {
        fetchPolicies();
        return;
      }
      // Panggil endpoint search di backend
      const res = await api.get(`/policies/search?keyword=${encodeURIComponent(searchTerm)}`);
      setPolicies(res.data); // Simpan hasil pencarian ke state
    } catch (err) {
      console.error("Gagal mencari data:", err);
    }
  };

  // Fungsi untuk menangani perubahan input pada form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      // Konversi ke float jika field tsi atau premiumRate, selain itu string
      [name]: name === "tsi" || name === "premiumRate" ? parseFloat(value) || "" : value
    });
  };

  // Fungsi untuk menyimpan data (tambah atau edit)
  const handleSave = async (e) => {
    e.preventDefault(); // Mencegah reload halaman
    try {
      // Hitung premi berdasarkan TSI dan rate
      const premiumAmount = formData.tsi * formData.premiumRate / 100;
      // Siapkan payload yang akan dikirim ke backend
      const payload = { ...formData, premiumAmount };

      if (editingId !== null) {
        // Jika sedang edit, gunakan PUT dan sertakan id
        payload.id = editingId;
        payload.policyNumber = formData.policyNumber;
        await api.put(`/Policies/${editingId}`, payload);
      } else {
        // Jika tambah, gunakan POST
        await api.post("/Policies", payload);
      }

      // Refresh data dan tutup modal setelah berhasil
      fetchPolicies();
      handleCloseModal();
    } catch (err) {
      console.error("Error saving policy:", err);
    }
  };

  // Fungsi untuk memunculkan modal edit dengan data yang dipilih
  const handleEdit = (policy) => {
    setFormData({
      policyNumber: policy.policyNumber,
      beneficiaryName: policy.beneficiaryName,
      carBrand: policy.carBrand,
      carType: policy.carType,
      tsi: policy.tsi,
      premiumRate: policy.premiumRate,
      startDate: policy.startDate,
      endDate: policy.endDate
    });
    setEditingId(policy.id); // Set id yang sedang diedit
    setShowModal(true);      // Tampilkan modal
  };

  // Fungsi untuk menghapus data polis
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus data ini?")) return; // Konfirmasi hapus
    try {
      await api.delete(`/Policies/${id}`);
      fetchPolicies(); // Refresh data setelah hapus
    } catch (err) {
      console.error("Error deleting policy:", err);
    }
  };

  // Fungsi untuk mengunduh data polis dalam format Excel
  const handleDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(policies); // Konversi data ke sheet
    const workbook = XLSX.utils.book_new();               // Buat workbook baru
    XLSX.utils.book_append_sheet(workbook, worksheet, "Policies"); // Tambahkan sheet
    XLSX.writeFile(workbook, "AutoInsurancePolicies.xlsx");        // Simpan file
  };

  // Fungsi untuk menutup modal dan reset form
  const handleCloseModal = () => {
    setFormData({
      policyNumber: "",
      beneficiaryName: "",
      carBrand: "",
      carType: "",
      tsi: "",
      premiumRate: "",
      startDate: "",
      endDate: ""
    });
    setEditingId(null);
    setShowModal(false);
  };

  // Ambil data polis saat komponen pertama kali ditampilkan
  useEffect(() => {
    fetchPolicies();
  }, []);

  // Tampilan komponen
  return (
    <div className="container">
      <h1>Auto Insurance Policy System</h1>
      <h2>Daftar Polis di Tob Insurance</h2>

      {/* Form pencarian */}
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Cari policy number, car brand, atau car type"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Cari</button>
      </form>

      {/* Tombol tambah polis */}
      <button className="add-policy-btn" onClick={() => { handleCloseModal(); setShowModal(true); }}>
        Tambah Polis
      </button>

      {/* Tombol download data */}
      <button className="download-btn" onClick={handleDownload}>Download Excel</button>

      {/* Tabel daftar polis */}
      <table className="policy-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Policy Number</th>
            <th>Beneficiary</th>
            <th>Car Brand</th>
            <th>Car Type</th>
            <th>TSI</th>
            <th>Rate (%)</th>
            <th>Premium</th>
            <th>Dates</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {/* Jika ada data, tampilkan baris data */}
          {policies.length > 0 ? (
            policies.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.policyNumber}</td>
                <td>{p.beneficiaryName}</td>
                <td>{p.carBrand}</td>
                <td>{p.carType}</td>
                <td>{p.tsi.toLocaleString()}</td>
                <td>{p.premiumRate}</td>
                <td>{p.premiumAmount.toLocaleString()}</td>
                <td>{p.startDate} → {p.endDate}</td>
                <td>
                  {/* Tombol edit dan hapus */}
                  <button onClick={() => handleEdit(p)}><FaEdit /></button>
                  <button onClick={() => handleDelete(p.id)}><FaTrash /></button>
                </td>
              </tr>
            ))
          ) : (
            // Jika tidak ada data, tampilkan pesan
            <tr>
              <td colSpan="10" className="no-data">Tidak ada data.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal tambah/edit polis */}
      {showModal && (
        <div className="modal-backdrop" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{editingId ? "Edit Polis" : "Tambah Polis"}</h3>
            <form className="modal-form" onSubmit={handleSave}>
              <label>Policy Number</label>
              <input name="policyNumber" value={formData.policyNumber} readOnly />

              <label>Beneficiary Name</label>
              <input name="beneficiaryName" value={formData.beneficiaryName} onChange={handleChange} required />

              <label>Car Brand</label>
              <input name="carBrand" value={formData.carBrand} onChange={handleChange} required />

              <label>Car Type</label>
              <input name="carType" value={formData.carType} onChange={handleChange} required />

              <label>TSI</label>
              <input name="tsi" type="number" value={formData.tsi} onChange={handleChange} required />

              <label>Premium Rate (%)</label>
              <input name="premiumRate" type="number" step="0.01" value={formData.premiumRate} onChange={handleChange} required />

              <label>Start Date</label>
              <input name="startDate" type="date" value={formData.startDate} onChange={handleChange} required />

              <label>End Date</label>
              <input name="endDate" type="date" value={formData.endDate} onChange={handleChange} required />

              <div className="modal-actions">
                <button type="submit">Simpan</button>
                <button type="button" onClick={handleCloseModal}>Batal</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Ekspor komponen agar bisa digunakan di file lain
export default PolicyList;
