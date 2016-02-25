'use strict';
(function () {
    
    function backAccountController($location, authentication, $routeParams, $http) {

        var bc = this;
        var refresh = function () {
            $http.get('/api/account').success(function (response) {
                bc.accounts = response;
                console.log(bc.accounts);
            });
        };
        refresh();

    }
    angular.module('timeShareApp')
            .controller('backAccountController', backAccountController);
    backAccountController.$inject = ['$location', 'authentication', '$routeParams', '$http'];
})();











