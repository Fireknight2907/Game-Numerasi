import { KONFIGURASI_KELAS, MATERI_PELAJARAN } from './levelConfig';

const ambilAngkaAcakInt = (min, batasMaksimal) => Math.floor(Math.random() * (batasMaksimal - min + 1)) + min;
const ambilAngkaAcakFloat = (min, batasMaksimal, desimal = 1) => {
  const str = (Math.random() * (batasMaksimal - min) + min).toFixed(desimal);
  return parseFloat(str);
}

const genPenjumlahan = (batasMaksimal) => {
  const angka1 = ambilAngkaAcakInt(1, batasMaksimal);
  const angka2 = ambilAngkaAcakInt(1, batasMaksimal);
  return { soal: `${angka1} + ${angka2}`, jawaban: (angka1 + angka2).toString(), jenis: MATERI_PELAJARAN.PENJUMLAHAN };
};

const genPengurangan = (batasMaksimal) => {
  const angka1 = ambilAngkaAcakInt(1, batasMaksimal);
  const angka2 = ambilAngkaAcakInt(1, batasMaksimal);
  const a = Math.max(angka1, angka2);
  const b = Math.min(angka1, angka2);
  return { soal: `${a} - ${b}`, jawaban: (a - b).toString(), jenis: MATERI_PELAJARAN.PENGURANGAN };
};

const genPerkalian = (tingkatKelas) => {
  let batasMaksimal = tingkatKelas <= 3 ? 10 : 20;
  const angka1 = ambilAngkaAcakInt(1, batasMaksimal);
  const angka2 = ambilAngkaAcakInt(1, 10);
  return { soal: `${angka1} × ${angka2}`, jawaban: (angka1 * angka2).toString(), jenis: MATERI_PELAJARAN.PERKALIAN };
};

const genPembagian = (tingkatKelas) => {
  let batasPembagi = tingkatKelas <= 3 ? 10 : 20;
  const pembagi = ambilAngkaAcakInt(2, batasPembagi);
  const hasilBagi = ambilAngkaAcakInt(2, 10);
  const angkaYangDibagi = pembagi * hasilBagi;
  return { soal: `${angkaYangDibagi} ÷ ${pembagi}`, jawaban: hasilBagi.toString(), jenis: MATERI_PELAJARAN.PEMBAGIAN };
};

const genPositifNegatif = (batasMaksimal) => {
  const daftarOperator = ['+', '-'];
  const operator = daftarOperator[ambilAngkaAcakInt(0, 1)];
  let angka1 = ambilAngkaAcakInt(1, Math.min(batasMaksimal, 50)) * (ambilAngkaAcakInt(0,1) ? 1 : -1);
  let angka2 = ambilAngkaAcakInt(1, Math.min(batasMaksimal, 50)) * (ambilAngkaAcakInt(0,1) ? 1 : -1);
  const jawabanAkhir = operator === '+' ? angka1 + angka2 : angka1 - angka2;
  const strAngka2 = angka2 < 0 ? `(${angka2})` : `${angka2}`;
  return { soal: `${angka1} ${operator} ${strAngka2}`, jawaban: jawabanAkhir.toString(), jenis: MATERI_PELAJARAN.POSITIF_NEGATIF };
}

const genCampuran = () => {
  const B = ambilAngkaAcakInt(1, 10);
  const C = ambilAngkaAcakInt(1, 10);
  const A = ambilAngkaAcakInt(1, 20);
  if (ambilAngkaAcakInt(0, 1) === 0) {
    return { soal: `${A} + ${B} × ${C}`, jawaban: (A + B * C).toString(), jenis: MATERI_PELAJARAN.CAMPURAN };
  } else {
    return { soal: `${B} × ${C} - ${A}`, jawaban: (B * C - A).toString(), jenis: MATERI_PELAJARAN.CAMPURAN };
  }
}

const genDesimal = () => {
  const angka1 = ambilAngkaAcakFloat(1, 10, 1);
  const angka2 = ambilAngkaAcakFloat(1, 10, 1);
  const operator = ambilAngkaAcakInt(0, 1) === 0 ? '+' : '-';
  let a = angka1, b = angka2;
  if (operator === '-' && angka2 > angka1) { a = angka2; b = angka1; }
  const jawabanAkhir = operator === '+' ? Math.round((a + b)*10)/10 : Math.round((a - b)*10)/10;
  return { soal: `${a} ${operator} ${b}`, jawaban: jawabanAkhir.toString(), jenis: MATERI_PELAJARAN.DESIMAL };
}

const genPecahan = () => {
    const daftarPenyebut = [2, 3, 4, 5, 6, 8, 10];
    let penyebut1 = daftarPenyebut[ambilAngkaAcakInt(0, daftarPenyebut.length - 1)];
    let penyebut2 = daftarPenyebut[ambilAngkaAcakInt(0, daftarPenyebut.length - 1)];
    
    if (ambilAngkaAcakInt(0, 1) === 0) penyebut2 = penyebut1;
  
    let pembilang1 = ambilAngkaAcakInt(1, penyebut1 - 1) || 1;
    let pembilang2 = ambilAngkaAcakInt(1, penyebut2 - 1) || 1;
    
    const operator = ambilAngkaAcakInt(0, 1) === 0 ? '+' : '-';
    
    if (operator === '-' && (pembilang1/penyebut1 < pembilang2/penyebut2)) {
      let temp = pembilang1; pembilang1 = pembilang2; pembilang2 = temp;
      temp = penyebut1; penyebut1 = penyebut2; penyebut2 = temp;
    }
  
    let hasilAtas = operator === '+' ? pembilang1 * penyebut2 + pembilang2 * penyebut1 : pembilang1 * penyebut2 - pembilang2 * penyebut1;
    let hasilBawah = penyebut1 * penyebut2;
    
    return { 
        soal: `${pembilang1}/${penyebut1} ${operator} ${pembilang2}/${penyebut2}`, 
        jawaban: { atas: hasilAtas, bawah: hasilBawah }, 
        jenis: MATERI_PELAJARAN.PECAHAN 
    };
};

const genBangunDatar = (batasMaksimal) => {
    const m = Math.min(batasMaksimal, 30);
    const daftarBangun = ['Persegi', 'Persegi Panjang', 'Segitiga'];
    const bangunDatar = daftarBangun[ambilAngkaAcakInt(0, daftarBangun.length - 1)];
    const apakahLuas = ambilAngkaAcakInt(0, 1) === 0;
    
    let teksSoal = apakahLuas ? 'Luas' : 'Keliling';
    let jawabanAkhir = 0;
    
    if (bangunDatar === 'Persegi') {
      const sisi = ambilAngkaAcakInt(1, m);
      teksSoal += ` Persegi (sisi=${sisi})`;
      jawabanAkhir = apakahLuas ? sisi * sisi : 4 * sisi;
    } else if (bangunDatar === 'Persegi Panjang') {
      const p = ambilAngkaAcakInt(2, m);
      const l = ambilAngkaAcakInt(1, p - 1) || 1;
      teksSoal += ` Persegi Panjang (panjang=${p}, lebar=${l})`;
      jawabanAkhir = apakahLuas ? p * l : 2 * (p + l);
    } else {
      const sisi = ambilAngkaAcakInt(2, m);
      if (!apakahLuas) {
          teksSoal += ` Segitiga Sama Sisi (sisi=${sisi})`;
          jawabanAkhir = 3 * sisi;
      } else {
          let tinggi = ambilAngkaAcakInt(2, 10);
          if (sisi % 2 !== 0 && tinggi % 2 !== 0) tinggi++;
          teksSoal += ` Segitiga (alas=${sisi}, tinggi=${tinggi})`;
          jawabanAkhir = (sisi * tinggi) / 2;
      }
    }
    return { soal: teksSoal, jawaban: jawabanAkhir.toString(), jenis: MATERI_PELAJARAN.BANGUN_DATAR };
};

export const generateQuestion = (tingkatKelas, materiAktif = []) => {
    const config = KONFIGURASI_KELAS[tingkatKelas];
    if (!config) return genPenjumlahan(20);

    const batasMaksimal = config.maksimal;
    if (materiAktif.length === 0) materiAktif = config.materi; 
    const topik = materiAktif[ambilAngkaAcakInt(0, materiAktif.length - 1)];

    switch (topik) {
        case MATERI_PELAJARAN.PENJUMLAHAN: return genPenjumlahan(batasMaksimal);
        case MATERI_PELAJARAN.PENGURANGAN: return genPengurangan(batasMaksimal);
        case MATERI_PELAJARAN.PERKALIAN: return genPerkalian(tingkatKelas);
        case MATERI_PELAJARAN.PEMBAGIAN: return genPembagian(tingkatKelas);
        case MATERI_PELAJARAN.DESIMAL: return genDesimal();
        case MATERI_PELAJARAN.PECAHAN: return genPecahan();
        case MATERI_PELAJARAN.POSITIF_NEGATIF: return genPositifNegatif(batasMaksimal);
        case MATERI_PELAJARAN.CAMPURAN: return genCampuran();
        case MATERI_PELAJARAN.BANGUN_DATAR: return genBangunDatar(batasMaksimal);
        default: return genPenjumlahan(batasMaksimal);
    }
};

export const checkAnswer = (objekSoal, inputPengguna) => {
    if (!inputPengguna) return false;
    
    if (objekSoal.jenis === MATERI_PELAJARAN.PECAHAN) {
        let inputAtas, inputBawah;
        if (inputPengguna.includes('/')) {
            const bagian = inputPengguna.split('/');
            inputAtas = parseInt(bagian[0], 10);
            inputBawah = parseInt(bagian[1], 10);
        } else {
            // Bisa jadi mereka isi num saja
            inputAtas = parseFloat(inputPengguna);
            if (inputPengguna.includes('.')) {
                // jika desimal diijinkan untuk pecahan? Prompt: "Pecahan bisa dijawab tidak simple form 4/40"
                // Desimal tidak lazim untuk Pecahan UI kids, tapi fallback
                return Math.abs(inputAtas - (objekSoal.jawaban.atas / objekSoal.jawaban.bawah)) < 0.01;
            }
            inputBawah = 1;
        }
        
        const soalAtas = objekSoal.jawaban.atas;
        const soalBawah = objekSoal.jawaban.bawah;
        
        if (isNaN(inputAtas) || isNaN(inputBawah) || inputBawah === 0) return false;
        
        return inputAtas * soalBawah === soalAtas * inputBawah; 
    }
    
    return inputPengguna.trim() === objekSoal.jawaban.toString();
};
