var date = new Date();
date.toISOString();

var last_update = date;

function pull_data(req, res) {
}

angular.module("app", ["chart.js"]).controller("LineCtrl", function($scope) {
  $scope.labels = ["a", "b", "c", "d", "e", "f", "g"];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  $scope.onClick = function(points, evt) {
    console.log(points, evt);
  };
});
