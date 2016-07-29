'use strict';

// Open Login form controller
angular.module('users').controller('login', ['$scope', '$http','$state','$cookies','$rootScope',
	function($scope,  $http, $state,$cookies,$rootScope) {

		$scope.checkLogin = function () {
      apiCheckLoginStatus(onLogin);
		}
		$scope.init = function () {
      $("#modal-container").fadeIn(10, function(){
				$("#modal-container").addClass("modal-active");
			});
		}
		$rootScope.btn_loginn = function(){
			ga('send', 'event', 'Login', 'Click', 'Header');
			$state.go("login");
	  };

		$scope.btn_signupss = function(){
			$state.go("signup");
			$rootScope.signupBookmark = false;
	  };

		$scope.api_logout = function(event) {
			var user_cookie = Cookies.getJSON('user'); // => { foo: 'bar' }
			Cookies.remove('user');
			window.user = null;
			angular.forEach($rootScope.reactionsIcons, function(reaction){
        reaction.selected = false;
			})
			$rootScope.userReaction = "";
			angular.element('#reactBtn').removeClass("sendrctn");
			var url = wnm_mandrin_url.mandrin_url + 'auth/web/signout';
			var win = window.open(url, '_blank');
			onLogout(null);
		};

		function onLogout(err) {
			var user = window.user;
			if (!err) {
				ga('send', 'event', 'Logout', 'Success');
				setNavBar(user);
				//setWigzo(user);
				setGA(user);
				checkBookmarkState();
			}
    }


		/*$scope.init = function () {
      $("#modal-container").fadeIn(10, function(){
				$("#modal-container").addClass("modal-active");
			});
		}*/



		$scope.submitForm = function(){
      var email    = $scope.user_email;
      var password = $scope.user_pwd;
      $scope.errorEmail = "";
      $scope.errorPassword = "";
      $scope.errorName = "";
      if(email == ""){
			  $scope.errorEmail = "Please enter an email address.";
			}
			else if (!mailformat.test(email)) {
				$scope.errorEmail = 'Please check the email format';
			}
			else if (password.length === 0) {
				$scope.errorPassword = 'Please enter your password';
			}
			else if (password.length < 7) {
				$scope.errorPassword = 'This password is too short, must be at least 7 characters';
			}else{
		  $scope.loading = true;
		  window.data = {
			  username: email,
			  email: email,
			  password: password,
			  city: lbb_city
		  };
			$http({
			url: wnm_mandrin_url.mandrin_url + 'auth/signin',
			method: 'POST',
			data: $.param(window.data),
			async:true,
			xhrFields: {
				withCredentials: true
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			}).success(function(response){
				  $scope.loading = false;
					var user_cookie = Cookies.set('user', data, {
					  expires: 1
				  });
					/*if(window.signupBookmark){
            $state.go("addToLbb");
					}else{*/
					  $state.go("loginSuccess");
					//}
			}).error(function(error){
				$scope.loading = false;
				if(error == "" || error == "null" || error == null){
				  $scope.errorName = "Oops! Something went wrong, try again";
			  }else{
					$scope.errorName = error.message;
			  }
			});
		}
      return false;
    }
    //Close the pop up
		$scope.close = function(){
			$state.go("/");
      return false;
    };

		//Close the pop up
		$scope.close_bookmark = function(){
			$state.go("/");
      return false;
    };

		$rootScope.forgot_form = function(){
			$state.go("forgotPassword");
	  };


    //Close the pop up
    $scope.lgs_submit = function(){
			if(window.data){
	      var param = {
	        username: window.data.email,
	        password: window.data.password,
	        city: lbb_city
	      };
	      $state.go("/");
	      $scope.OpenWindowWithPost(wnm_mandrin_url.mandrin_url + "auth/web/signin",
	        "width=730,height=345,left=100,top=100,resizable=yes,scrollbars=yes",
	        "Login", param);
	      api_submit_check_recur(null, onLogin);
				window.signupBookmark = false;
		  }else{
			  $state.go("/");
		  }
    }

    $scope.OpenWindowWithPost = function(url, windowoption, name, params){
			if($cookies["articleurl"] != ""){
        $rootScope.loadReactions();
       }
      var form = document.createElement("form");
      form.setAttribute("method", "post");
      form.setAttribute("action", url);
      form.setAttribute("target", name);

      for (var i in params) {
        if (params.hasOwnProperty(i)) {
          var input = document.createElement('input');
          input.type = 'hidden';
          input.name = i;
          input.value = params[i];
          form.appendChild(input);
        }
      }

      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);
    }

    function api_submit_check_recur(val, cb){
      if (!cb) cb = function() {};
      if (!val) val = 1;

      if (!apiCheckLoginStatus(cb) && val < 15) {
				var user_cookie = Cookies.getJSON('user');
				if(!user_cookie){
		      val++;
		      setTimeout(function() { api_submit_check_recur(val, cb) }, 2000);
        }
	    }
    }

    function apiCheckLoginStatus(callback){
      var user_cookie = Cookies.getJSON('user'); // => { foo: 'bar' }

        $http({
        url: wnm_mandrin_url.mandrin_url + 'users/me',
        method: 'GET',
        async:true,
        xhrFields: {
          withCredentials: true
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        }).success(function(response){
          var user_cookie = Cookies.set('user', response, { expires: 1 });
          window.user = response;
          if (!window._api) window._api = {};
          window._api.user = window.user;

					window.user = user_cookie;
	        if (!window._api) window._api = {};
	        window._api.user = window.user;
	        callback(null, user_cookie);

          return callback(null, response);
        }).error(function(textStatus, errorThrown){
					var user_cookie = Cookies.getJSON('user'); // => { foo: 'bar' }
					Cookies.remove('user');
					window.user = null;
					setNavBar();
          callback(errorThrown);
          return false;
        });
    }

    function onLogin(err, user){
      if (!err) {
        ga('send', 'event', 'Login', 'Success');
        //DO what after login +
        //Remove Loader and show message
        //console.log("login success");
        angular.element("#loader").hide();
        angular.element(modal).hide(function() {
          angular.element(modal).removeClass('modal-active');
          hideCaret();
        });
        angular.element(modal).empty();
        setNavBar(user);
        //setWigzo(user);
        setGA(user);
        checkBookmarkState('');
        bookmarkedQueued(user);

      } else {
        angular.element("#loader").hide();
      }
    }

		function checkBookmarkState(cb) {
			if (!cb) cb = function() {};
			var bookmarkStateButtons = $('.bookmark-button');
			if (!window.user) {
				bookmarkStateButtons.removeClass('bookmark-active active');
				$('.bookmark-button > span').text('ADD TO LBB');
				$('.left-share-decs > span.addToLbbText').text('ADD TO LBB');
				return cb({ err: "No USER" });
			}
			//	if(single)
			apiGetBookmarkState(elements[0], elements[1], function(err, data) {
				//consol
				if (!err && data) {
					if (data.bookmark == "1") {
						if (!window._api) window._api = {};
						window._api.bookmark = 1;
						bookmarkStateButtons.addClass('bookmark-active active');
						$('.bookmark-button > span').text('ADDED');
            $('.left-share-decs > span.addToLbbText').text('ADDED');
						cb(null, true);
					} else {
						bookmarkStateButtons.removeClass('bookmark-active active');
						$('.bookmark-button > span').text('ADD TO LBB');
						$('.left-share-decs > span.addToLbbText').text('ADD TO LBB');
						cb(null, false);
					}
				} else {
					bookmarkStateButtons.removeClass('bookmark-active active');
					$('.bookmark-button > span').text('ADD TO LBB');
					$('.left-share-decs > span.addToLbbText').text('ADD TO LBB');
					cb(err || { err: "NoData" });
				}
			});

		}

		function apiGetAllBookmarks(cb) {
			apiRequest('bookmarks', 'GET', cb);
		}

		function apiGetBookmarkState(provider, slug, cb) {
			if(slug){
			apiRequest('bookmarks/articles/slug/' + provider + '/' + slug ,'GET', cb);
			//apiRequest('bookmarks/articles/slug/delhi/qubitos-the-terrace-cafe-rajouri-garden/', 'GET', cb);
		  }
		}

		function apiSetBookmarkState(provider, slug, cb) {
			var query = "?";
			if (window._api.signup)
				query += "email=1";
				if(slug){
			apiRequest('bookmarks/articles/slug/' + provider + '/' + slug + query, 'POST', cb);
		}
			//apiRequest('bookmarks/articles/slug/delhi/qubitos-the-terrace-cafe-rajouri-garden/', 'POST', cb);
		}

		function apiUnsetBookmarkState(provider, slug, cb) {
			if(slug){
			apiRequest('bookmarks/articles/slug/' + provider + '/' + slug, 'DELETE', cb);
		}
			//apiRequest('bookmarks/articles/slug/delhi/qubitos-the-terrace-cafe-rajouri-garden/', 'DELETE', cb);
		}

		function apiRequest(url, type, cb) {
		/*	alert(url);
			alert(type);
			alert(cb);*/

			if (!cb) cb = function() {};

			$http({
			url: wnm_mandrin_url.mandrin_url + url,
			method: type,
			async:true,
			data: "",
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			}).success(function(data){
				 cb(null, data)
			}).error(function(textStatus, errorThrown){
				if(type != "GET")
				viewToast("Oops! Something went wrong, try again");
				cb(errorThrown)
			});

		}

		function bookmarkedQueued() {
			if(window._api.bookmarkQueue){
			window._api.bookmarkQueue.forEach(function(val, ind) {
				UICallBookmarkAction1.apply(this, val);
			})
		  }

		}

		function UICallBookmarkAction(bookmarkStateButtons, elements) {
			//if(single)
			if (!window._api.bookmark) {
				apiSetBookmarkState(elements[0], elements[1], function(err) {
					if (!err) {
						window._api.bookmark = 1;
						bookmarkStateButtons.addClass('bookmark-active active');
						$('.bookmark-button > span').text('ADDED');
						$('.left-share-decs > span.addToLbbText').text('ADDED');
						viewToast("Bookmark Added");
						ga('send','event','AddToLBB','added');
					}
				});
				window._api.bookmarkQueue = "";
			} else {
				apiUnsetBookmarkState(elements[0], elements[1], function(err) {
					if (!err) {
						window._api.bookmark = 0;
						bookmarkStateButtons.removeClass('bookmark-active active');
						$('.bookmark-button > span').text('ADD TO LBB');
						$('.left-share-decs > span.addToLbbText').text('ADD TO LBB');
						viewToast("Bookmark Removed");
						ga('send','event','AddToLBB','removed');
					}
				});
				window._api.bookmarkQueue = "";
			}
		}

		function UICallBookmarkAction1(bookmarkStateButtons, elements) {
       if(!window._api.bookmark){
				apiSetBookmarkState(elements[0], elements[1], function(err) {
					if (!err) {
						window._api.bookmark = 1;
						bookmarkStateButtons.addClass('bookmark-active active');
						$('.bookmark-button > span').text('ADDED');
						$('.left-share-decs > span.addToLbbText').text('ADDED');
						viewToast("Bookmark Added");
						ga('send','event','AddToLBB','added');
					}
				});
			  }
				window._api.bookmarkQueue = "";
		}

		$scope.btn_signupss_form = function(){
			ga('send', 'event', 'SignUp', 'Click', 'Header');
			$state.go("/");
			$state.go("signup-form");
	  };

		$scope.signupBookmarkForm = function(){
			ga('send','event','AddToLBB','click');
			var bookmarkStateButtons = $('.bookmark-button');

			if ($cookies["user"]) {
				UICallBookmarkAction(bookmarkStateButtons, elements)
			} else {
      if(!window._api.bookmarkQueue){
				window._api.bookmarkQueue = [];
			}
 				window._api.bookmarkQueue.push([bookmarkStateButtons, elements]);
				//openSignupModal();
			  $state.go("signup");
			  window.signupBookmark = true;
				$rootScope.signupBookmark = true;
			}
			if(!$cookies["user"]){
			  //ga('send', 'event', 'SignUp', 'Click', 'Header');

		  }
    };

		//Close the pop
		$scope.close_signup = function(){
			$state.go("/");
      return false;
    };


		$scope.signup_close_success = function(){
			if(typeof $cookies["articleurl"] === undefined){
				$rootScope.loadReactions();
			 }
			ga('send','event','SignUp','Success');
			var param = {
				username: window.data.email,
				password: window.data.password,
				city: lbb_city
			};
			OpenWindowWithPost(wnm_mandrin_url.mandrin_url + "auth/web/signin",
				"width=730,height=345,left=100,top=100,resizable=yes,scrollbars=yes",
				"Login", param);
			api_submit_check_recur(null, onLogin);
			angular.element(".tst_div").removeClass("react-overlay");
			angular.element("#reaction-list").removeClass("reaction-list-active");
			$state.go("/");
	  };

		//Close the pop
		$scope.closeSignup = function(){
			$state.go("/");
      return false;
    };
	}
]);


// Signup with Email Login form controller
angular.module('users').controller('signupFormWithEmail.controller', ['$scope', '$http','$state','Authentication','$cookies','$rootScope',
	function($scope,  $http, $state,Authentication,$cookies,$rootScope) {

		$scope.init = function () {
      $("#modal-container").fadeIn(10, function(){
				$("#modal-container").addClass("modal-active");
			});
		}

    //Close the pop
		$scope.lg_submit = function(){
      var user_name = $scope.user_name;
      var password  = $scope.user_pwd;
			var email     = $scope.user_email;
      $scope.errorEmail = "";
      $scope.errorPassword = "";
      $scope.errorName = "";
      if(user_name == ""  || typeof user_name === "undefined"){
			  $scope.errorName = "We'd like to know you better.";
			}
			else if(email == ""   || typeof email === "undefined"){
			  $scope.errorEmail = "Please enter an email address.";
			}
			else if (!mailformat.test(email)) {
			  $scope.errorEmail = 'Please check the email format';
		  }
		  else if (password.length === 0) {
			  $scope.errorPassword = 'Please set a password.';
		  }
		  else if (password.length < 7) {
			  $scope.errorPassword = 'Please set a password with at least 7 characters';
		  }else{
			  $scope.loading = true;
			  window.data = {
				  firstName: user_name,
				  email: email,
				  password: password,
				  city: lbb_city
			  };
				$http({
				url: wnm_mandrin_url.mandrin_url + 'auth/web/signup',
				method: 'POST',
				async:true,
				data: $.param(window.data),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				}).success(function(response){
					 ga('send','event','SignUp','EmailSignUp');
					 $scope.loading = false;
					 if(window.signupBookmark){
             $state.go("addToLbb");
 					 }else{
					   $state.go("signup-success");
				   }
				}).error(function(error){
					$scope.loading = false;
					if(error.error){
						$scope.errorAlready = true;
					}else{
					  $scope.all_error = "Oops! Something went wrong, try again";
				  }
				});
			}
      return false;
    };

		//Close the pop
		$scope.close_signup_form = function(){
			$state.go("/");
      return false;
    };
	}
]);


// Open Login form controller
angular.module('users').controller('forgot.controller', ['$scope', '$http','$state','$cookies','$rootScope',
	function($scope,  $http, $state,$cookies,$rootScope) {

		$scope.init = function () {
      $("#modal-container").fadeIn(10, function(){
				$("#modal-container").addClass("modal-active");
			});
		}

		//Close the pop
		$scope.closeforgot = function(){
			$state.go("/");
      return false;
    };

		$scope.fg_submit = function(){
			var email     = $scope.user_email;
      $scope.errorEmail = "";
			if(email == ""   || typeof email === "undefined"){
			  $scope.errorEmail = "Please enter an email address.";
			}
			else if (!mailformat.test(email)) {
			  $scope.errorEmail = 'Please check the email format';
		  }else{
			  $scope.loading = true;
			  window.data = {
				  email: email
			  };
				$http({
				url: wnm_mandrin_url.mandrin_url + 'auth/forgot',
				method: 'POST',
				async:true,
				data: $.param(window.data),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				}).success(function(response){
				   ga('send','event','Login','PasswordRetrieveSuccess');
					 $scope.loading = false;
					 $state.go("/");
					 $state.go("forgotPasswordSuccess");
				}).error(function(error){
					$scope.loading = false;
					/*if(error == "" || error == "null" || error == null){
					  $scope.errorName = "Something Went Wrong";
				  }else if(typeof error.errorName != "undefined"){
						$scope.errorAlready = true;
					}
					else{
						$scope.errorName = error.message;
				  }*/
					$scope.errorName = "Oops! Something went wrong, try again";
				});
			}
      return false;
    };
	}


]);
