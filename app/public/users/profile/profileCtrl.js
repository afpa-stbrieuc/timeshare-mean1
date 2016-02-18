'use strict';
(function () {

    angular
            .module('timeShareApp')
            .controller('profileCtrl', profileCtrl);
    profileCtrl.$inject = ['$location', 'authentication', '$routeParams', '$http'];


    function profileCtrl($location, authentication, $routeParams, $http) {
        var vmp = this;

        vmp.currentPath = $location.path();
        vmp.isLoggedIn = authentication.isLoggedIn();
        vmp.currentUser = authentication.currentUser();
        vmp.credentials = {
            lastname: "",
            firstname: "",
            mail: "",
            password: "",
            tel: "",
            adress: ""
        };

        vmp.returnPage = $location.search().page || '/profil';

        vmp.onUpdate = function () {
            vmp.credentials = vmp.currentUser;
            vmp.credentials._id = vmp.currentUser._id;
            console.log("id de user" + vmp.credentials._id);
            vmp.formError = "";
            if (!vmp.credentials.lastname || !vmp.credentials.firstname || !vmp.credentials.mail || !vmp.credentials.password) {

                vmp.formError = "tous les champs sont requizz";
                return false;
            } else {
                vmp.doUpdateProfile();
            }
        };

        vmp.doUpdateProfile = function () {
            console.log(vmp.credentials.mail);
            vmp.formError = "";
            authentication
                    .updateProfile(vmp.credentials)
                    .error(function (err) {
                        vmp.formError = err;
                    })
                    .then(function () {
                        $location.search('page', null);
                        $location.path(vmp.returnPage);
                    });
        };
//displays all adverts posted by one author
        vmp.listAdverts = function (id) {
            console.log('author',id);
            if (id !== null) {
                $http.get('/api/adverts/searchAuthor/' + id).success(function (response) {
                    vmp.adverts = response;
                    console.log('listAdvert',vmp.adverts);
                });
            }
        };
    
//refresh the ads list after delete        
        var refresh = function () {
            vmp.listAdverts(vmp.currentUser._id);
        };
        refresh();

//delete advert and its replies
        vmp.deleteAd = function (advert) {
            console.log('sup', advert);
            if (vmp.currentUser._id !== null) {
                var id = advert._id;
                $http.get('api/adverts/' + id).success(function (advert) {
                    console.log('supRep', advert.replies);
                    var replies = advert.replies;
                    angular.forEach(replies, function (reply, key) {
                        $http.delete('api/replies/' + reply).success(function () {
                            console.log('reponses supprimées', reply);
                        });
                    });
                }).then(function (advert) {
                    var id = advert.data._id;
                    $http.delete('/api/adverts/' + id).success(function () {
                        console.log('annonce supprimée', advert._id);
                        refresh();
                        
                    });
                });
            }
        };
//displays all replies related to current user 
        vmp.listReplies = function (adAuthorId) {
            $http.get('api/replies/' + adAuthorId).success(function (response) {
                vmp.replies = response;
                console.log('les reps', vmp.replies);
            });
        };
//mark the advert as answered and the reply as approved
        vmp.validReply = function (advert, reply) {
            var id = advert._id;
            $http.put('api/adverts/answered/' + id, advert).success(function () {
                console.log('ad up', advert.answered);
            }).then(function () {
                var rep_id = reply._id;
                $http.put('api/replies/approved/' + rep_id, reply).success(function () {
                    console.log('rep approved', reply._id, reply.rep_approved);
                });
            });
        };
//displays all author's approved replies 
        vmp.approvedReplies = function () {
            if (vmp.currentUser._id !== null) {
                $http.get('/api/replies/approved/' + vmp.currentUser._id).success(function (response) {
                    vmp.messages = response;
                    console.log('message pour ', vmp.messages);
                });
            }
        };

    }
})();

            