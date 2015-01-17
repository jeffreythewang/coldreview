/**
 * IdolController
 *
 * @description :: Server-side logic for managing idols
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var Idol = require('idol-client')('1f64dca9-5641-44e7-9782-eb0f1e2cd3d6');

module.exports = {
	get: function (req, res) {
		var input = req.param('text') + "";

		Idol.analyzeSentiment({
			parameters: {
				text: input
			}
		}).then(
			function(response){
				return res.send(response.data);
			},
			function(error){
				return res.send(error);
		});
	}
};
