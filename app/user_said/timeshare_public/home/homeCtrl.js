'use strict';
 

(function () {
angular
  .module('timeShareApp')
  .controller('homeCtrl' , homeCtrl);
  homeCtrl.$inject = ['$location','authentication', '$scope', '$http'];


 

 
  function homeCtrl($location, authentication,$scope, $http ) {

        var refresh = function () {
            console.log(authentication);
             console.log(authentication.getToken);
            $http.get('/api/adverts', {

                headers: {
                    Authorization: 'Bearer '+ authentication.getToken()
                }
            }).success(function (response) {
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

