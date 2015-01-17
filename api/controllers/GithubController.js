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
            user: "jeffreythewang",
            repo: "superprod",
        };

        if (req.params.since) {
            commit_options.since = req.params.since;
        }

        if (req.params.until) {
            commit_options.until = req.params.until;
        }

        github.repos.getCommits(commit_options, function(err, api_response) {
            if (!err) {
                return res.view('index', {
                    commits: api_response
                });
            }
        });
    },

    getCommit: function(req, res) {
        github.gitdata.getCommit({
            user: "jeffreythewang",
            repo: "superprod",
            sha: req.params.sha || "",
        }, function(err, api_response) {
            if (!err) {
                console.log(api_response);
                return res.send("commit data");
            }
        });
    }
};
