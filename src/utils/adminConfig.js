const KUNCI_PENYIMPANAN = 'NUMERASI_ADMIN_CONFIG';


const KONFIGURASI_BAWAAN = {
  batasAngkaKelas: {
    1: 10,
    2: 30,
    3: 50,
    4: 100,
    5: 100,
    6: 100
  },
  pengaturanWaktu: {
    TIMER: 2, // Batas waktu dalam menit
    STOPWATCH: 20, // Jumlah target soal untuk mode waktu tercepat
    RATING_CEPAT_DETIK: 120, // 2 menit (Mendapat bintang 3 / Flash)
    RATING_SEDANG_DETIK: 240 // 4 menit (Mendapat bintang 2 / Kelinci)
  }
};

export const ambilKonfigurasiAdmin = () => {
  try {
    const tersimpan = localStorage.getItem(KUNCI_PENYIMPANAN);
    if (tersimpan) {
      const hasilParse = JSON.parse(tersimpan);
      // Menggabungkan data tersimpan dengan data bawaan agar aman jika ada update
      return {
        batasAngkaKelas: { ...KONFIGURASI_BAWAAN.batasAngkaKelas, ...(hasilParse.batasAngkaKelas || {}) },
        pengaturanWaktu: { ...KONFIGURASI_BAWAAN.pengaturanWaktu, ...(hasilParse.pengaturanWaktu || {}) }
      };
    }
  } catch (e) {
    console.error("Gagal membaca konfigurasi admin", e);
  }
  return KONFIGURASI_BAWAAN;
};

export const simpanKonfigurasiAdmin = (konfigurasiBaru) => {
  try {
    localStorage.setItem(KUNCI_PENYIMPANAN, JSON.stringify(konfigurasiBaru));
  } catch (e) {
    console.error("Gagal menyimpan konfigurasi admin", e);
  }
};
