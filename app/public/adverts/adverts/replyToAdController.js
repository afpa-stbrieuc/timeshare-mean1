'use strict';

angular.module('timeShareApp')

.controller('replyToAdController', ['$scope', 'authentication', '$location', '$routeParams', '$http', function ($scope, authentication,$location, $routeParams, $http) {

    if (!authentication.isLoggedIn()) {
        $location.path('/login');
    }
    console.log('advertId:', $routeParams._id);
    $http.get('/api/adverts/replyToAd/' + $routeParams._id).success(function (response) {
        $scope.advert = response;      
    });


$scope.returnPage = $location.search().page || '/';

    $scope.addReply = function () {
        $scope.reply.author = authentication.currentUser().firstname;
        $scope.reply.author_id = authentication.currentUser()._id;
        $scope.reply.toAdId = $routeParams._id;
        $scope.reply.toAd_author = $scope.advert.author_id;
        $http.post('/api/replies', $scope.reply).success(function (response) {
            $scope.reply = response;
    //                    $scope.reply = "";
        }).then(function () { // returns a promise
                    var reply = $scope.reply;
                    console.log('IdReply: ', reply);
                    $scope.advert.replies = reply;
                    $http.put('/api/adverts/replies/' + $scope.advert._id, $scope.advert).success(function () {
                        console.log('IdAdvet: ', $scope.advert);
                        console.log('IdReply: ', reply);
                        $scope.reply = "";
                        console.log('ReplySCOPR: ', $scope.reply);
                        $location.path($scope.returnPage);
                    });
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

}]);