var GitHubApi = require("github");

/**
 * GithubController
 *
 * @description :: Server-side logic for managing githubs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var github = new GitHubApi({
    // required
    version: "3.0.0",
    // optional
    debug: true,
    protocol: "https",
    host: "api.github.com",
    timeout: 5000,
    headers: {
        "user-agent": "coldreview",
    }
});

module.exports = {
    getCommits: function(req, res) {
        var commit_options = {
            user: req.param('user') || "jeffreythewang",
            repo: req.param('repo') || "superprod",
        };

        if (req.param('since')) {
            commit_options.since = req.param('since');
        }

        if (req.param('until')) {
            commit_options.until = req.param('until');
        }

        github.repos.getCommits(commit_options, function(err, api_response) {
            if (!err) {
                return res.json(api_response);
            }
        });
    }
};
