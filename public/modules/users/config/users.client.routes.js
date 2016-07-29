'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('login', {
			url: '/login',
			views: {
				'usersPopups': {
					 templateUrl: siteurl+'/wp-content/plugins/wp-lbb-social/public/modules/users/views/login.view.html',
					 controller: 'login'
				 },
			 },
		}).
		state('signup', {
			url: '/signup',
			views: {
				'usersPopups': {
					 templateUrl: siteurl+'/wp-content/plugins/wp-lbb-social/public/modules/users/views/signupSelect.view.html',
					 controller: 'login'
				 },
			 },
		}).
		state('signup-form', {
			url: '/signup-form',
			views: {
				'usersPopups': {
					 templateUrl: siteurl+'/wp-content/plugins/wp-lbb-social/public/modules/users/views/signupForm.view.html',
					 controller: 'signupFormWithEmail.controller'
				 },
			 },
		}).
		state('signup-success', {
			url: '/signup-success',
			views: {
				'usersPopups': {
					 templateUrl: siteurl+'/wp-content/plugins/wp-lbb-social/public/modules/users/views/signupSuccess.view.html',
					 controller: 'signupFormWithEmail.controller'
				 },
			 },
		}).
		state('forgotPassword', {
			url: '/forgotPassword',
			views: {
				'usersPopups': {
					 templateUrl: siteurl+'/wp-content/plugins/wp-lbb-social/public/modules/users/views/forgot.view.html',
					 controller: 'forgot.controller'
				 },
			 },
		}).
		state('forgotPasswordSuccess', {
			url: '/forgotPasswordSuccess',
			views: {
				'usersPopups': {
					 templateUrl: siteurl+'/wp-content/plugins/wp-lbb-social/public/modules/users/views/forgotSuccess.view.html',
					 controller: 'forgot.controller'
				 },
			 },
		}).
		state('loginSuccess', {
			url: '/loginSuccess',
			views: {
				'usersPopups': {
					 templateUrl: siteurl+'/wp-content/plugins/wp-lbb-social/public/modules/users/views/loginSuccess.view.html',
					 controller: 'login'
				 },
			 },
		}).
		state('addToLbb', {
			url: '/addToLbb',
			views: {
				'usersPopups': {
					 templateUrl: siteurl+'/wp-content/plugins/wp-lbb-social/public/modules/users/views/bookmarkSuccess.view.html',
					 controller: 'login'
				 },
			 },
		}).
		state('#', {
			url: '/#',
			views: {
				'#': {
					 templateUrl: '',
					 controller: 'login'
				 },
			 },
		})
	}
]);
