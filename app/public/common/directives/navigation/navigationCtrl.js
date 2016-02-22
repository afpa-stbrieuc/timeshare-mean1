(function() {

  angular
    .module('timeShareApp')
    .controller('navigationCtrl', navigationCtrl);

  navigationCtrl.$inject = ['$location', 'authentication', '$scope'];

  function navigationCtrl($location, authentication, $scope) {
    var vm = this;

    vm.currentPath = $location.path();

    vm.isLoggedIn = authentication.isLoggedIn();

    vm.currentUser = authentication.currentUser();
console.log('navvm: ', vm.currentUser);
    vm.logout = function() {
      authentication.logout();
      $location.path('/');
    };
    
    
  }
  
})();