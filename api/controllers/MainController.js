var GithubController = require("./GithubController.js");

/**
 * MainController
 *
 * @description :: Server-side logic for managing mains
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    send: function(req, res) {
        var commit_options ={
            user: req.params.user || "jeffreythewang",
            repo: req.params.repo || "superprod",
        };

        GithubController.getCommits(req, res, commit_options);
    }
};

