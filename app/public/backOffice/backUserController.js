'use strict';
(function () {
    
    function backUserController($location, authentication, $routeParams, $http) {

        var bu = this;
        var refresh = function () {
            $http.get('/api/users').success(function (response) {
                bu.users = response;
                console.log(bu.users);
            });
        };
        refresh();

    }
    angular.module('timeShareApp')
            .controller('backUserController', backUserController);
    backUserController.$inject = ['$location', 'authentication', '$routeParams', '$http'];
})();








