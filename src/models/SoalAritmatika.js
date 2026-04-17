import { Soal } from './Soal';
import { EnumOperasi } from './Enums';

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomFloat = (min, max, dec) => parseFloat((Math.random() * (max - min) + min).toFixed(dec));

export class SoalAritmatika extends Soal {
    constructor(idPermainan) {
        super(idPermainan);
        this.angka1 = 0;
        this.angka2 = 0;
        this.operator = '+';
    }

    buatAcak(aturan, topik) {
        const klsl = aturan.kelas;

        let op = '+';
        let isCampuran = false;
        let isDesimal = false;

        switch (topik) {
            case EnumOperasi.PENJUMLAHAN: op = '+'; break;
            case EnumOperasi.PENGURANGAN: op = '-'; break;
            case EnumOperasi.PERKALIAN: op = '×'; break;
            case EnumOperasi.PEMBAGIAN: op = '÷'; break;
            case EnumOperasi.DESIMAL:
                isDesimal = true;
                op = ['+', '-'][getRandomInt(0, 1)];
                break;
            case EnumOperasi.CAMPURAN:
                isCampuran = true;
                break;
            case EnumOperasi.POSITIF_NEGATIF:
                op = ['+', '-'][getRandomInt(0, 1)];
                aturan.izinkanNegatif = true;  // force negatives
                break;
            default:
                // fallback if ARITMATIKA base is given
                const ops = ['+', '-'];
                if (klsl >= 2) ops.push('×');
                if (klsl >= 3) ops.push('÷');
                op = ops[getRandomInt(0, ops.length - 1)];
        }

        if (isCampuran) {
            const B = getRandomInt(1, 10);
            const C = getRandomInt(1, 10);
            const A = getRandomInt(1, 20);
            if (getRandomInt(0, 1) === 0) {
                this.teksSoal = `${A} + ${B} × ${C}`;
                this.kunciJawaban = (A + B * C).toString();
            } else {
                this.teksSoal = `${B} × ${C} - ${A}`;
                this.kunciJawaban = (B * C - A).toString();
            }
            return;
        }

        if (isDesimal) {
            const num1 = getRandomFloat(1, 10, 1);
            const num2 = getRandomFloat(1, 10, 1);
            let a = num1, b = num2;
            if (op === '-' && num2 > num1) { a = num2; b = num1; }
            this.teksSoal = `${a} ${op} ${b}`;
            let ans = op === '+' ? Math.round((a + b) * 10) / 10 : Math.round((a - b) * 10) / 10;
            this.kunciJawaban = ans.toString();
            return;
        }

        this.operator = op;

        if (op === '+') {
            this.angka1 = getRandomInt(aturan.angkaMinimal, aturan.angkaMaksimal);
            this.angka2 = getRandomInt(aturan.angkaMinimal, aturan.angkaMaksimal);
            this.kunciJawaban = (this.angka1 + this.angka2).toString();
        } else if (op === '-') {
            this.angka1 = getRandomInt(aturan.angkaMinimal, aturan.angkaMaksimal);
            this.angka2 = getRandomInt(aturan.angkaMinimal, aturan.angkaMaksimal);
            if (!aturan.izinkanNegatif) {
                const a = Math.max(this.angka1, this.angka2);
                const b = Math.min(this.angka1, this.angka2);
                this.angka1 = a; this.angka2 = b;
            }
            this.kunciJawaban = (this.angka1 - this.angka2).toString();
        } else if (op === '×') {
            let maxM = klsl <= 3 ? 10 : 20;
            if (klsl >= 5) maxM = 50;
            this.angka1 = getRandomInt(1, maxM);
            this.angka2 = getRandomInt(1, 10);
            this.kunciJawaban = (this.angka1 * this.angka2).toString();
        } else if (op === '÷') {
            let maxDivisor = klsl <= 3 ? 10 : 20;
            this.angka2 = getRandomInt(2, maxDivisor);
            let ans = getRandomInt(2, 10);
            this.angka1 = this.angka2 * ans;
            this.kunciJawaban = ans.toString();
        }

        if (aturan.izinkanNegatif && Math.random() > 0.5 && (op === '+' || op === '-')) {
            this.angka1 = -this.angka1;
            let ans = op === '+' ? this.angka1 + this.angka2 : this.angka1 - this.angka2;
            this.kunciJawaban = ans.toString();
        }

        const a2Str = this.angka2 < 0 ? `(${this.angka2})` : `${this.angka2}`;
        
        const canBeVisual = klsl <= 2 && (op === '+' || op === '-') && this.angka1 > 0 && this.angka2 > 0 && this.angka1 <= 5 && this.angka2 <= 5;
        const useVisual = canBeVisual && Math.random() > 0.5;

        if (useVisual) {
            this.teksSoal = `( ${'🍎'.repeat(this.angka1)} ) ${op} ( ${'🍎'.repeat(this.angka2)} )`;
        } else {
            this.teksSoal = `${this.angka1} ${op} ${a2Str}`;
        }
    }
}
