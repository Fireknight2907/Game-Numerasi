import { EnumOperasi, EnumModePermainan } from '../models/Enums';

export const KONFIGURASI_KELAS = {
  1: { 
    label: 'Kelas 1', 
    materi: [EnumOperasi.PENJUMLAHAN, EnumOperasi.PENGURANGAN] 
  },
  2: { 
    label: 'Kelas 2', 
    materi: [EnumOperasi.PENJUMLAHAN, EnumOperasi.PENGURANGAN, EnumOperasi.PERKALIAN] 
  },
  3: { 
    label: 'Kelas 3', 
    materi: [EnumOperasi.PENJUMLAHAN, EnumOperasi.PENGURANGAN, EnumOperasi.PERKALIAN, EnumOperasi.PEMBAGIAN] 
  },
  4: { 
    label: 'Kelas 4', 
    materi: [EnumOperasi.PECAHAN, EnumOperasi.DESIMAL] 
  },
  5: { 
    label: 'Kelas 5', 
    materi: [EnumOperasi.CAMPURAN, EnumOperasi.POSITIF_NEGATIF, EnumOperasi.BANGUN_DATAR] 
  },
  6: { 
    label: 'Kelas 6', 
    materi: [EnumOperasi.CAMPURAN, EnumOperasi.POSITIF_NEGATIF, EnumOperasi.BANGUN_DATAR] 
  },
};

export const MODE_PERMAINAN_GAME = EnumModePermainan;
