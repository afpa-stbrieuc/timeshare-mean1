'use strict';
//use of ngResource for CRUD operations
angular.module('timeShareApp').factory('Todo', ['$resource', function($resource){
  return $resource('/api/todos/:id', {id:'@id'}, {
    update: {
      method: 'PUT' // this method issues a PUT request
    }
  });
}]);