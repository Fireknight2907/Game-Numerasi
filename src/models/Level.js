import { ambilKonfigurasiAdmin } from '../utils/adminConfig';

export class Level {
    constructor(kelasStr) {
        this.idLevel = 'LVL_' + kelasStr;
        this.kelas = parseInt(kelasStr, 10) || 1;
        this.angkaMinimal = 1;
        
        const config = ambilKonfigurasiAdmin();
        const batasKelas = config.batasAngkaKelas[this.kelas] || 20;
        
        this.angkaMaksimal = batasKelas;
        
        switch (this.kelas) {
            case 1: 
                this.izinkanNegatif = false; 
                break;
            case 2: 
                this.izinkanNegatif = false; 
                break;
            case 3: 
                this.izinkanNegatif = true; 
                break;
            case 4: 
                this.izinkanNegatif = true; 
                break;
            case 5: 
                this.izinkanNegatif = true; 
                break;
            case 6: 
                this.izinkanNegatif = true; 
                break;
            default: 
                this.angkaMaksimal = 20; 
                this.izinkanNegatif = false;
        }
    }
    
    ambilAturanKesulitan() {
        return {
            kelas: this.kelas,
            angkaMinimal: this.angkaMinimal,
            angkaMaksimal: this.angkaMaksimal,
            izinkanNegatif: this.izinkanNegatif
        };
    }
}
