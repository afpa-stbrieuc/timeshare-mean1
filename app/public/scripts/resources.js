'use strict';
//use of ngResource for CRUD operations
angular.module('mytodoApp').factory('Todo', ['$resource', function($resource){
  return $resource('/api/todos/:id', {id:'@id'}, {
    update: {
      method: 'PUT' // this method issues a PUT request
    }
  });
}]);