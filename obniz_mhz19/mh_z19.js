// var Obniz = require("obniz");

// var obniz, uart;
// obniz = new Obniz("5015-1733");
let obniz,uart;
class Mh_z19 {
    
    constructor(_obniz) {
        obniz = _obniz;
        this.init()
    }

    async init() {
        await obniz.connectWait();
        // console.dir(obniz)
        await obniz.io10.output(true);
        await obniz.io11.output(false);
        uart = await obniz.getFreeUart();
        // console.dir(uart)
        await uart.start({ rx: 0, tx: 1, baud: 9600 });
    }

    async starUart(){
        await uart.start({ rx: 0, tx: 1, baud: 9600 });
    }

    read_co2_concentration() {
        //MH-Z19Bの読み出しコマンド
        uart.send([0xFF, 0x01, 0x86, 0x00, 0x00, 0x00, 0x00, 0x00, 0x79]);

        if (uart.isDataExists()) {
            var data = uart.readBytes();
            // console.log(data);
            if (data[0] == 255) {
                return data[2] * 255 + data[3];
            }
        }
        return 0;
    }

}

module.exports.Mh_z19 = Mh_z19;