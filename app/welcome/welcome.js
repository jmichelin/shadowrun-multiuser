'use strict';

angular.module('myApp.welcome', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/welcome', {
        templateUrl: 'welcome/welcome.html',
        controller: 'WelcomeCtrl'
    });
}])

.controller('WelcomeCtrl', ['$scope','$firebase','CommonProp', function($scope,$firebase,CommonProp) {
	$scope.username = CommonProp.getUser();
	var firebaseObj = new Firebase("https://shadowrun-multiuser.firebaseio.com/characters");
  var sync = $firebase(firebaseObj);
  $scope.characters = sync.$asArray();


}]);




/* original way
var ref = new Firebase('https://shadowrun-multiuser.firebaseio.com/characters');
var sync = $firebase(firebaseObj);
$scope.articles = sync.$asArray();




.controller('WelcomeCtrl', ['$scope', '$firebaseArray', 'CommonProp' function($scope,$firebaseArray,CommonProp) {
  $scope.username = CommonProp.getUser();
  var ref = new Firebase('https://shadowrun-multiuser.firebaseio.com/characters');
  $scope.characters = $firebaseArray(ref);
}]);

*/
