'use strict';

angular.module('timeShareApp')

.controller('formController', ['$scope', 'authentication', '$routeParams', '$http','$location', function ($scope, authentication, $routeParams, $http, $location) {

    if (!authentication.isLoggedIn()) {
        $location.path('/login');
    }
     console.log('User authLOGIN: ', authentication.isLoggedIn());
     console.log('User auth: ', authentication.currentUser()._id);
      
//data posted from formAdvert.html      
    $scope.addAdvert = function () {
        if (authentication.isLoggedIn()) {
            $scope.advert.author = authentication.currentUser().firstname;
            $scope.advert.author_id = authentication.currentUser()._id;

            $http.post('/api/adverts', $scope.advert).success(function (response) {
                console.log('scopeAdvert: ', $scope.advert);
                console.log('response: ', response);
                $scope.advert = response;
            });
        }
    };
//params received from profile.html
//data send to editAdvert.html
    $scope.editAdvert = function(id) {
        id = $routeParams.id;
        $http.get('/api/adverts/editAdvert/' + id).success(function(response) {
            $scope.advert = response;
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


}])

.controller('MyCtrl', ['$scope', '$http', 'Upload', '$window', function($scope, $http, Upload, $window) {
    var vm = this;

    vm.submit = function() { //function to call on form submit
        if (vm.upload_form.file.$valid && vm.file) { //check if from is valid
            vm.upload(vm.file); //call upload function
        }
    };

    vm.upload = function(file) {
        console.log('datafile', file);
        Upload.upload({
            url: 'http://localhost:3000/api/adverts/upload', //webAPI exposed to upload the file
            data: {
                file: file
            } //pass file as data, should be user ng-model

        }).then(function(resp) { //upload function returns a promise
            if (resp.data.error_code === 0) { //validate success
                $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
                console.log('RespConfig' + resp);

                $http.put('/api/adverts/media/' + $scope.advert._id, $scope.advert).success(function() {
                    console.log('currentId2: ', $scope.advert);
                });
            } else {
                $window.alert('an error occured');
            }
        }, function(resp) { //catch error
            console.log('Error status: ' + resp.status);
            $window.alert('Error status: ' + resp.status);
        }, function(evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            console.log('configData ', evt.config.data.file.name);
            vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
        });

    };

}]);