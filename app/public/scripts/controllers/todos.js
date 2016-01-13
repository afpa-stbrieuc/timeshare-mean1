'use strict';
//doc for dialog: https://github.com/m-e-conroy/angular-dialog-service
angular.module('mytodoApp')
  .controller('MainCtrl', function($scope, Todo, dialogs) {

    //fetch all todos'
    $scope.todos = Todo.query(
      function() {},
      function(error) { //error
          dialogs.error('Error', 'server error');
          console.log(error.data);
        }
    );

    //$scope.alerts = alertService.get();

    $scope.delete = function(index) {
      var todo = $scope.todos[index];
      Todo.delete({ id:todo._id }, todo, function() {
        dialogs.notify('delete', 'cool');
        $scope.todos.splice($scope.todos.indexOf(todo), 1);
      }, function(error) {
        dialogs.error('Error', 'server error');
        console.log(error.data);
      });

    };



    $scope.add = function() {
      var todo = new Todo();
      todo.name = $scope.name;
      todo.$save();
      $scope.todos.push(todo);
    };

    $scope.edit = function(index){
      var dlg = dialogs.create('/views/todo-edit.html','editTodoCtrl',$scope.todos[index]);
      dlg.result.then(function(todo){
        Todo.update({ id:todo._id }, todo,
          function() {},
          function(error) { //error
            dialogs.error('Error', 'server error');
            console.log(error.data);
          }
        );
      },function(){
       
      });
    };


  })

.controller('editTodoCtrl',function($log,$scope,$uibModalInstance,data){
    $scope.todo = data;
    $scope.opened = false;

    
    $scope.done = function(){
      $uibModalInstance.close($scope.todo);
    }; // end done

    $scope.close = function(){
      $uibModalInstance.dismiss('Canceled');
    };
  }) // end customDialogCtrl
.config(function(dialogsProvider){
    // this provider is only available in the 4.0.0+ versions of angular-dialog-service
    dialogsProvider.useBackdrop(true);
    dialogsProvider.useEscClose(true);
    dialogsProvider.useCopy(false);
    dialogsProvider.setSize('sm');
  }) // end config

;