 'use strict';
 

(function () {
angular
  .module('timeShareApp')
  .controller('formAdvertCtrl' , formAdvertCtrl);
  formAdvertCtrl.$inject = ['$location','authentication'];


 

 
  function formAdvertCtrl($location, authentication, $http) {

        $scope.addAdvert = function() {
            console.log($scope.advert);
            $http.post('/api/adverts', $scope.advert , {

                headers: {
                    Authorization: 'Bearer '+ authentication.getToken()
                }
            }).success(function (response) {
                console.log(response);
//                refresh();
            });
        };
        
        $scope.removeAdvert = function(id) {
            console.log(id);
            $http.delete('/api/adverts/' + id ,{

                headers: {
                    Authorization: 'Bearer '+ authentication.getToken()
                }
            }).success(function(response){
//               refresh(); 
            }); 
        };
        
        $scope.editAdvert = function(id){
            console.log(id);
            $http.get('/api/adverts/'+ id, {

                headers: {
                    Authorization: 'Bearer '+ authentication.getToken()
                }
            }).success(function(response){
               $scope.advert = response; 
            });
        };

        $scope.updateAdvert = function(){
            console.log($scope.advert._id, {

                headers: {
                    Authorization: 'Bearer '+ authentication.getToken()
                }
            });
            $http.put('/api/adverts/'+ $scope.advert._id, $scope.advert).success(function(response){
//                refresh(); 
            });
        };
        
        $scope.deselect = function(){
            $scope.advert = "";
        };
}


})();