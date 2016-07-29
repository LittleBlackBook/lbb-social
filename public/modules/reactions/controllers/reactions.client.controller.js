'use strict';

var articleurl = "reactions/articles/slug/";
//var app = angular.module('lbbApp',[]);
angular.module('reactions').controller('ReactionsController', ['$scope', '$http','$cookies','$sce','$state','$rootScope',
	function($scope, $http,$cookies,$sce,$state,$rootScope) {
		$rootScope.userReaction = '';
		$scope.firstReacnt      = '';
		$scope.firstReacnttext  = '';
		$rootScope.actualReaction  = '';
		$rootScope.reactionsIcons   = [
																		{ name : "love", value: "love",icon: '<i class="smiles-HeartEmoji-01"><span class="path1"></span><span class="path2"></span></i>'},
																		{ name : "excited!", value: "excited",icon:'<i class="smiles-ExcitedEmoji-02"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span></i>'},
																		{ name : "fail", value: "fail",icon: '<i class="smiles-PoopEmoji-04"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span></i>'},
																		{ name : "been there", value: "been_there",icon: '<i class="smiles-BeenThereEmoji-03"><span class="path1"></span><span class="path2"></span><span class="path3"></span></i>'}];
		$rootScope.popularReactions = {"love": '<i class="smiles-HeartEmoji-01"><span class="path1"></span><span class="path2"></span></i>',
																	 "excited": '<i class="smiles-ExcitedEmoji-02"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span></i>',
																	 "fail": '<i class="smiles-PoopEmoji-04"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span></i>',
																	 "been_there": '<i class="smiles-BeenThereEmoji-03"><span class="path1"></span><span class="path2"></span><span class="path3"></span></i>'};


		if(post_slug){
			$rootScope.loadReactions = function(){
				$http({
					url: wnm_mandrin_url.mandrin_url + articleurl +blog_url+'/'+post_slug,
					method: "GET",
					data: "",
					async:true,
				}).success(function(response){
					 $scope._id = response._id;
					 $scope.loading = false;

					 $rootScope.actualReaction = response;

					 refreshReaction($rootScope.actualReaction, response)

					 if($cookies["articleurl"]){
		 					if(response.userReaction){
		 						var method = 'PUT'
		 					}
		 					else{
		 						var method = 'POST'
		 					}
							angular.element(".tst_div").removeClass("react-overlay");
							angular.element("#reaction-list").removeClass("reaction-list-active");
		 				  $http({
		 					  url: $cookies["articleurl"],
		 					  headers: {
		 						  'Content-Type': 'application/x-www-form-urlencoded',
		 					  },
								async:true,
		 					  method: method,
		 					  data: $cookies["reaction"],
		 				   }).success(function(response){
								if($cookies["articleurl"]){
								  viewToast("Nice! Your reaction was added");
							  }

								if(!$rootScope.actualReaction)
									$rootScope.actualReaction = response

								refreshReaction($rootScope.actualReaction, response)

								$cookies["articleurl"] = "";
								$cookies["reaction"] = "";
							}).error(function(error){
								$scope.loading = false;
								$state.go("/");
								if(error == "" || error == "null" || error == null){
									viewToast("Oops! Something went wrong, try again");
								}else{
									if(error.message == "Unauthorized"){
										var user_cookie = Cookies.getJSON('user'); // => { foo: 'bar' }
										Cookies.remove('user');
										window.user = null;
										setNavBar();
									}else{
										viewToast("Oops! Something went wrong, try again");
									}
								}
							});
	 			   }
				}).error(function(error){
					if($cookies["articleurl"]){
						$cookies["articleurl"] = "";
						$cookies["reaction"] = "";
						angular.element(".tst_div").removeClass("react-overlay");
						angular.element("#reaction-list").removeClass("reaction-list-active");
						$scope.loading = false;
						if(error == "" || error == "null" || error == null){
							viewToast("Oops! Something went wrong, try again");
						}else{
							if(error.message == "Unauthorized"){
								var user_cookie = Cookies.getJSON('user'); // => { foo: 'bar' }
								Cookies.remove('user');
								window.user = null;
								setNavBar();
						  }else{
								viewToast("Oops! Something went wrong, try again");
							}
						}
				  }
				});
			}
	  }

	  function setTopReaction(reactions){
	  	if(reactions.length){
		  	var sortedList = reactions.sort(function(a, b){
		  		if(a.count< b.count)
		  			return true
				});

		  	$rootScope.allReaction  = sortedList.slice(0, 3);
		  }
		  else
		  	$rootScope.allReaction = []
	  }

	  function refreshReaction(actualReaction, tempReaction){
			if(typeof tempReaction.userReaction === "undefined"){
				if(actualReaction.reactions){
				  setTopReaction(actualReaction.reactions.list)
				  $rootScope.reactionTotal = actualReaction.reactions.total == 0 ? "" : actualReaction.reactions.total;
			  }


				$rootScope.userReaction    = "";
				angular.element('#reactBtn').removeClass("sendrctn");
			}else{

				$rootScope.userReaction       = tempReaction.userReaction
				/* Update reactionsIcons*/
				if(tempReaction.userReaction.reaction.length){
					angular.element('#reactBtn').addClass("sendrctn");
					angular.forEach($rootScope.reactionsIcons, function(reaction){
						reaction.selected = false;
						if(tempReaction.userReaction.reaction.indexOf(reaction.value) > -1){
							reaction.selected = true;
						}
						if(reaction.value == tempReaction.userReaction.reaction[0])
						{
							$scope.firstReacnt = reaction.icon;
							$scope.firstReacnttext = reaction.name;
						}
					})
					$rootScope.userReactionTotal  = $scope.firstReacnt;
					$rootScope.userReactiontext   = $scope.firstReacnttext;

					var newReactionList = JSON.parse(JSON.stringify(actualReaction.reactions.list));
					angular.forEach(tempReaction.userReaction.reaction, function(uReaction){

						var oldReaction = false;

						if(actualReaction.userReaction && actualReaction.userReaction.reaction.length){


							if(actualReaction.userReaction.reaction.indexOf(uReaction) > -1){
								oldReaction = true
							}
						}

						var foundInList = '';
						angular.forEach(newReactionList, function(reaction){
							if(reaction.name == uReaction){
								foundInList = reaction
							}
						})

						if(foundInList && oldReaction){
						}
						else if(foundInList && !oldReaction){

							for(var i=0; i<newReactionList.length; i++){
								if(newReactionList[i].name == foundInList.name){
									newReactionList[i].count++;
								}
							}
						}
						else{
							newReactionList.push({'name': uReaction,'count': 1})
						}
					})

					var tempList = JSON.parse(JSON.stringify(newReactionList));

					if(actualReaction.userReaction){
						angular.forEach(actualReaction.userReaction.reaction, function(uReaction){

							var newReaction = false;

							if(tempReaction.userReaction && tempReaction.userReaction.reaction.length){

								if(tempReaction.userReaction.reaction.indexOf(uReaction) > -1){
									newReaction = true
								}
							}

							var foundInList = '';
							angular.forEach(tempList, function(reaction){
								if(reaction.name == uReaction){
									foundInList = reaction
								}
							})

							if(foundInList && !newReaction){

								for(var i=0; i<tempList.length; i++){
									if(tempList[i].name == foundInList.name){
										tempList[i].delete = true;
									}
								}
							}
						})
					}

					var finalList  = [];
					for(var i=0; i<tempList.length; i++){
						if(!tempList[i].delete){
							finalList.push(tempList[i])
						}
					}

					setTopReaction(finalList)

					if(actualReaction.userReaction && actualReaction.userReaction.reaction.length){
						$rootScope.reactionTotal = actualReaction.reactions.total == 0 ? "" : actualReaction.reactions.total;
					}
					else{
						if($rootScope.reactionTotal > 0){
							$rootScope.reactionTotal = actualReaction.reactions.total == 0 ? "" : actualReaction.reactions.total
							$rootScope.reactionTotal++
						}
						else{
							$rootScope.reactionTotal = 1
						}
					}
				}
				else {
				  angular.element('#reactBtn').removeClass("sendrctn");
					$rootScope.userReactionTotal = $scope.firstReacnt = '';
					$rootScope.userReactiontext   = $scope.firstReacnttext  = '';
					angular.forEach($rootScope.reactionsIcons, function(reaction){
						reaction.selected = false;
					})

					if(actualReaction.userReaction && actualReaction.userReaction.reaction.length){

						var newReactionList = []
						if(actualReaction.reactions.list.length){

							angular.forEach(actualReaction.reactions.list, function(reaction){

								if(actualReaction.userReaction.reaction.indexOf(reaction.name) > -1){
									if(reaction.count > 1){
										reaction.count--
										newReactionList.push(reaction)
									}
								}
								else{
									newReactionList.push(reaction)
								}
							})
						}

						setTopReaction(newReactionList)

						if($rootScope.reactionTotal > 0){

							$rootScope.reactionTotal = actualReaction.reactions.total == 0 ? "" : actualReaction.reactions.total
							$rootScope.reactionTotal--
						}
						else{
							$rootScope.reactionTotal = ''
						}
					}
					else{
						setTopReaction(actualReaction.reactions.list)
						$rootScope.reactionTotal = actualReaction.reactions.total == 0 ? "" : actualReaction.reactions.total;
					}
				}
			}
	  }

		$scope.checkSeleted = function(){
      $scope.seletedReactions = 0;
			angular.forEach($rootScope.reactionsIcons, function(reaction){
        if(reaction.selected){
				  $scope.seletedReactions++;
			  }
				if($scope.seletedReactions > 0){
					angular.element('#reactBtn').addClass("sendrctn");
				}else{
					angular.element('#reactBtn').removeClass("sendrctn");
				}
			})
		}

    $scope.openReactionsForm = function(event) {
			angular.element(".tst_div").addClass("react-overlay");
		  angular.element("#reaction-list").addClass("reaction-list-active");
		}

		$scope.openReactionsFormClose= function(event) {
			angular.element(".tst_div").removeClass("react-overlay");
		  $state.go("/");
		  angular.element("#reaction-list").removeClass("reaction-list-active");
			if($cookies["user"]){
			  $rootScope.loadReactions();
			}
		}

		$scope.openReactionsOverlayClose= function(event) {
			angular.element(".tst_div").removeClass("react-overlay");
		  angular.element("#reaction-list").removeClass("reaction-list-active");
		}

		$scope.changeClass = function(item) {
			$scope.selected = item;
		}

		$scope.isActive = function(item) {
			return $scope.selected === item;
		};

		$scope.SubmitReactions = function(event,type) {
			$rootScope.reactions = [];
			angular.forEach($rootScope.reactionsIcons, function(reaction){
				if(reaction.selected) $rootScope.reactions.push(reaction.value);
			})
			var dataaaa = $.param({"reaction": $rootScope.reactions});

			$cookies["reaction"] = dataaaa;
			$cookies["articleurl"] = wnm_mandrin_url.mandrin_url + articleurl +blog_url+'/'+post_slug;
			if(!$cookies["user"]){
				if(type == "done"){
				  $state.go("signup");
			  }
			}else{
				angular.element(".tst_div").removeClass("react-overlay");
				angular.element("#reaction-list").removeClass("reaction-list-active");

				if($rootScope.userReaction){
					var method = 'PUT'
				}
				else{
					var method = 'POST'
				}
				$http({
					url: wnm_mandrin_url.mandrin_url + articleurl +blog_url+'/'+post_slug,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					async:true,
					method: method,
					data: dataaaa,
				}).success(function(response){

					$cookies["articleurl"] = "";
					$cookies["reaction"] = "";
					viewToast("Nice! Your reaction was added");

					if(!$rootScope.actualReaction)
						$rootScope.actualReaction = response

					refreshReaction($rootScope.actualReaction, response)

					$scope.loading = false;
				}).error(function(error){
					$scope.loading = false;
					if(error == "" || error == "null" || error == null){
						viewToast("Oops! Something went wrong, try again");
					}else{
						if(error.message == "Unauthorized"){
							var user_cookie = Cookies.getJSON('user'); // => { foo: 'bar' }
							Cookies.remove('user');
							window.user = null;
							setNavBar();
              $rootScope.userReaction    = "";

							$state.go("signup");
					  }else{
						  viewToast("Oops! Something went wrong, try again");
				  	}
					  }
				});
			}
			return false;
		};
	}
]).directive('compile', ['$compile', function ($compile) {
  return function(scope, element, attrs) {
    scope.$watch(
        function(scope) {
            return scope.$eval(attrs.compile);
        },
        function(value) {
            element.html(value);
            $compile(element.contents())(scope);
        }
    );
  };
}])
