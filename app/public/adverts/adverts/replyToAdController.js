'use strict';

angular.module('timeShareApp')

    .controller('replyToAdController', ['$scope', 'authentication', '$routeParams', '$http', function ($scope, authentication, $routeParams, $http) {

            console.log('advertId:', $routeParams._id);
//        $scope.editReply = function (id) {
//            console.log(id);
            $http.get('/api/adverts/replyToAd/' + $routeParams._id).success(function (response) {
                $scope.advert = response;
       
            });

            $scope.addReply = function () {
                $scope.reply.author = authentication.currentUser().firstname;
                $http.post('/api/replies', $scope.reply).success(function (response) {
                    console.log('scopeReply: ', $scope.reply);
                    console.log('response: ', response);
                    $scope.reply = response;
                    $scope.reply = "";
                });
            };


            $scope.removeReply = function (id) {
                console.log(id);
                $http.delete('/api/replies/' + id).success(function (response) {
                    //               refresh(); 
                });
            };

            $scope.editReply = function (id) {
                console.log(id);
                $http.get('/api/replies/' + id).success(function (response) {
                    $scope.reply = response;
                });
            };

            $scope.updateReply = function () {
                console.log($scope.reply._id);
                $http.put('/api/replies/' + $scope.reply._id, $scope.reply).success(function (response) {
                    //                refresh(); 
                });
            };

            $scope.deselect = function () {
                $scope.reply = "";
            };


//        };
        }]);