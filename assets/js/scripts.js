var date = new Date();
    date.toISOString();
var last_update = date;

function pull_data(req, res) {
}

var app = angular.module("app", ["chart.js"]);

app.controller("LineCtrl", ['$scope', '$http', '$interval', function($scope, $http, $interval) {
  $scope.labels = ["a", "b", "c", "d", "e", "f", "g"];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  $scope.onClick = function(points, evt) {
    console.log(points, evt);
  };

  $scope.updateSpeed = 3000;

    $scope.repoUrl ='';
    $scope.loadData = function() {
        var url = $scope.repoUrl.split('/');
        var ghIndex = url.indexOf('github.com');
        $scope.userName = url[ghIndex+1];
        $scope.repoName = url[ghIndex+2];
        console.log('initial load');
        console.log(url);
        console.log($scope.userName);
        console.log($scope.repoName);
        // do something
        $scope.sendRequest();
    };

    $scope.sendRequest = function () {
        // do http requests in angular
        // update after 3 seconds (via http request)
        // need to loop this
        // graphs commit volume over time
        // spits out commit message to a feed
        // idol parses commit messages
        // change nest temperature
        $interval(function() {
            console.log('refresher');
            console.log($scope.userName);
            console.log($scope.repoName);
              $http.get('github/getCommits?user=' + $scope.userName
                      + '&repo=' + $scope.repoName, {
              }).success(function(data) {
                  // create points for the scope data

                  $scope.commitList = data;
                  console.log($scope.commitList);
                  var numCommits = data.length;

                  console.log($scope.data);
                  var x_values = $scope.data[1];
                  x_values.shift();
                  x_values.push(numCommits);

                  // do the y_values with new Date
                  // store in some $scope var?

                  for (var i = 0; i < numCommits; i++) {
                  }

                  console.log(numCommits);
                  console.log(data);
              }).error(function() {
                  // do something here
              });
        }, $scope.updateSpeed);
    };

    $scope.updateFaster = function () {
        if ($scope.updateSpeed > 5 * 1000) { $scope.updateSpeed -= 1000; }
    }

    $scope.updateSlower = function () {
        if ($scope.updateSpeed < 30 * 1000) { $scope.updateSpeed += 1000; }
    }
}]);
