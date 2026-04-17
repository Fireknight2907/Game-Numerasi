import { Soal } from './Soal';

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export class SoalPecahan extends Soal {
    constructor(idPermainan) {
        super(idPermainan);
        this.pembilang1 = 0;
        this.penyebut1 = 1;
        this.pembilangJawaban = 0;
        this.penyebutJawaban = 1;
    }

    buatAcak(aturan, topik) {
        const denoms = [2, 3, 4, 5, 6, 8, 10];
        let d1 = denoms[getRandomInt(0, denoms.length - 1)];
        let d2 = denoms[getRandomInt(0, denoms.length - 1)];
        if (getRandomInt(0, 1) === 0) d2 = d1;
      
        let n1 = getRandomInt(1, d1 - 1) || 1;
        let n2 = getRandomInt(1, d2 - 1) || 1;
        
        const op = getRandomInt(0, 1) === 0 ? '+' : '-';
        if (op === '-' && (n1/d1 < n2/d2)) {
          let t = n1; n1 = n2; n2 = t;
          t = d1; d1 = d2; d2 = t;
        }
      
        let top = op === '+' ? n1 * d2 + n2 * d1 : n1 * d2 - n2 * d1;
        let bot = d1 * d2;

        this.pembilang1 = n1;
        this.penyebut1 = d1;
        this.pembilangJawaban = top;
        this.penyebutJawaban = bot;
        
        this.teksSoal = `${n1}/${d1} ${op} ${n2}/${d2}`;
        this.kunciJawaban = `${top}/${bot}`;
    }

    cekJawaban(jawabanSiswa) {
        if (!jawabanSiswa) return false;
        let uNum, uDen;
        if (jawabanSiswa.includes('/')) {
            const parts = jawabanSiswa.split('/');
            uNum = parseInt(parts[0], 10);
            uDen = parseInt(parts[1], 10);
        } else {
            uNum = parseFloat(jawabanSiswa);
            if (jawabanSiswa.includes('.')) {
                return Math.abs(uNum - (this.pembilangJawaban / this.penyebutJawaban)) < 0.01;
            }
            uDen = 1;
        }
        
        if (isNaN(uNum) || isNaN(uDen) || uDen === 0) return false;
        
        return uNum * this.penyebutJawaban === this.pembilangJawaban * uDen; 
    }
}
