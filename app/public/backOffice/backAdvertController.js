'use strict';
(function() {

    function backAdvertController($location, authentication, $routeParams, $http) {

        var ba = this;
        var refresh = function() {
            $http.get('/api/adverts').success(function(response) {
                ba.adverts = response;
                console.log(ba.adverts);
            });
        };
        refresh();

        //delete advert and its replies //function for ADMIN ONLY
        ba.deleteAd = function(advert) {
            console.log('sup', advert);
            if (ba.currentUser._id !== null) {
                var id = advert._id;
                $http.get('api/adverts/' + id).success(function(advert) {
                    console.log('supRep', advert.replies);
                    var replies = advert.replies;
                    angular.forEach(replies, function(reply) {
                        $http.delete('api/replies/' + reply).success(function() {
                            console.log('reponses supprimées', reply);
                        });
                    });
                }).then(function(advert) {
                    var id = advert.data._id;
                    $http.delete('/api/adverts/' + id).success(function() {
                        console.log('annonce supprimée', advert._id);
                        refresh();

                    });
                });
            }
        };
    }

    angular
        .module('timeShareApp')
        .controller('backAdvertController', backAdvertController);

    backAdvertController.$inject = ['$location', 'authentication', '$routeParams', '$http'];


})();


