(function() {
    'use strict';

    angular
        .module('app')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ["$scope", "Auth", "Results"];

    function HomeCtrl($scope, Auth, Results) {
        $scope.site = []; // create an array to be filled - referenced in home.html by <li ng-repeat="(key, value) in site">

        $scope.getResults = function() {
            // define the search text
            var id = {
                searchText: $scope.searchText
            }
            Results.searchResults(id)
                .then(function(data) {
                    console.log(data);
                    $scope.searchText = "";
                    $scope.site = data.data;
                    angular.forEach($scope.site, function(value, key) { //display each of the results
                        console.log(key + ": " + value);
                    });
                });
        }
    }

})();