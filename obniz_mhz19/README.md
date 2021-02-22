# Overview
This is simple sample
- obniz
- mh_z19
- GrooveLightingSensor

# how to use
## install modules

```nodejs
npm install
```

## input obniz ID in .env
 

```
GAS_ENDPOINT=
OBNIZ_ID=

```


## set the mh_z19 sensor and obniz.


|  obniz PIN |  MH_Z19  |
| ---- | ---- |
|  0  |  TxD  |
|  1  |  RxD  |
|  10  |  v+  |
|  11 |  GND(V-)  |


|  obniz PIN |  Grove Lighting Sensor  |
| ---- | ---- |
|  2  |  Sig  |
|  4  |  Vcc  |
|  5  |  Gnd  |

## run server

run the following command.

```nodejs
npm start
```