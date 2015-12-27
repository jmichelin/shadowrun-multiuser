'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.version',
  'myApp.home',
  'myApp.register',
  'myApp.welcome',
  'myApp.addCharacter'
]).
config(['$routeProvider', function($routeProvider) {
  //routes go here
  $routeProvider.otherwise({
    redirectTo: '/home'
  });
}]);
