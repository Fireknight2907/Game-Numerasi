import { Soal } from './Soal';

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export class SoalBangunDatar extends Soal {
    constructor(idPermainan) {
        super(idPermainan);
        this.jenisBangun = '';
        this.ukuran1 = 0;
        this.ukuran2 = 0;
    }

    buatAcak(aturan, topik) {
        const max = Math.min(aturan.angkaMaksimal, 30);
        const shapes = ['Persegi', 'Persegi Panjang', 'Segitiga'];
        this.jenisBangun = shapes[getRandomInt(0, shapes.length - 1)];
        const isLuas = getRandomInt(0, 1) === 0;
        
        let qStr = isLuas ? 'Luas' : 'Keliling';
        let ans = 0;
        
        if (this.jenisBangun === 'Persegi') {
          this.ukuran1 = getRandomInt(1, max);
          qStr += ` Persegi (sisi=${this.ukuran1})`;
          ans = isLuas ? this.ukuran1 * this.ukuran1 : 4 * this.ukuran1;
        } else if (this.jenisBangun === 'Persegi Panjang') {
          this.ukuran1 = getRandomInt(2, max);
          this.ukuran2 = getRandomInt(1, this.ukuran1 - 1) || 1;
          qStr += ` Persegi Panjang (panjang=${this.ukuran1}, lebar=${this.ukuran2})`;
          ans = isLuas ? this.ukuran1 * this.ukuran2 : 2 * (this.ukuran1 + this.ukuran2);
        } else {
          this.ukuran1 = getRandomInt(2, max);
          if (!isLuas) {
              qStr += ` Segitiga Sama Sisi (sisi=${this.ukuran1})`;
              ans = 3 * this.ukuran1;
          } else {
              this.ukuran2 = getRandomInt(2, 10);
              if (this.ukuran1 % 2 !== 0 && this.ukuran2 % 2 !== 0) this.ukuran2++;
              qStr += ` Segitiga (alas=${this.ukuran1}, tinggi=${this.ukuran2})`;
              ans = (this.ukuran1 * this.ukuran2) / 2;
          }
        }
        
        this.teksSoal = qStr;
        this.kunciJawaban = ans.toString();
    }
}
