/**
 * NestController
 *
 * @description :: Server-side logic for managing nests
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var NestApi = require('nest-api');
var nestApi = new NestApi('dduan@yahoo.com', '123456');

var unoffNest = require('unofficial-nest-api');

module.exports = {
	login: function (req, res) {
		nestApi.login(function(data) {
			// return res.send("done");
		});


	},
	set: function (req, res) {
		var temp = req.params.temp;
		unoffNest.login("dduan@yahoo.com", "123456", function (err, data) {
			if (err) {
				console.log(err.message);
				return res.send('error');
			}
			unoffNest.fetchStatus(function (data) {
				for (var deviceId in data.device) {
					if (data.device.hasOwnProperty(deviceId)) {
						var device = data.shared[deviceId];
						// here's the device and ID
						unoffNest.setTemperature(deviceId, unoffNest.ftoc(temp));
					}
				}
				unoffNest.fetchStatus(function (data) {
					return res.send(data.device);
				});
			});
		});
	},
	get: function (req, res) {
		unoffNest.login("dduan@yahoo.com", "123456", function (err, data) {
			if (err) {
				console.log(err.message);
				return res.send('error');
			}
			unoffNest.fetchStatus(function (data) {
				return res.send(data.device);
			});
		});
	}
};
