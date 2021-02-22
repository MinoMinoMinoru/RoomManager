import json,socket
import responder
from datetime import datetime as dt

import RPi.GPIO as GPIO
import dht11
import time

GPIO.setwarnings(True)
GPIO.setmode(GPIO.BCM)

instance = dht11.DHT11(pin=17)

api = responder.API()

myport = 8000

class server:
    def on_get(self, req, res):
        ''' GET '''
        res.text = 'Hello'
        print("GET")

        result = instance.read()
        print("===Last valid input: " + str(dt.now())+"===")
        # print(result)
        print(vars(result))			
        print("Temperature: %-3.1f C" % result.temperature)
        print("Humidity: %-3.1f %%" % result.humidity)
        
    async def on_post(self, req, resp):
        data = await req.media()
        print(data)
        
# routing
api.add_route("/", server,static=True)

if __name__ == '__main__':
    api.run(address='0.0.0.0', port=myport)