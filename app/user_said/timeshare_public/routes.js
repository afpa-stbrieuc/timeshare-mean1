'use strict';
(function () {

function config ($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'timeshare_public/home/home.html',
        controller: 'homeCtrl'
    })
      
      .when('/login', {
        templateUrl: 'timeshare_public/auth/login/login.html',
        controller: 'loginCtrl',
        controllerAs: 'vm'
      })
      .when('/register', {
        templateUrl: 'timeshare_public/auth/register/register.html',
        controller: 'registerCtrl',
        controllerAs: 'vmr'
      })
       .when('/profil', {
       templateUrl: 'timeshare_public/auth/profile/profile.html',
        controller: 'profileCtrl',
        controllerAs: 'vmp'
      })
       .when('/formAdvert', {
        templateUrl: 'timeshare_public/adverts/formAdvert/formAdvert.html',
        controller: 'formAdvertCtrl'
    })
       .when('/adverts', {
        templateUrl: 'timeshare_public/adverts/adverts/adverts.html',
        controller: 'advertsCtrl'
    })
      
      
      .otherwise({redirectTo: '/'});


  }

  angular
    .module('timeShareApp')
    .config(['$routeProvider', '$locationProvider', config]);

})();