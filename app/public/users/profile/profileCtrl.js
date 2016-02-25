'use strict';
(function () {

    angular
            .module('timeShareApp')
            .controller('profileCtrl', profileCtrl);
    profileCtrl.$inject = ['$location', 'authentication', '$routeParams', '$http', '$scope'];


    function profileCtrl($location, authentication, $routeParams, $http, $scope) {
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

        vmp.getAvatar = function () {
            $http.get('/api/users/' + vmp.currentUser._id).success(function (avatar) {
                vmp.media = avatar.media;
                console.log('avatar', avatar.media);
            });
        };

        vmp.onUpdate = function () {
            console.log('vmp', vmp.currentUser);
//            console.log('$scope', $scope.vmp.currentUser);
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
            console.log('author', id);
            if (id !== null) {
                $http.get('/api/adverts/searchAuthor/' + id).success(function (response) {
                    vmp.adverts = response;
                    console.log('listAdvert', vmp.adverts);
                });
            }
        };

//refresh the ads list after delete        
        var refresh = function () {
            vmp.listAdverts(vmp.currentUser._id);
            console.log('refresh', vmp.adverts);
        };
        refresh();



        //mark the advert and its replies as cancelled
        vmp.cancelAd = function (advert) {
            if (vmp.currentUser._id !== null) {
                var id = advert._id;
                $http.get('api/adverts/' + id).success(function (advert) {
                    console.log('supRep', advert.replies);
                    var repliesID = advert.replies;
                    angular.forEach(repliesID, function (replyID, reply) {
                        $http.put('api/replies/cancelled/' + replyID).success(function () {
                            console.log('reponses supprimées', reply);
                        });
                    });
                }).then(function (advert) {
                    var id = advert.data._id;
                    $http.put('/api/adverts/cancelled/' + id).success(function () {
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
                reply.rep_approved = true;
                var rep_id = reply._id;
                $http.put('api/replies/' + rep_id, reply).success(function () {
                    console.log('rep approved', reply._id, reply.rep_approved);
                    refresh();
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
//get replies whom advert has been cancelled
        vmp.cancelledReplies = function () {
            if (vmp.currentUser._id !== null) {
                $http.get('/api/replies/cancelled/' + vmp.currentUser._id).success(function (response) {
                    vmp.msgCancel = response;
                    console.log('message pour ', vmp.msgCancel);
                });
            }
        };

//          vmp.allAccounts = function(){
//                $http.get('/api/account').success(function (response) {
//                    vmp.account = response;
//                    console.log('mes comptes ', vmp.account);
//                }); 
//        };    

        vmp.getMyAccount = function () {
//             console.log('mon compte id', id);
            if (vmp.currentUser._id !== null) {
                $http.get('/api/account/accountUser/' + vmp.currentUser._id).success(function (response) {
                    vmp.account = response;
                    console.log('mon compte', vmp.account);
                });

            }
        };


        vmp.listService = function () {
            if (vmp.currentUser._id !== null) {
                $http.get('/api/adverts/service/' + vmp.currentUser._id).success(function (response) {
                    vmp.services = response;
                    var services = vmp.services;
                    console.log('mes services/RepTi', services);

                    angular.forEach(services, function (service) {
                        console.log('mes /RepTi', service.replies[0]);
                    });
                });
            }
        };

        vmp.credit = function (service, replyUser_id) {
            var hour = vmp.hour * 60;
            var min = vmp.min;


            console.log('service', service);
            $http.get('/api/account/accountUser/' + vmp.currentUser._id).success(function (response) {
                vmp.account = response;
                console.log('solde ANNONCEUR', vmp.account.solde);

                if (service === 'demande') {
                    vmp.account.solde = vmp.account.solde - hour - min;
                } else {
                    vmp.account.solde = vmp.account.solde + hour + min;
                }
                $http.put('/api/account/accountUser/' + vmp.currentUser._id, vmp.account).success(function () {
                    console.log('solde ANNONCEUR updated', vmp.account.solde);
                });
            }).then(function () {
                console.log('solde REP USER ID', replyUser_id);

                $http.get('/api/account/accountUser/' + replyUser_id).success(function (response) {
                    vmp.account = response;
                    vmp.account.starRating.push(vmp.rate);
                    if (service === 'demande') {
                        vmp.account.solde = vmp.account.solde + hour + min;
                    } else {
                        vmp.account.solde = vmp.account.solde - hour - min;
                    }
                    $http.put('/api/account/accountUser/' + replyUser_id, vmp.account).success(function () {
                        console.log('solde REPONDEUR updated', vmp.account.solde);
                    });
                });
            });
        };

        $scope.max = 5;
        $scope.isReadonly = false;
        $scope.hoveringOver = function (value) {
            $scope.overStar = value;
            console.log('$scope.rate', $scope.overStar);
            $scope.percent = 100 * (value / $scope.max);
        };

    }
})();

            