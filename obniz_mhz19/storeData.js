const { Mh_z19 } = require('./mh_z19');
const { TempClient } = require('./callTemp');
const { AzureIoT } = require('./azureiot')

var Obniz = require("obniz");
var request = require('request')
require('dotenv').config();

// set environment variables
const obnizID = process.env.OBNIZ_ID;
const gasEndpoint = process.env.GAS_ENDPOINT;
const nofityEndpoint = process.env.APPSERVICE_ENDPOINT;
const connectionString = process.env.IOTHUB_CONNECTION

// initializing Instances
const IoTSender = new AzureIoT(connectionString);
var obniz = new Obniz(obnizID);
var mh_z19 = new Mh_z19(obniz);
var tempClient = new TempClient();

async function storeData() {
    console.log("===== Start Loging =====")
    // we need 3 minutes for MH_Z19 to get first CO2 data
    await sleep(3000)
    // await sleep(300000)
    while (true) {
        // we must to wait for MH_Z19 to get CO2 data
        await sleep(5000)

        // get sensor date form raspi
        let raspiData = await getRaspiData()
        let temp = await raspiData.temperature;
        let humid = await raspiData.humidity;
        let pressure = await raspiData.pressure;

        // get sensor data from obniz
        let lightSensor = await obniz.wired("Grove_LightSensor", { gnd: 5, vcc: 4, signal: 2 });
        let lightValue = await lightSensor.getWait();
        let co2_value = await mh_z19.read_co2_concentration();

        let body = {
            "temp": temp,
            "humid": humid,
            "co2": co2_value,
            "pressure": pressure,
            "light": lightValue
        }

        console.dir(body);
        sendData(body, gasEndpoint);

        await IoTSender.sendMessage2Hub(body);

        if (co2_value > 700) {
            sendData(body, nofityEndpoint);
        }

        await sleep(3000)
        // await sleep(300000)
        // await sleep(1800000)
    }
}

async function getRaspiData() {
    let result = await tempClient.getTemp()
    result = JSON.parse(result)
    return result
}

async function sleep(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

async function sendData(body, url) {
    var options = {
        uri: url,
        headers: {
            "Content-type": "application/json",
        },
        json: body
    };
    request.post(options, function (error, response, body) { });
}

storeData()