'use strict';

angular.module('timeShareApp').config(['$routeProvider', function($routeProvider){
 
        $routeProvider
                .when('/', {
                    templateUrl: 'views/home.html',
                    controller: 'homeController'
                })
                .when('/adverts', {
                    templateUrl: 'views/adverts.html',
                    controller: 'advertsController'
                })
                .when('/formAdvert', {
                    templateUrl: 'views/formAdvert.html',
                    controller: 'formController'
                })
                .when('/responseToAd/:_id', {
                    templateUrl: 'views/responseToAd.html',
                    controller: 'responseToAdController'
                })
                .otherwise({redirectTo: '/'});




    
  }]);
