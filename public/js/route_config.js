(function() {
	"use strict";

	angular
		.module("app")
		.config(config)  // need to declare config
		.run(run);		// need to declare a run

		// declare what will be injected into config and run methods
		config.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider"];
		run.$inject = ["$rootScope", "$state", "Auth"];


		// declare config function, in parameters need to inject everything fron $injector	
		function config($stateProvider, $urlRouterProvider, $locationProvider) {
			// declare states
	      $stateProvider
	        .state('home', {
	          url: '/',
	          templateUrl: 'partials/home.html',
	          controller: 'HomeCtrl'
	        })
	        .state('login', {
	          url: '/login',
	          templateUrl: 'partials/login.html',
	          controller: 'LoginCtrl'
	        })
	        .state('register', {
	          url: '/register',
	          templateUrl: 'partials/register.html',
	          controller: 'RegisterCtrl'
	        })
	        .state('add', {
	          url: '/add',
	          templateUrl: 'partials/addSite.html',
	          controller: 'AddSiteCtrl',
	          restricted: true
	        });
	        $urlRouterProvider.otherwise('/');
	        $locationProvider.html5Mode(true);
	    }

		function run($rootScope, $state, Auth) {
			// what we are going to declare to protect our routes
			// evertime we navigate from one route to anotehr it will see if what
			// we set inside the function is true or false
			$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {	
				if(toState.restricted && Auth.isLoggedIn() === false) {
					// checks if the user is logged in and if not send them somewhere else
					$state.go('login'); // sends them to the login state
					event.preventDefault(); // prevent default actions when users are clicking on links
				}
			})
		}
})();