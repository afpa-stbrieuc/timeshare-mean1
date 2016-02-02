'use strict';

angular.module('timeShareApp')

.controller('responseToAdController', ['$scope','$routeParams', '$http', function ($scope,$routeParams, $http) {
 
                console.log('advertId:',$routeParams._id);
//        $scope.editAdvert = function (id) {
//            console.log(id);
            $http.get('/api/adverts/responseToAd/' + $routeParams._id).success(function (response) {
                $scope.advert = response;
//                
//                
            });
//        };
}]);