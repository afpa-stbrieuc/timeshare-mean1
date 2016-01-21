'use strict';
//doc for dialog: https://github.com/m-e-conroy/angular-dialog-service
angular.module('mytodoApp')
  .controller('AccountCtrl', function($scope, $http, Todo, dialogs) {

  console.log("Hello from Account controller"+" ./");
  //console.log(.);
var refresh = function(){
$http.get('/api/account').success(function(response){
  $scope.accountlist = response;
  $scope.account = "";
});
};

refresh();

$scope.addAccount = function(){
  console.log($scope.account);
  $http.post('/api/account', $scope.account).success(function(response){
    console.log(response);
    refresh();
  });
};

$scope.removeAccount = function(id){
  console.log(id);
  $http.delete('api/account/' + id).success(function(response){
    refresh();
  });
};

$scope.editAccount = function(id){
  console.log(id);
  $http.get('/api/account/' + id).success(function(response){
    $scope.account = response;
  });
};

$scope.updateAccount = function(){
  console.log($scope.account._id);
  $http.put('/api/account/' + $scope.account._id, $scope.account).success(function(response){
    refresh();
  })
};

$scope.deselectAccount = function(){
  $scope.account = "";
}
 
});