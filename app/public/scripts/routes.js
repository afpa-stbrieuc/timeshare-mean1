'use strict';

angular.module('mytodoApp').config(['$routeProvider', function($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl: 'views/account.html',
        controller: 'AccountCtrl'
      })
      //.when('/', {
        //templateUrl: 'views/todos.html',
        //controller: 'MainCtrl'
      //})
        .when('/account', {
        templateUrl: 'views/account.html',
        controller: 'AccountCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);