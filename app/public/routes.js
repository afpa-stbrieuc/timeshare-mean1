'use strict';
(function() {

  function config($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home/home.html',
        controller: 'homeController'
      })

    .when('/login', {
        templateUrl: 'users/login/login.html',
        controller: 'loginCtrl',
        controllerAs: 'vm'
      })
      .when('/register', {
        templateUrl: 'users/register/register.html',
        controller: 'registerCtrl',
        controllerAs: 'vmr'
      })
      .when('/profil', {
        templateUrl: 'users/profile/profile.html',
        controller: 'profileCtrl',
        controllerAs: 'vmp'
      })
      .when('/account', {
        templateUrl: 'accounts/account.html',
        controller: 'accountController'
      })
      .when('/adverts', {
        templateUrl: 'adverts/adverts/adverts.html',
        controller: 'advertsController'
      })
      .when('/formAdvert', {
        templateUrl: 'adverts/formAdvert/formAdvert.html',
        controller: 'formController'
      })



    .otherwise({
      redirectTo: '/'
    });


  }

  angular
    .module('timeShareApp')
    .config(['$routeProvider', '$locationProvider', config]);

})();