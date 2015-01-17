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
			return res.send("done");
		});
	},
	set: function (req, res) {
		var temp = req.params.temp;
		settings = {
			'target_change_pending': true,
			'target_temperature': (temp - 30) / 2
		}
		nestApi.post(settings, function(data) {
			return res.send(data);
		});
	},
	get: function (req, res) {
		this.login();
		nestApi.get(function(data) {
			return res.send(data.device);
		});

	}
};
