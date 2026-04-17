import { EnumOperasi, EnumModePermainan } from './Enums';
import { Level } from './Level';
import { Skor } from './Skor';
import { Pemain } from './Pemain';
import { SoalAritmatika } from './SoalAritmatika';
import { SoalPecahan } from './SoalPecahan';
import { SoalBangunDatar } from './SoalBangunDatar';

export class Permainan {
    constructor(kelasStr, modeStr, arrayTopik) {
        this.idPermainan = 'GAME_' + Math.floor(Math.random() * 100000);
        this.pemain = new Pemain();
        this.level = new Level(kelasStr);
        this.mode = modeStr; 
        this.topikTerpilih = arrayTopik; 
        
        this.idPemain = this.pemain.idPemain;
        this.idLevel = this.level.idLevel;
        
        this.skorObjek = new Skor(this.idPermainan, this.idPemain);
        this.daftarSoal = [];
        this.soalSekarang = null;
    }

    mulaiPermainan() {
        this.buatSoalBerikutnya();
    }

    buatSoalBerikutnya() {
        if (!this.topikTerpilih || this.topikTerpilih.length === 0) {
            this.topikTerpilih = [EnumOperasi.PENJUMLAHAN];
        }
        
        const idxTopik = Math.floor(Math.random() * this.topikTerpilih.length);
        const topik = this.topikTerpilih[idxTopik];
        
        let soalBaru;
        if (topik === EnumOperasi.PECAHAN) {
            soalBaru = new SoalPecahan(this.idPermainan);
        } else if (topik === EnumOperasi.BANGUN_DATAR) {
            soalBaru = new SoalBangunDatar(this.idPermainan);
        } else {
            // Aritmatika handles the rest (Penjumlahan, Desimal, dll)
            soalBaru = new SoalAritmatika(this.idPermainan);
        }

        soalBaru.buatAcak(this.level.ambilAturanKesulitan(), topik);
        this.soalSekarang = soalBaru;
        this.daftarSoal.push(soalBaru);
        return soalBaru;
    }

    catatJawaban(jawabanString) {
        if (!this.soalSekarang) return false;
        const isBenar = this.soalSekarang.cekJawaban(jawabanString);
        if (isBenar) {
            this.skorObjek.jawabanBenar += 1;
        }
        this.skorObjek.totalSoal += 1;
        return isBenar;
    }

    akhiriPermainan() {
        this.skorObjek.hitungSkor();
        return this.skorObjek;
    }
}
