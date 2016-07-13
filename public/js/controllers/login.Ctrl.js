(function() {
  'use strict';

  angular
    .module('app')
    .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ["$scope", "Auth", "$state", "$cookies"];

    function LoginCtrl($scope, Auth, $state, $cookies) {
    	$scope.error = false;

    	// in login.html ng-submit = login()
    	// use ng-model to reference
    	$scope.login = function() {
    		var user = {
    			username: $scope.username,
    			password: $scope.password
    		}

    		Auth.login(user)
    		.success(function(data) {
    			console.log("log in successful");
    			//track user by cookies
    			$cookies.put("user", data.user.username); // will hold username of user that just logged in
    			$cookies.put("userId", data.user_id); // user_id assigned automatically to each user in mongodb
    			$state.go("add") // send the user to the add page
    		})
    		.error(function() {
    			console.log("Error loggin in");
    			$scope.error = true;
    			$scope.errorMessage = "Someting went wrong"
    		})
    	}

    }
})();