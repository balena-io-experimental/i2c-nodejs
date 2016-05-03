#/bin/bash

# Strips device-type from hostname (only works on resin.io base images)
DEVICE_TYPE=${HOSTNAME%-*}
I2C_BUS=0 # Default i2c bus number

# Enables i2c for the platform and set the appropriate bus number.
if [[ "$DEVICE_TYPE" =~ "raspberrypi" ]]; then
	modprobe i2c-dev
	export I2C_BUS=1
elif [[ "$DEVICE_TYPE" = "odroid-c1" ]]; then
	modprobe i2c-dev
	modprobe aml_i2c
	export I2C_BUS=1
elif [[ "$DEVICE_TYPE" = "beaglebone" ]]; then
	# i2c0: Not exposed in the expansion headers
	# i2c1: pins P9 17,18 (and 24,26)
	# i2c2: pins P9 19,20 (and 21,22)
	# load cape-universaln if you need i2c-1
	#echo cape-universaln > /sys/devices/platform/bone_capemgr/slots
	export I2C_BUS=2
elif [[ "$DEVICE_TYPE" = "artik5" ]]; then
	# Currently not working :/
	export I2C_BUS=9
elif [[ "$DEVICE_TYPE" = "artik10" ]]; then
	# Currently not working :/
	export I2C_BUS=7
else
	echo "Unable to detect device type!!!"
fi

echo "detected $DEVICE_TYPE"
#starts our node.js process which reads sensor values synchonously.
#node sensorSync.js

#Starts our async sensor read.
node sensorSync.js
