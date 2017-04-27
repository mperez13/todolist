const myApp = angular.module('todolistApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http){
  console.log("Hello from Controller!");

  let refresh = function() {
    // the '/todolist' is the route where we get out data from
    $http.get('/todolist').then(function(response){
      console.log("I got the data requested.");
      $scope.todolist = response.data;
      $scope.todo = null;
    });
  };
  refresh();
  /* Add todo function for button*/
  $scope.addTodo = function(){
    console.log($scope.todo); // checks that we received data from the input boxes
    // $scope.todo is the data sent to the server
    $http.post('/todolist', $scope.todo).then(function(response){
      console.log(response);
      refresh();
    }); /*close of $http.post*/
  }; /*close of $scope.addtodo*/

  /* remove function for remove button*/
  $scope.remove = function(id){
    console.log(id);
    $http.delete('/todolist/' + id).then(function(response){
      refresh();
    });
  };  /*close of $scope.remove*/

  /* edit function for edit button*/
  $scope.edit = function(id) {
    console.log(id);
    $http.get('/todolist/' + id).then(function(response){
        $scope.todo = response.data;
    });
  }; /*close of $scope.edit*/

  /* update function for update button*/
  $scope.update = function(){
    console.log($scope.todo._id);
    $http.put('/todolist/' + $scope.todo._id, $scope.todo).then(function(response){
      refresh();
    });
  }; /*close of $scope.update*/

  /* deselect function for clear button*/
  $scope.deselect = function(){
    $scope.todo = null;
  }; /*close of $scope.deselect*/



}]); // Close of myApp.controller
