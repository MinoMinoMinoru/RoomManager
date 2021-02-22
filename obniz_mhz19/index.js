const restify = require('restify');

const { Mh_z19 } = require('./mh_z19');
const { TempClient } = require('./callTemp');

var mh_z19 = new Mh_z19();
var tempClient = new TempClient()



var co2_value;

// Create HTTP server
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
    var test = tempClient.getTemp()
    console.dir(test)
});

// Listen for incoming requests.
server.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write("Welcome to the start test page");

    co2_value = mh_z19.read_co2_concentration();

    console.dir(co2_value);
    res.end();
});

server.post('/test-post', (req, res) => {
    res.send({ TestBody: "Test Post Response Body" });
    res.end()
});

async function getTempHumid() {
    var result = sendGetRequest();
    return result
}