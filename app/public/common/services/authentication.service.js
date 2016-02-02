(function() {

  angular
    .module('timeShareApp')
    .service('authentication', authentication);

  authentication.$inject = ['$http', '$window'];

  function authentication($http, $window) {

    var saveToken = function(token) {
      $window.localStorage['timeshare-token'] = token;
    };

    var getToken = function() {
      return $window.localStorage['timeshare-token'];
    };

    var isLoggedIn = function() {
      var token = getToken();

      if (token) {
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    var currentUser = function() {
      if (isLoggedIn()) {
        var token = getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));
        return {
          mail: payload.mail,
          lastname: payload.lastname,
          firstname: payload.firstname
        };
      }
    };

    register = function(user) {
      return $http.post('/api/users/inscription', user).success(function(data) {
        saveToken(data.token);
        console.log(data.token);
        console.log("c fait");

      });
    };

    login = function(user) {
      return $http.post('/api/users/login', user).success(function(data) {
        saveToken(data.token);
        console.log(data.token);
        console.log("c fait");
      });
    };

    logout = function() {
      $window.localStorage.removeItem('timeshare-token');
    };

    return {
      currentUser: currentUser,
      saveToken: saveToken,
      getToken: getToken,
      isLoggedIn: isLoggedIn,
      register: register,
      login: login,
      logout: logout
    };
  }


})();