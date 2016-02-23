(function() {

    angular
        .module('timeShareApp')
        .controller('timevalidCtrl', timevalidCtrl);

    timevalidCtrl.$inject = ['$location', 'authentication'];

    function timevalidCtrl($location, authentication) {
        var timevalid = this;

        timevalid.currentPath = $location.path();

        timevalid.isLoggedIn = authentication.isLoggedIn();

        timevalid.currentUser = authentication.currentUser();
    }
})();
