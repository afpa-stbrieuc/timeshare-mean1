'use strict';
 

(function () {
angular
  .module('timeShareApp')
  .controller('AdCtrl' , AdCtrl);
  AdCtrl.$inject = ['$location','authentication'];


 

 
  function AdCtrl($scope, $http) {



       var refresh = function () {
            $http.get('/api/adverts').success(function (response) {
                console.log("I got the data I requested");
                
                $scope.adverts = response;
                console.log($scope.adverts);
                $scope.advert = "";
            });
        };
        refresh();
};

})();