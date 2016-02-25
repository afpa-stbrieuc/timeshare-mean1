'use strict';
(function() {
    angular
        .module('timeShareApp')
        .controller('passwordResetCtrl', passwordResetCtrl);
    passwordResetCtrl.$inject = ['$location', 'authentication'];

    function passwordResetCtrl($location, authentication) {
        var vmpr = this;

        

        vmpr.credentials = {
            mail: ""
        };

        vmpr.returnPage = $location.search().page || '/';

        vmpr.onSubmit = function() {
            vmpr.formError = "";
            if (!vmpr.credentials.mail) {
                vmpr.formError = "Vous devez mettre votre adresse mail";
                return false;
            } else {
                vmpr.doPasswordReset();
            }
        };

        vmpr.doPasswordReset = function() {
            vmpr.formError = "";
            authentication
                .passwordReset(vmpr.credentials)
                .error(function(err) {
                vmpr.formError = err;
                    console.log(err);
                })
                .then(function() {
                    console.log("tototojsjdj");
                    $location.search('page', null);
                    $location.path(vmpr.returnPage);
                });
        };

    }
})();



    