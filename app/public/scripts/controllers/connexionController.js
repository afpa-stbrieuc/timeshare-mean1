'use strict';
 
angular.module('connexion', ['ngRoute'])
 
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/connexion', {
    templateUrl: 'views/connexion.html',
    controller: 'ConnexionCtrl'
  });
}])
 
.controller('ConnexionCtrl', ['$scope', '$http', function ($scope, $http) {
        var refresh = function () {
            $http.get('/api/users').success(function (response) {
                console.log("I got the data I requested");

                $scope.users = response;
                console.log($scope.users);
                $scope.user = "";
            });
        };
        refresh();
        
        $scope.addUser = function() {
            console.log($scope.user);
            $http.post('/api/users', $scope.user).success(function (response) {
                console.log(response);
//                refresh();
            });
        };

        $scope.editUser = function (id) {
            console.log(id);
            $http.get('/api/users/' + id).success(function (response) {
                $scope.user = response;
            });
        };
    }]);

