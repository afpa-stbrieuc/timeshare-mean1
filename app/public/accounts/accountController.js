'use strict';

angular.module('timeShareApp')
  .controller('accountController', function($scope, $http) {

    console.log('Hello from Account controller');

    var refresh = function() {
      $http.get('/api/account').success(function(response) {

        $scope.accountlist = response;
        $scope.account = '';
      });
    };

    refresh();

    $scope.addAccount = function() {
      console.log($scope.account);
      $http.post('/api/account', $scope.account).success(function(response) {
        console.log(response);
        refresh();
      });
    };

    $scope.removeAccount = function(id) {
      console.log(id);
      $http.delete('api/account/' + id).success(function() {
        refresh();
      });
    };

    $scope.editAccount = function(id) {
      console.log(id);
      $http.get('/api/account/' + id).success(function(response) {
        $scope.account = response;
      });
    };

    $scope.updateAccount = function() {
      console.log($scope.account._id);
      $http.put('/api/account/' + $scope.account._id, $scope.account).success(function() {
        refresh();
      });
    };

    $scope.deselectAccount = function() {
      $scope.account = '';
    };

  });