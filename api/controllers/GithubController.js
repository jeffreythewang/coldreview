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
    getCommits: function(req, res, commit_parameters) {
        var commit_options = commit_parameters;

        if (commit_parameters.since) {
            commit_options.since = since;
        }

        if (commit_parameters.until) {
            commit_options.until = until;
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
