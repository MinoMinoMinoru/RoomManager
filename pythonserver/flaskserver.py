from flask import *
import requests
import json

import RPi.GPIO as GPIO
import dht11
import time
import datetime
from BMP180 import BMP180
bmp = BMP180()

# initialize GPIO
GPIO.setwarnings(True)
GPIO.setmode(GPIO.BCM)

instance = dht11.DHT11(pin=17)

app = Flask(__name__)
@app.route("/", methods=['GET'])
def get():
    time.sleep(3)
    result = vars(instance.read())
    pressure = bmp.read_pressure()
    result['pressure'] = pressure/ 100.0
    print(result)
    print(type(result))
    result = json.dumps(result)
    print("-------")
    print(result)
    print(type(result))
    result = jsonify(result)

    print(type(result))
    # print(result.temperature)
    return result

@app.route("/", methods=['POST'])
def post():
    hoge = requests.Response.json
    print(hoge)
    return "hoge"


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
