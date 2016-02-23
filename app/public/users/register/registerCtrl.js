'use strict';


(function() {
    angular
        .module('timeShareApp')
        .controller('registerCtrl', registerCtrl);
    registerCtrl.$inject = ['$location', 'authentication'];

    function registerCtrl($location, authentication) {
        var vmr = this;

        vmr.pageHeader = {
            title: 'Creation d\'un nouveau compte'
        };

        vmr.credentials = {
            lastname: "",
            firstname: "",
            mail: "",
            password: "",
            tel: "",
            adress: "",
            media: "avatar.ico"

        };

        vmr.returnPage = $location.search().page || '/';

        vmr.onSubmit = function() {
            vmr.formError = "";
            if (!vmr.credentials.lastname || !vmr.credentials.firstname || !vmr.credentials.mail || !vmr.credentials.password) {
                vmr.formError = "tous les champs sont requis";
                return false;
            } else {
                vmr.doRegister();
            }
        };

        vmr.doRegister = function() {
            vmr.formError = "";
            authentication
                .register(vmr.credentials)
                .error(function(err) {
                    console.log('status', err)
                    vmr.formError = err;
                })
                .then(function() {
                    $location.search('page', null);
                    $location.path(vmr.returnPage);
                });
        };

    }

})();
