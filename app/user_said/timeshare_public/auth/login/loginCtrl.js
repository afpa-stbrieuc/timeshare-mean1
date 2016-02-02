 
(function () {
angular
  .module('timeShareApp')
 .controller('loginCtrl' , loginCtrl);
  loginCtrl.$inject = ['$location','authentication'];
  function loginCtrl($location, authentication) {
    var vm = this;

    vm.pageHeader = {
      title: 'Connexion'
    }

    vm.credentials = {
      mail : "",
      password : ""   
    };

    vm.returnPage = $location.search().page || '/';

    vm.onSubmit = function () {
      vm.formError = "";
      if (!vm.credentials.mail || !vm.credentials.password) {
        vm.formError = "tous les champs sont requis";
        return false;
      } else {
        vm.doLogin();
      }
    };

    vm.doLogin = function() {
      vm.formError = "";
      authentication
        .login(vm.credentials)
        .error(function(err){
          vm.formError = err;
        })
        .then(function(){
          $location.search('page', null); 
          $location.path(vm.returnPage);
        });
    };

  }
})();


