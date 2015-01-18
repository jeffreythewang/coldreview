var app = angular.module("app", ["chart.js"]);

app.controller("LineCtrl", ['$scope', '$http', '$interval', function($scope, $http, $interval) {
    function init() {
        $scope.labels = ["-3m", "-2.5m", "-2m", "-1.5m", "-1m", "-30s", "now"];

        $scope.commitVolumes = [
            [2, 3, 2, 5, 4, 2, 3]
        ];

        $scope.temperatureValues = [
            [65, 59, 80, 81, 56, 55, 40], //calculated
            [28, 48, 40, 19, 86, 27, 90] //actual (estimated)
        ];

        $scope.commitSeries = ['Commits'];

        $scope.tempSeries = ['Calculated Temperature', 'Actual Temperature'];

        $scope.onClick = function(points, evt) {
            console.log(points, evt);
        };

        $scope.repoUrl ='';
        $scope.updateSpeed = 30 * 1000;
        $scope.commitMessages = [];
        $scope.commitList = [];

        // date calculations
        $scope.sinceTime = '2000-01-15T23:54:11Z';
        $scope.untilTime = new Date();
        $scope.untilTime = $scope.untilTime.toISOString();

        $scope.overall_max_temp = 90;
        $scope.overall_min_temp = 50;
        $scope.set_temp = 75;
        $scope.max_temp = 78;
        $scope.ambient_temp = 75;
        $scope.temperatureDelta = 0;
    }

    $scope.githubRequest = function() {
        var url = $scope.repoUrl.split('/');
        var ghIndex = url.indexOf('github.com');
        $scope.userName = url[ghIndex+1];
        $scope.repoName = url[ghIndex+2];

        // calcaultes times, send http request
        // update after 3 seconds (via http request)
        //$interval(function() { // maybe add this in later
            $scope.untilTime = new Date();
            $scope.untilTime = $scope.untilTime.toISOString();
            $http.get('github/getCommits?user=' + $scope.userName
                  + '&repo=' + $scope.repoName
                  + '&since=' + $scope.sinceTime
                  + '&until=' + $scope.untilTime).success(function(data) {
                $scope.analyzeCommit(data);
                $scope.sinceTime = new Date();
                $scope.sinceTime = $scope.sinceTime.toISOString();
            }).error(function() {
              // do something here
            });
        //}, $scope.updateSpeed);
    };

    $scope.analyzeCommit = function(commits) {
      var numCommitsAnalyzed = 0;

      function analyzeCommit(commit, length, cb) {
        text = commit.commit.message;
        $http.get('idol/get?text=' + text).success(function(data){
          // commit.idol = data.data.sentiment;
          commit.idol = data.aggregate;
          numCommitsAnalyzed++;
          if (numCommitsAnalyzed === length) {
            cb(commits);
            console.log(commits);
          }
        });
      }

      function sentimentsAnalyzed(data) {
        // $scope.commitList = $scope.commitList.concat(data);
        $scope.commitList = data.concat($scope.commitList);
        $scope.populateGraph();
        $('#commit-feed').fadeIn('slow', function() {});
      }

      // for(var i in commits) {
      for (var i = 0; i < commits.length; i++) {
        analyzeCommit(commits[i], commits.length, sentimentsAnalyzed);
      }
    }

    // handles points in the graph and calculates temperature values
    $scope.populateGraph = function() {
        $('body').addClass('entered');
        $('html').addClass('entered');
        $('#line-commits').fadeIn('slow', function() {
          $('#temp-settings').fadeIn('slow', function() {
          });
        });
        $('#line-temperatures').fadeIn('slow', function() {
          $('#temp-settings').fadeIn('slow', function() {
          });
        });
        $('.line-legend').fadeIn('slow', function() {});

        // create points for the scope data
        var numCommits = $scope.commitList.length;
        var x_values_commits = $scope.commitVolumes[0];
        x_values_commits.shift();
        x_values_commits.push(numCommits);

        $scope.temperatureDelta = jwuAlgorithm();
        $scope.set_temp = $scope.set_temp + $scope.temperatureDelta;
        var x_values_temperatures = $scope.temperatureValues[0];
        x_values_temperatures.shift();
        x_values_temperatures.push($scope.set_temp);
    };

    // jwu algorithm for temperate deltas
    function jwuAlgorithm() {
        var commitSum = $scope.commitVolumes[0].reduce(function (x, y) { return x + y });
        var commitAvg = commitSum / $scope.commitVolumes[0].length;
        console.log('sum' + commitSum);
        console.log('length' + $scope.commitVolumes[0]);
        var commitVolumeValue = Math.max(commitAvg, 1);
        return Math.max(Math.min(($scope.commitList[0].idol.score * 0.7
                                  + commitVolumeValue * 0.3) * 5,
                                  $scope.overall_max_temp),
                                  $scope.overall_min_temp);
    }

    // TODOs:
    // graphs commit volume over time
    // spits out commit message to a feed
    // idol parses commit messages
    // change nest temperature

    $scope.updateFaster = function () {
        if ($scope.updateSpeed > 5 * 1000) { $scope.updateSpeed -= 1000; }
    };

    $scope.updateSlower = function () {
        if ($scope.updateSpeed < 30 * 1000) { $scope.updateSpeed += 1000; }
    };

    init();
}]);
