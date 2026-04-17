export const TOPICS = {
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

export const CLASS_CONFIG = {
  1: { 
    label: 'Kelas 1', 
    max: 20, 
    topics: [TOPICS.PENJUMLAHAN, TOPICS.PENGURANGAN] 
  },
  2: { 
    label: 'Kelas 2', 
    max: 100, 
    topics: [TOPICS.PENJUMLAHAN, TOPICS.PENGURANGAN, TOPICS.PERKALIAN] 
  },
  3: { 
    label: 'Kelas 3', 
    max: 1000, 
    topics: [TOPICS.PENJUMLAHAN, TOPICS.PENGURANGAN, TOPICS.PERKALIAN, TOPICS.PEMBAGIAN] 
  },
  4: { 
    label: 'Kelas 4', 
    max: 50, 
    topics: [TOPICS.PECAHAN, TOPICS.DESIMAL] 
  },
  5: { 
    label: 'Kelas 5', 
    max: 500, 
    topics: [TOPICS.CAMPURAN, TOPICS.POSITIF_NEGATIF, TOPICS.BANGUN_DATAR] 
  },
  6: { 
    label: 'Kelas 6', 
    max: 1000, 
    topics: [TOPICS.CAMPURAN, TOPICS.POSITIF_NEGATIF, TOPICS.BANGUN_DATAR] 
  },
};

export const GAME_MODES = {
  TIME_ATTACK: 'Time Attack (2 Menit)',
  STOPWATCH: 'Stopwatch (20 Soal Terbaik)'
};
