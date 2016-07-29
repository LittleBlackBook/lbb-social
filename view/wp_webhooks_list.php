<script>
var app = angular.module('myApp', []);
/*app.controller('customersCtrl', function($scope, $http) {
    $scope.test = 'bob';
});*/
</script>
<div class="" ng-app="myApp">

{{10/2}}
<div>
<input type="text" ng-model="test" ng-value="sads">
{{test}}
</div>

<span ng-class="vote" ng-model="do-vote">Like</span>
<span ng-class="vote" ng-model="do-vote">Loved</span>
<span ng-class="vote" ng-model="do-vote">Fail</span>

</div>


