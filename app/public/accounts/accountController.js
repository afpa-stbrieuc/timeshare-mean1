'use strict';

angular.module('timeShareApp')
        .controller('accountController', function ($scope, $http, authentication) {

            console.log('Hello from Account controller');
            //console.log(authentication.currentUser().mail);

            // var ac = this;

            //ac.currentUser = authentication.currentUser();


            var refresh = function () {

                if (authentication.isLoggedIn())
                {
                    $http.get('/api/account').success(function (response) {

                        $scope.accountlist = response;
                        $scope.account = '';
                    });
                }
                else
                {
                    $scope.accountlist = '';
                    $scope.account = '';
                    $scope.unclick = 'unclick';
                    //console.log('Unclick ?: ' + $scope.unclick);

                }
            };

            refresh();

            $scope.addAccount = function () {
                if (authentication.isLoggedIn())
                {
                    console.log($scope.account);
                    $http.post('/api/account', $scope.account).success(function (response) {
                        console.log(response);
                        refresh();
                    });
                }
                else
                {
                }
            };

            $scope.removeAccount = function (id) {
                console.log(id);
                $http.delete('api/account/' + id).success(function () {
                    refresh();
                });
            };

            $scope.editAccount = function (id) {
                console.log(id);
                $http.get('/api/account/' + id).success(function (response) {
                    $scope.account = response;
                });
            };

            $scope.updateAccount = function () {
                console.log($scope.account._id);
                $http.put('/api/account/' + $scope.account._id, $scope.account).success(function () {
                    refresh();
                });
            };

            $scope.deselectAccount = function () {
                $scope.account = '';
            };

        });