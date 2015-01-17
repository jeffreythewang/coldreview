var date = new Date();
    date.toISOString();
var last_update = date;

var app = angular.module("app", ["chart.js"]);

app.controller("LineCtrl", ['$scope', '$http', '$interval', function($scope, $http, $interval) {
    function init() {
        $scope.labels = ["a", "b", "c", "d", "e", "f", "g"];
        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
        ];

        $scope.onClick = function(points, evt) {
            console.log(points, evt);
        };

        $scope.repoUrl ='';
        $scope.updateSpeed = 30 * 1000;
        $scope.commitMessages = [];
        $scope.commitList = [];
    }

    $scope.githubRequest = function() {
        var url = $scope.repoUrl.split('/');
        var ghIndex = url.indexOf('github.com');
        $scope.userName = url[ghIndex+1];
        $scope.repoName = url[ghIndex+2];

        $('body').addClass('entered');
        $('#line').fadeIn('slow', function() {

        });

        // do the y_values with new Date
        // store in some $scope var?

        // update after 3 seconds (via http request)
        //$interval(function() { // maybe add this in later
            $http.get('github/getCommits?user=' + $scope.userName
                  + '&repo=' + $scope.repoName).success(function(data) {
                $scope.commitList = data;
            }).error(function() {
              // do something here
            });
        //}, $scope.updateSpeed);

        $scope.populateGraph();
    };

    $scope.populateGraph = function() {
        // create points for the scope data
        var numCommits = $scope.commitList.length;

        var x_values = $scope.data[1];
        x_values.shift();
        x_values.push(numCommits);
    };

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
