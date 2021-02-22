var request = require('request')
var headers = {
    'User-Agent': 'Node/8.10'
}
class TempClient {

    constructor() {}

    async getTemp() {
        const result = await this.sendGetRequest()
        return result
    }

    sendGetRequest() {
        var url = "http://192.168.0.26:5000";
        // console.log(url)
        return new Promise(function(resolve, reject) {
            request.get({ headers: headers, url: url, json: true }, function(err, res, body) {
                if (err) {
                    console.log('Error: ' + err.message);
                    reject("request error")
                } else {
                    // console.log(body);
                    resolve(body)
                }
            });
        });
    }
}

module.exports.TempClient = TempClient;