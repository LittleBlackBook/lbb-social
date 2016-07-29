'use strict';

//Setting up route
angular.module('reactions').config(config).run(run);

function config($stateProvider, $httpProvider) {
	// Answers state routing
	$stateProvider.
	state('reactionForm', {
		url: '/reactionForm',
		views: {
			'reactionForm': {
				 templateUrl: siteurl+'/wp-content/plugins/wp-lbb-social/public/modules/reactions/views/reaction.client.view.html',
				 controller: 'ReactionsController'
			 },
		 },
	}).
	state('/', {
		url: '/',
		views: {
			'/': {
				 templateUrl: '',
				 controller: 'ReactionsController'
			 },
		 },
	})
	//$httpProvider.defaults.headers.post = {};
	$httpProvider.defaults.headers.put = {};
	//$httpProvider.defaults.headers.common = {};
	//$httpProvider.defaults.headers.patch = {};
}

function run($http, $rootScope, $window, $anchorScroll) {
	$http.defaults.withCredentials = true;
	//$http.defaults.headers.post["Content-Type"] = "application/json";
}
