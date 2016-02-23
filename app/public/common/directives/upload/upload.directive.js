(function() {

    angular
        .module('timeShareApp')
        .directive('upload', upload);

    function upload() {
        return {
            restrict: 'EA',
            templateUrl: 'common/directives/upload/upload.html',
            controller: 'MyCtrl as up'
        };
    }

})();
