(function() {

    angular
        .module('timeShareApp')
        .directive('timevalid', timevalid);

    function timevalid() {
        return {
            restrict: 'EA',
            templateUrl: 'common/directives/timevalid/timevalid.html',
            controller: 'timevalidCtrl as timeval'
        };
    }

})();
