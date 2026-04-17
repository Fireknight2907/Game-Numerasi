export class Soal {
    constructor(idPermainan = '') {
        if (new.target === Soal) {
            throw new TypeError("Abstract class 'Soal' cannot be instantiated directly.");
        }
        this.idSoal = 'SOAL_' + Math.floor(Math.random() * 100000);
        this.idPermainan = idPermainan;
        this.teksSoal = '';
        this.kunciJawaban = '';
    }

    buatAcak(aturan, topik) {
        throw new Error("Method 'buatAcak()' must be implemented.");
    }

    cekJawaban(jawabanSiswa) {
        if (!jawabanSiswa) return false;
        return jawabanSiswa.trim() === String(this.kunciJawaban);
    }
}
