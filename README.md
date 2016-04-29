A simple i2c sensor example for resin.io devices.
===

This is a simple node.js project that uses [i2c-bus](https://www.npmjs.com/package/i2c-bus) to get data from a [VLNC4000 proximity & light sensor](https://www.adafruit.com/products/466). It is made to be generic and act as base for any i2c sensor integration. It should work on any of the [resin.io][resin-link] supported devices, you just need to make sure i2c is enabled in the kernel and know the i2c bus number for you device. For some of our boards, this is done automatically, take a look at [setup-i2c.sh](/setup-i2c.sh) for more info.


To get this project up and running, you will need to signup for a resin.io account [here][signup-page] and set up a device, have a look at our [Getting Started tutorial][gettingStarted-link]. Once you are set up with resin.io, you will need to clone this repo locally:
```
$ git clone git@github.com:resin-projects/simple-server-node.git
```
Then add your resin.io application's remote repository to your local repository:
```
$ git remote add resin username@git.resin.io:username/myapp.git
```
and push the code to the newly added remote:
```
$ git push resin master
```
It should take a few minutes for the code to push.


[resin-link]:https://resin.io/
[signup-page]:https://dashboard.resin.io/signup
[gettingStarted-link]:http://docs.resin.io/#/pages/installing/gettingStarted.md
