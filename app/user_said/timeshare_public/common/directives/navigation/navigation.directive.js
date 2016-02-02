(function () {

  angular
    .module('timeShareApp')
    .directive('navigation', navigation);

  function navigation () {
    return {
      restrict: 'EA',
      templateUrl: 'timeshare_public/common/directives/navigation/navigation.html',
      controller: 'navigationCtrl as navvm'
    };
  }

})();