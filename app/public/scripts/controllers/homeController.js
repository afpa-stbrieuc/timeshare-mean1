'use strict';
 (function () {
angular
  .module('timeShareApp')
 .controller('homeController' , homeController);
 homeController.$inject = ['$scope', '$http'];

function homeController($scope, $http) {
        var refresh = function () {
            $http.get('/api/adverts').success(function (response) {
                console.log("I got the data I requested");

                $scope.adverts = response;
                console.log($scope.adverts);
                $scope.advert = "";
            });
        };
        refresh();



        $scope.editAdvert = function (id) {
            console.log(id);
            $http.get('/api/adverts/' + id).success(function (response) {
                $scope.advert = response;
            });
        };
  
               
    };

})();