export class Skor {
    constructor(idPermainan, idPemain) {
        this.idSkor = 'SCORE_' + Math.floor(Math.random() * 100000);
        this.idPermainan = idPermainan;
        this.idPemain = idPemain;
        this.jawabanBenar = 0;
        this.totalSoal = 0;
        this.nilaiAkhir = 0;
    }

    hitungSkor() {
        if (this.totalSoal === 0) {
            this.nilaiAkhir = 0;
        } else {
            this.nilaiAkhir = Math.round((this.jawabanBenar / this.totalSoal) * 100);
        }
    }
}
