'use strict';

angular.module('timeShareApp')

.controller('replyToAdController', ['$scope', 'authentication', '$location', '$routeParams', '$http', function($scope, authentication, $location, $routeParams, $http) {

    if (!authentication.isLoggedIn()) {
        $location.path('/login');
    }
    console.log('advertId:', $routeParams._id);
    $http.get('/api/adverts/replyToAd/' + $routeParams._id).success(function(response) {
        $scope.advert = response;
    });


    $scope.returnPage = $location.search().page || '/';

    $scope.addReply = function() {
        $scope.reply.work_date = $scope.work_date;
        $scope.reply.author = authentication.currentUser().firstname;
        $scope.reply.author_id = authentication.currentUser()._id;
        $scope.reply.toAdId = $routeParams._id;
        $scope.reply.toAd_author = $scope.advert.author_id;
        $http.post('/api/replies', $scope.reply).success(function(response) {
            $scope.reply = response;
            //                    $scope.reply = "";
        }).then(function() { // returns a promise
            var reply = $scope.reply;
            console.log('IdReply: ', reply);
            $scope.advert.replies = reply;
            $http.put('/api/adverts/replies/' + $scope.advert._id, $scope.advert).success(function() {
                console.log('IdAdvet: ', $scope.advert);
                console.log('IdReply: ', reply);
                $scope.reply = "";
                console.log('ReplySCOPR: ', $scope.reply);
                $location.path($scope.returnPage);
            });
        });
    };

    $scope.removeReply = function(id) {
        console.log(id);
        $http.delete('/api/replies/' + id).success(function(response) {
            //               refresh(); 
        });
    };

    $scope.editReply = function(id) {
        console.log(id);
        $http.get('/api/replies/' + id).success(function(response) {
            $scope.reply = response;
        });
    };

    $scope.updateReply = function() {
        console.log($scope.reply._id);
        $http.put('/api/replies/' + $scope.reply._id, $scope.reply).success(function(response) {
            //                refresh(); 
        });
    };

    $scope.deselect = function() {
        $scope.reply = "";
    };

    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function() {
        $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    };

    $scope.toggleMin = function() {
        $scope.minDate = $scope.minDate ? null : new Date();
    };

    $scope.toggleMin();
    $scope.maxDate = new Date(2020, 5, 22);

    $scope.open1 = function() {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function() {
        $scope.popup2.opened = true;
    };

    $scope.setDate = function(year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [{
        date: tomorrow,
        status: 'full'
    }, {
        date: afterTomorrow,
        status: 'partially'
    }];

    $scope.getDayClass = function(date, mode) {
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }
}]);
