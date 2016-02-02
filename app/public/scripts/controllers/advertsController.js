'use strict';
 (function () {
angular
  .module('timeShareApp')
 .controller('advertsController' , advertsController);
 advertsController.$inject = ['$scope', '$http'];

function advertsController($scope, $http) {

  //unsort default view
        var refresh = function () {
            $http.get('/api/adverts').success(function (response) {
                console.log("I got the data I requested");
                $scope.adverts = response;
                $scope.totalItems = $scope.adverts.length;
                $scope.currentPage = 1;
                $scope.itemsPerPage = 5;
                $scope.maxSize = 3; //Number of pager buttons to show
                console.log($scope.adverts);
                $scope.advert = "";
            });
        };
        refresh();

//regions/categories lists in select form         
        $scope.region = {
            regionOptions: [
                {regions: 'auvergne-rhone-alpes'},
                {regions: 'bretagne'},
                {regions: 'bourgogne-franche-comte'},
                {regions: 'centre-val-de-loire'},
                {regions: 'corse'},
                {regions: 'grand-est'},
                {regions: 'ile-de-france'},
                {regions: 'nord'},
                {regions: 'normandie'},
                {regions: 'pays-de-la-loire'},
                {regions: 'paca'},
                {regions: 'sud-ouest-atlantique'}
            ]};
        $scope.category = {
            catOptions: [
                {categories: 'aidePersonne'},
                {categories: 'beauté'},
                {categories: 'bricolage'},
                {categories: 'demenagement'},
                {categories: 'cours'},
                {categories: 'loisirs'},
                {categories: 'maison'},
                {categories: 'mecanique'},
                {categories: 'transport'},
                {categories: 'travail'}
            ]};


        $scope.searchAdvert = function (advert) {
            //pagination parameters
            $scope.totalItems = $scope.adverts.length;
            $scope.currentPage = 1;
            $scope.itemsPerPage = 5;
            $scope.maxSize = 3;
            if ((advert.type !== 'offre' && advert.type !== 'demande') && advert.regions === undefined && advert.categories === undefined) {
                $http.get('/api/adverts').success(function (response) {
                    console.log("I got all");
                    $scope.adverts = response;
                    console.log('all type', $scope.adverts)
                });
            } else if ((advert.type === 'offre' || advert.type === 'demande') && advert.regions !== undefined && advert.categories === undefined) {
                $http.get('/api/adverts/searchTypeRegion/' + advert.type + '/' + advert.regions).success(function (response) {
                    $scope.adverts = response;
                    console.log('le type', advert.type)
                    console.log('la region', advert.regions)
                    console.log("pas de cat");
//                    $scope.advert = "";
                })/*.error(function(status){
                 if(status === 404)
                 $location.path('/api/adverts/searchRegion/'+ advert.regions);
                 })*/;
            } else if (advert.type !== undefined && advert.regions === undefined && advert.categories !== undefined) {
                $http.get('/api/adverts/searchTypeCat/' + advert.type + '/' + advert.categories).success(function (response) {
                    $scope.adverts = response;
                    console.log('le type', advert.type)
                    console.log('la cat', advert.categories)
                    console.log("pas de region");
                });
            } else if (advert.type === undefined && advert.regions !== undefined && advert.categories !== undefined) {
                $http.get('/api/adverts/searchRegionCat/' + advert.regions + '/' + advert.categories).success(function (response) {
                    $scope.adverts = response;
                    console.log('la region', advert.regions)
                    console.log('la cat', advert.categories)
                    console.log("pas de type");
                });
            } else if ((advert.type !== undefined && advert.type !== '') && advert.regions === undefined && advert.categories === undefined) {
                $http.get('/api/adverts/searchType/' + advert.type).success(function (response) {
                    $scope.adverts = response;
                    console.log('le type', advert.type)
                    console.log('pas de cat')
                    console.log("pas de region");
                });
            } else if (advert.type === undefined && advert.regions !== undefined && advert.categories === undefined) {
                $http.get('/api/adverts/searchRegion/' + advert.regions).success(function (response) {
                    $scope.adverts = response;
                    console.log('la region', advert.regions);
                    console.log('pas de cat');
                    console.log("pas de type");
                });
            } else if (advert.type === undefined && advert.regions === undefined && advert.categories !== undefined) {
                $http.get('/api/adverts/searchCat/' + advert.categories).success(function (response) {
                    $scope.adverts = response;
                    console.log('la cat', advert.categories)
                    console.log('pas de type')
                    console.log("pas de region");
                });
            } else if (advert.type !== undefined && advert.regions !== undefined && advert.categories !== undefined) {
                $http.get('/api/adverts/searchAll/' + advert.type + '/' + advert.regions + '/' + advert.categories).success(function (response) {
                    $scope.adverts = response;
//                    
                    console.log('le type', advert.type);
                    console.log('la region', advert.regions);
                    console.log('la cat', advert.categories);
                    console.log($scope.advert);
                    $scope.advert = "";
                    console.log('vide', $scope.advert);
                });
            }
            ;
        };

//pagination
        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.pageChanged = function () {
            console.log('Page changed to: ' + $scope.currentPage);
        };

        $scope.setItemsPerPage = function (num) {
            $scope.itemsPerPage = num;
            $scope.currentPage = 1; //reset to first paghe
        }
               
    };

})();