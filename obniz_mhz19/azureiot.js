let connectionString;

var Mqtt = require('azure-iot-device-mqtt').Mqtt;
var DeviceClient = require('azure-iot-device').Client
var Message = require('azure-iot-device').Message;

var client;
var message;

class AzureIoT {

  constructor(_connectionString){
    connectionString = _connectionString;
    this.setClient(connectionString);
  }

  async setClient(connectionString){
    client = await DeviceClient.fromConnectionString(connectionString, Mqtt);
  }

  async sendMessage2Hub(data) {
    message = new Message(JSON.stringify(data));

    message.properties.add('CO2Alert', (data.co2 > 700) ? 'true' : 'false');

    console.log('Sending message: ' + message.getData());

    // イベントを送信する
    client.sendEvent(message, function (err) {
      if (err) {
        console.error('send error: ' + err.toString());
      } else {
        console.log('message sent to Azure IoT Hub');
      }
    });
  }
}

module.exports.AzureIoT = AzureIoT;