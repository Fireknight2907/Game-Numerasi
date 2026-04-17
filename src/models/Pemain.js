export class Pemain {
    constructor() {
        this.idPemain = '';
        this.buatIdPemain();
    }

    buatIdPemain() {
        this.idPemain = 'GUEST_' + Math.floor(Math.random() * 10000);
    }
}
