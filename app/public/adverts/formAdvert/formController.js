'use strict';

angular.module('timeShareApp')

.controller('formController', ['$scope', 'authentication', '$routeParams', '$http','$location', function ($scope, authentication, $routeParams, $http, $location) {

    if (!authentication.isLoggedIn()) {
        $location.path('/login');
    }
      
//data posted from formAdvert.html      
    $scope.addAdvert = function () {
        if (authentication.isLoggedIn()) {
            $scope.advert.author = authentication.currentUser().firstname;
            $scope.advert.author_id = authentication.currentUser()._id;

            $http.post('/api/adverts', $scope.advert).success(function (response) {
                console.log('scopeAdvert: ', $scope.advert);
                console.log('response: ', response);
                $scope.advert = response;
                
                
                var name = $scope.advert.author;
                var subject = $scope.advert.type + $scope.advert.title;
                var email = authentication.currentUser().mail; 
                console.log('response: ', name, subject, email);
                
                $http.get('api/email/send/' + name +'/'+ email +'/'+ subject ).success(function(response) {
           var mailrep = response;
            console.log('Une ad',mailrep)
        });
                
            });
        }
    };
//params received from profile.html
//data send to editAdvert.html
    $scope.editAdvert = function(id) {
        id = $routeParams.id;
        $http.get('/api/adverts/editAdvert/' + id).success(function(response) {
            $scope.advert = response;
            console.log('Une ad',$scope.advert)
        });
    };
//data updated in editAdvert.html
    $scope.updateAdvert = function(id) {
        id = $routeParams.id;
        console.log(id);
        console.log($scope.advert);
        $http.put('/api/adverts/' + id, $scope.advert).success(function(response) {
           console.log($scope.advert);
        });
    };

//regions list in select form        
    $scope.region = {
        regionOptions: [{
            regions: 'auvergne-rhone-alpes'
        }, {
            regions: 'bretagne'
        }, {
            regions: 'bourgogne-franche-comte'
        }, {
            regions: 'centre-val-de-loire'
        }, {
            regions: 'corse'
        }, {
            regions: 'grand-est'
        }, {
            regions: 'ile-de-france'
        }, {
            regions: 'nord'
        }, {
            regions: 'normandie'
        }, {
            regions: 'pays-de-la-loire'
        }, {
            regions: 'paca'
        }, {
            regions: 'sud-ouest-atlantique'
        }]
    };

    $scope.category = {
        catOptions: [{
            categories: 'aidePersonne'
        }, {
            categories: 'beauté'
        }, {
            categories: 'bricolage'
        }, {
            categories: 'demenagement'
        }, {
            categories: 'cours'
        }, {
            categories: 'loisirs'
        }, {
            categories: 'maison'
        }, {
            categories: 'mecanique'
        }, {
            categories: 'transport'
        }, {
            categories: 'travail'
        }]
    };


}]);
