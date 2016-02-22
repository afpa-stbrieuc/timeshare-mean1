'use strict';
(function() {
angular
    .module('timeShareApp')
    .controller('advertsController', advertsController);

function advertsController($scope, $http) {

//unsort default view
    var refresh = function() {
        $http.get('/api/adverts').success(function(response) {
            $scope.adverts = response;
            $scope.totalItems = $scope.adverts.length;
            $scope.currentPage = 1;
            $scope.itemsPerPage = 5;
            $scope.maxSize = 4; //Number of pager buttons to show
            $scope.advert = "";
        });
    };
    refresh();

//regions/categories lists in select form         
    $scope.region = {
        regionOptions: [{
            regions: 'auvergne-rhone-alpes'
        }, {
            regions: 'bretagne'
        }, {
            regions: 'bourgogne-franche-comte'
        }, {
            regions: 'centre-val-de-loire'
        }, {
            regions: 'corse'
        }, {
            regions: 'grand-est'
        }, {
            regions: 'ile-de-france'
        }, {
            regions: 'nord'
        }, {
            regions: 'normandie'
        }, {
            regions: 'pays-de-la-loire'
        }, {
            regions: 'paca'
        }, {
            regions: 'sud-ouest-atlantique'
        }]
    };
    $scope.category = {
        catOptions: [{
            categories: 'aidePersonne'
        }, {
            categories: 'beauté'
        }, {
            categories: 'bricolage'
        }, {
            categories: 'demenagement'
        }, {
            categories: 'cours'
        }, {
            categories: 'loisirs'
        }, {
            categories: 'maison'
        }, {
            categories: 'mecanique'
        }, {
            categories: 'transport'
        }, {
            categories: 'travail'
        }]
    };


//pagination
    $scope.setPage = function(pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.pageChanged = function() {
        console.log('Page changed to: ' + $scope.currentPage);
    };
    $scope.setItemsPerPage = function(num) {
        $scope.itemsPerPage = num;
        $scope.currentPage = 1; //reset to first page
//        $scope.maxSize = 1; //Number of pager buttons to show
    };

};

})();