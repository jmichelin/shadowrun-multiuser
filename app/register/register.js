'use strict'

angular.module('myApp.register', ['ngRoute', 'firebase'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/register', {
    templateUrl: 'register/register.html',
    controller: 'RegisterCtrl'
  });
}])
.controller('RegisterCtrl', ['$scope', '$location', '$firebaseAuth', function($scope,$location, $firebaseAuth) {
  var firebaseObj = new Firebase("https://shadowrun-multiuser.firebaseio.com");
  var auth = $firebaseAuth(firebaseObj);
  $scope.signUp = function() {
    //sign up implementation here
    if (!$scope.regForm.$invalid) {
      //console.log('Valid Form Submission');
      var email = $scope.user.email;
      var password = $scope.user.password;
      if (email && password) {
        auth.$createUser(email, password)
          .then(function(){
            //do things if Successful
            console.log('user created successfully');
            $location.path('/home');
          }, function(error) {
            //do things if failed
            console.log('user not created ', error);
            $scope.regError = true;
            $scope.regErrorMessage = error.message;
          });
      }
    }
  };
}]);
