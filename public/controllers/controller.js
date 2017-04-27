const myApp = angular.module('todolistApp', []);

myApp.controller('AppCtl', ['$scope'. '$http', function($scope, $http){
  console.log("Hello from Controller!");
}]);
