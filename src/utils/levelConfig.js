export const MATERI_PELAJARAN = {
  PENJUMLAHAN: 'Penjumlahan Dasar',
  PENGURANGAN: 'Pengurangan',
  PERKALIAN: 'Perkalian',
  PEMBAGIAN: 'Pembagian',
  PECAHAN: 'Pecahan',
  DESIMAL: 'Bilangan Desimal',
  CAMPURAN: 'Operasi Campuran',
  POSITIF_NEGATIF: 'Positif & Negatif',
  BANGUN_DATAR: 'Bangun Datar (Luas & Keliling)'
};

export const KONFIGURASI_KELAS = {
  1: { 
    label: 'Kelas 1', 
    maksimal: 20, 
    materi: [MATERI_PELAJARAN.PENJUMLAHAN, MATERI_PELAJARAN.PENGURANGAN] 
  },
  2: { 
    label: 'Kelas 2', 
    maksimal: 100, 
    materi: [MATERI_PELAJARAN.PENJUMLAHAN, MATERI_PELAJARAN.PENGURANGAN, MATERI_PELAJARAN.PERKALIAN] 
  },
  3: { 
    label: 'Kelas 3', 
    maksimal: 1000, 
    materi: [MATERI_PELAJARAN.PENJUMLAHAN, MATERI_PELAJARAN.PENGURANGAN, MATERI_PELAJARAN.PERKALIAN, MATERI_PELAJARAN.PEMBAGIAN] 
  },
  4: { 
    label: 'Kelas 4', 
    maksimal: 50, 
    materi: [MATERI_PELAJARAN.PECAHAN, MATERI_PELAJARAN.DESIMAL] 
  },
  5: { 
    label: 'Kelas 5', 
    maksimal: 500, 
    materi: [MATERI_PELAJARAN.CAMPURAN, MATERI_PELAJARAN.POSITIF_NEGATIF, MATERI_PELAJARAN.BANGUN_DATAR] 
  },
  6: { 
    label: 'Kelas 6', 
    maksimal: 1000, 
    materi: [MATERI_PELAJARAN.CAMPURAN, MATERI_PELAJARAN.POSITIF_NEGATIF, MATERI_PELAJARAN.BANGUN_DATAR] 
  },
};

export const MODE_PERMAINAN_GAME = {
  BATAS_WAKTU: 'Batas Waktu (2 Menit)',
  WAKTU_TERCEPAT: 'Waktu Tercepat (20 Soal Terbaik)'
};
