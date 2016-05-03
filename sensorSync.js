var i2c = require('i2c-bus'),
	busNumber = process.env.I2C_BUS,
  i2c1 = i2c.openSync(busNumber);
	console.log('i2c bus number: ' + busNumber);

var conf = require('./registers.json')

var printData = function () {

	// Check product ID of sensor
	rev = i2c1.readByteSync(conf.ADDRESS, conf.PRODUCTID)
	if(( rev & 0xF0)  !=0x10 ){
		console.log('no sensor found!!');
	}
	console.log('rev: ' + rev);

	// Set the strength of IR LED
	i2c1.writeByteSync(conf.ADDRESS, conf.IRLED, 5)// set to 5 * 10mA = 100mA

	// Start Read for proximity data
	i2c1.writeByteSync(conf.ADDRESS, conf.COMMAND, conf.MEASUREPROXIMITY)
	// Wait while non volatile memory busy
	while (!((i2c1.readByteSync(conf.ADDRESS, conf.COMMAND) - 0x80) & conf.PROXIMITYREADY)) {
	}
	prox = i2c1.readWordSync(conf.ADDRESS,conf.PROXIMITYDATA)

	// Start Read for proximity data
	i2c1.writeByteSync(conf.ADDRESS, conf.COMMAND, conf.MEASUREAMBIENT)
	// Wait while non volatile memory busy
	while (!((i2c1.readByteSync(conf.ADDRESS, conf.COMMAND) - 0x80) & conf.AMBIENTREADY)) {
	}

	light = i2c1.readWordSync(conf.ADDRESS,conf.AMBIENTDATA)

  console.log('proximity Data: ' + prox +' and light Data: ' + light);

}

setInterval(printData, 3000);
