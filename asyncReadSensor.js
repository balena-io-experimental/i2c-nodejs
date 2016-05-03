var async = require('async'),
  i2c = require('i2c-bus'),
  i2c1;
var busNumber = process.env.I2C_BUS;
console.log('i2c bus number: ' + busNumber);

var conf = require('./registers.json');

(function () {
  async.series([
    function (cb) {
      i2c1 = i2c.open(busNumber, cb);
    },
    function (cb) {
			// Start Read for proximity data
			i2c1.writeByte(conf.ADDRESS, conf.COMMAND, conf.MEASUREPROXIMITY, cb);
    },
    function (cb) {
      // Wait while non volatile memory busy
      (function read() {
        i2c1.readByte(conf.ADDRESS, conf.COMMAND, function (err, config) {
          if (err) return cb(err);
          if (!((config - 0x80) & conf.PROXIMITYREADY)) return read();
          cb(null);
        });
      }());
    },
    function (cb) {
      // Display temperature
      i2c1.readWord(conf.ADDRESS,conf.PROXIMITYDATA, function (err, prox) {
        if (err) return cb(err);
        console.log('Proximity Value: ' + prox);
        cb(null);
      });
    },
    function (cb) {
      i2c1.close(cb);
    }
  ], function (err) {
    if (err) throw err;
  });
}());
