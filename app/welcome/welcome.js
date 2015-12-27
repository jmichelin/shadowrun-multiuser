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

  $scope.editCharacter = function(id) {
    var firebaseObj = new Firebase("https://shadowrun-multiuser.firebaseio.com/characters/" + id);
    var sync = $firebase(firebaseObj);
    $scope.charToUpdate = sync.$asObject();
    console.log("+++ welcome.js line 22 $scope.charToUpdate => ", $scope.charToUpdate);
    $('#editChar').modal(); //trigger modal popup
  }

  $scope.update = function () {
    console.log($scope.charToUpdate.$id);
    var firebaseObj = new Firebase("https://shadowrun-multiuser.firebaseio.com/characters/" + $scope.charToUpdate.$id);
    var character = $firebase(firebaseObj);
    character.$update({
      //massive update object
      //userID: playerID,
      Name: $scope.charToUpdate.Name,
      Body: $scope.charToUpdate.Body,
      Agility: $scope.charToUpdate.Agility,
      Reaction: $scope.charToUpdate.Reaction,
      Strength: $scope.charToUpdate.Strength,
      Charisma: $scope.charToUpdate.Charisma,
      Intuition: $scope.charToUpdate.Intuition,
      Logic: $scope.charToUpdate.Logic,
      Willpower: $scope.charToUpdate.Willpower,
      Edge: $scope.charToUpdate.Edge,
      Essence: $scope.charToUpdate.Essence,
      Initiative: $scope.charToUpdate.Initiative,
      InitiativePasses: $scope.charToUpdate.InitiativePasses,
      Blades: $scope.charToUpdate.Blades,
      Clubs: $scope.charToUpdate.Clubs,
      ExoticMelee: $scope.charToUpdate.ExoticMelee,
      Unarmed: $scope.charToUpdate.Unarmed,
      Archery: $scope.charToUpdate.Archery,
      Automatics: $scope.charToUpdate.Automatics,
      ExoticRanged: $scope.charToUpdate.ExoticRanged,
      Heavy: $scope.charToUpdate.Heavy,
      Longarms: $scope.charToUpdate.Longarms,
      Pistols: $scope.charToUpdate.Pistols,
      Throwing: $scope.charToUpdate.Throwing,
      ArmorRating: $scope.charToUpdate.ArmorRating,
      Dodge: $scope.charToUpdate.Dodge,
      Gymnastics: $scope.charToUpdate.Gymnastics,
      Physical: $scope.charToUpdate.Physical

      // end massive update object
    }).then(function(ref){
      console.log(ref.key()); //bar?
      $('#editChar').modal('hide');
    }, function(error){
      console.log("Error: ", error);
    });
  }
  //pre delete confirmation
  $scope.confirmDelete = function(id) {
    var firebaseObj = new Firebase("https://shadowrun-multiuser.firebaseio.com/characters/" + id);
    var character = $firebase(firebaseObj);
    $scope.charToDelete = character.$asObject();
    $('#deleteChar').modal();
  }
  //delete the character
  $scope.deleteChar = function(){
    var firebaseObj = new Firebase("https://shadowrun-multiuser.firebaseio.com/characters/" + $scope.charToDelete.$id);
    var character = $firebase(firebaseObj);
    character.$remove().then(function(ref) {
      $('#deleteChar').modal('hide');
    }, function(error) {
      console.log("Error: ", error);
    });
  }


}]);
