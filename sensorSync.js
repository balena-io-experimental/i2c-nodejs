var i2c = require('i2c-bus'),
  i2c1 = i2c.openSync(1);

var VCNL4000_ADDRESS = 0x13,
  VCNL4000_COMMAND = 0x80,
  VCNL4000_PRODUCTID = 0x81,
  VCNL4000_IRLED = 0x83,
  VCNL4000_AMBIENTPARAMETER = 0x84,
  VCNL4000_AMBIENTDATA = 0x85,
  VCNL4000_PROXIMITYDATA = 0x87,
  VCNL4000_SIGNALFREQ = 0x89,
  VCNL4000_PROXIMITYADJUST = 0x8A,
  VCNL4000_3M125 = 0,
  VCNL4000_1M5625 = 1,
  VCNL4000_781K25 = 2,
  VCNL4000_390K625 = 3,
  VCNL4000_MEASUREAMBIENT = 0x10,
  VCNL4000_MEASUREPROXIMITY = 0x08,
  VCNL4000_AMBIENTREADY = 0x40,
  VCNL4000_PROXIMITYREADY = 0x20;



(function () {
	// Check product ID of sensor
	rev = i2c1.readByteSync(VCNL4000_ADDRESS, VCNL4000_PRODUCTID)
	if(( rev & 0xF0)  !=0x10 ){
		console.log('no sensor found!!');
	}
	console.log('rev: ' + rev);
	// Start Read for proximity data
	i2c1.writeByteSync(VCNL4000_ADDRESS, VCNL4000_COMMAND, VCNL4000_MEASUREPROXIMITY)
	// Wait while non volatile memory busy
	while (!((i2c1.readByteSync(VCNL4000_ADDRESS, VCNL4000_COMMAND) - 0x80) & VCNL4000_PROXIMITYREADY)) {
	}
	h = i2c1.readWordSync(VCNL4000_ADDRESS,0x87)
  console.log('proximity Data: ' + h);

  i2c1.closeSync();
}());
