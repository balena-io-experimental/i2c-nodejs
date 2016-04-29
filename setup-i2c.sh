#/bin/bash

# Strips device-type from hostname (only works on resin.io base images)
DEVICE_TYPE=${HOSTNAME%-*}
I2C_BUS=0 # Default i2c bus number

# Enables i2c for the platform and set the appropriate bus number.
if [[ "$DEVICE_TYPE" =~ "raspberrypi" ]]; then
	modprobe i2c-dev
	export I2C_BUS=1
elif [[ "$DEVICE_TYPE" = "artik10" ]]; then
	export I2C_BUS=9
elif [[ "$DEVICE_TYPE" = "artik10" ]]; then
	export I2C_BUS=7
else
	echo "Unable to detect device type!!!"
fi

echo "detected $DEVICE_TYPE"
#starts our node.js process
node sensorSync.js