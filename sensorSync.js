var i2c = require('i2c-bus'),
  i2c1 = i2c.openSync(1);
	console.log('i2c bus number: ' + process.env.I2C_BUS);

var conf = require('./registers.json')

var printData = function () {

	// Check product ID of sensor
	rev = i2c1.readByteSync(conf.VCNL4000_ADDRESS, conf.VCNL4000_PRODUCTID)
	if(( rev & 0xF0)  !=0x10 ){
		console.log('no sensor found!!');
	}
	console.log('rev: ' + rev);

	// Set the strength of IR LED
	i2c1.writeByteSync(conf.VCNL4000_ADDRESS, conf.VCNL4000_IRLED, 5)// set to 5 * 10mA = 100mA

	// Start Read for proximity data
	i2c1.writeByteSync(conf.VCNL4000_ADDRESS, conf.VCNL4000_COMMAND, conf.VCNL4000_MEASUREPROXIMITY)
	// Wait while non volatile memory busy
	while (!((i2c1.readByteSync(conf.VCNL4000_ADDRESS, conf.VCNL4000_COMMAND) - 0x80) & conf.VCNL4000_PROXIMITYREADY)) {
	}
	prox = i2c1.readWordSync(conf.VCNL4000_ADDRESS,conf.VCNL4000_PROXIMITYDATA)

	// Start Read for proximity data
	i2c1.writeByteSync(conf.VCNL4000_ADDRESS, conf.VCNL4000_COMMAND, conf.VCNL4000_MEASUREAMBIENT)
	// Wait while non volatile memory busy
	while (!((i2c1.readByteSync(conf.VCNL4000_ADDRESS, conf.VCNL4000_COMMAND) - 0x80) & conf.VCNL4000_AMBIENTREADY)) {
	}

	light = i2c1.readWordSync(conf.VCNL4000_ADDRESS,conf.VCNL4000_AMBIENTDATA)

  console.log('proximity Data: ' + prox +' and light Data: ' + light);

}

setInterval(printData, 3000);
