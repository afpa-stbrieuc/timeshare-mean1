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
            console.log(vmp.credentials.password);
            console.log(vmp.credentials.mail);
            console.log(vmp.credentials.lastname);
            vmp.formError = "";
            if (!vmp.credentials.lastname || !vmp.credentials.firstname || !vmp.credentials.mail || !vmp.credentials.password) {

                vmp.formError = "tous les champs sont requizz";
                return false;
            } else {
                vmp.doUpdateProfile();
            }
        };



        vmp.doUpdateProfile = function () {
            console.log(vmp.credentials.password);
            console.log(vmp.credentials.mail);
            console.log(vmp.credentials.lastname);
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
        vmp.listAdverts = function () {
            if (vmp.currentUser._id !== null) {
                $http.get('/api/adverts/searchAuthor_id/' + vmp.currentUser._id).success(function (response) {                  
                    vmp.adverts = response;
                });
            }
        };
//displays a list of replies in the controller 
         vmp.listReplies = function () {
            $http.get('api/replies/').success(function (response) {
                 vmp.replies = response;
                console.log('les reps', vmp.replies)
            });
        };
        
    }
})();