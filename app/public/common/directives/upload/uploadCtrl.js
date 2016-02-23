'use strict';
(function() {
    angular
        .module('timeShareApp')
        .controller('MyCtrl', MyCtrl);

    MyCtrl.$inject = ['$scope', '$http', 'Upload', '$window', '$location'];

    function MyCtrl($scope, $http, Upload, $window, $location) {

        var vm = this;

        vm.submit = function() { //function to call on form submit
            if ($location.path() === '/formAdvert') {
                var mediax = $scope.advert;
            }
            if ($location.path() === '/profil') {
                var mediax = $scope.vmp.currentUser;
                console.log('$scope.mediax', mediax);
            }
            if (mediax === undefined) {
                $window.alert(' ERREUR : Vous devez déposer une annonce avant d\'attacher un fichier.');
            } else {
                if (vm.upload_form.file.$valid && vm.file) { //check if from is valid
                    vm.upload(vm.file); //call upload function
                }
            }
        };

        vm.upload = function(file) {

            if ($location.path() === '/formAdvert') {
                var mediax = $scope.advert;
            } else if ($location.path() === '/profil') {
                var mediax = $scope.vmp.currentUser;
            }

            console.log('datafile', file);
            Upload.upload({
                url: 'http://localhost:3000/api/upload', //webAPI exposed to upload the file
                data: {
                    file: file
                } //pass file as data, should be user ng-model

            }).then(function(resp) { //upload function returns a promise
                if (resp.data.error_code === 0) { //validate success
                    $window.alert(' Response : Success ' + resp.config.data.file.name + ' uploaded.');
                    console.log('RespConfig' + resp);

                    if ($location.path() === '/formAdvert') {
                        $http.put('/api/adverts/media/' + mediax._id, mediax).success(function() {
                            console.log('annonce updated: ', mediax);
                        });
                    }
                    if ($location.path() === '/profil') {
                        $window.alert(' CA MARCHE , TROUVE LA ROUTE');
                        $http.put('/api/users/media/' + mediax._id, mediax).success(function() {
                            console.log('profil updated: ', mediax);
                        });
                    }
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
    }

})();
