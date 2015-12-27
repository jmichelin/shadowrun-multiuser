'use strict'

angular.module('myApp.addCharacter', ['ngRoute'])
.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/addCharacter', {
    templateUrl: 'addCharacter/addCharacter.html',
    controller: 'AddCharacterCtrl'
  });
}])
.controller('AddCharacterCtrl', ['$scope', '$firebase','$location', 'CommonProp', function($scope,$firebase,$location,CommonProp) {
  $scope.AddCharacter = function() {
    var firebaseObj = new Firebase("https://shadowrun-multiuser.firebaseio.com/characters");
    var fb = $firebase(firebaseObj);
    //profile
    var playerID = CommonProp.getUser();
    var chName = $scope.character.chName;
    //physical attributes
    var chBody      = $scope.character.chBody || 0;
    var chAgility   = $scope.character.agility || 0;
    var chReaction  = $scope.character.reaction || 0;
    var chStrength  = $scope.character.strength || 0;
    //mental attributes
    var chCharisma  = $scope.character.charisma || 0;
    var chIntuition = $scope.character.intuition || 0;
    var chLogic   = $scope.character.logic || 0;
    var chWillpower = $scope.character.willpower || 0;
    //special attributes
    var chEdge = $scope.character.edge || 0;
    var chEssence = $scope.character.essence || 0;
    var chInitiative = $scope.character.initiative || 0;
    var chInitiativePasses = $scope.character.initiativePasses || 0;
    //melee skills
    var chBlades = $scope.character.blades || 0;
    var chClubs = $scope.character.clubs || 0;
    var chExoticMelee = $scope.character.exoticMelee || 0;
    var chUnarmed = $scope.character.unarmed || 0;
    //ranged skills
    var chArchery = $scope.character.archery || 0;
    var chAutomatics = $scope.character.automatics || 0;
    var chExoticRanged = $scope.character.exoticRanged || 0;
    var chHeavy = $scope.character.heavy || 0;
    var chLongarms = $scope.character.longarms || 0;
    var chPistols = $scope.character.pistols || 0;
    var chThrowing = $scope.character.throwing || 0;
    //defense skills
    var chArmorRating = $scope.character.armorRating || 0;
    var chDodge = $scope.character.dodge || 0;
    var chGymnastics = $scope.character.gymnastics || 0;
    //damage tracks
    var chPhysical = $scope.character.physical || 0;
    var chStun = $scope.character.stun || 0;

    fb.$push({
      userID: playerID,
      Name: chName,
      Body: chBody,
      Agility: chAgility,
      Reaction: chReaction,
      Strength: chStrength,
      Charisma: chCharisma,
      Intuition: chIntuition,
      Logic: chLogic,
      Willpower: chWillpower,
      Edge: chEdge,
      Essence: chEssence,
      Initiative: chInitiative,
      InitiativePasses: chInitiativePasses,
      Blades: chBlades,
      Clubs: chClubs,
      ExoticMelee: chExoticMelee,
      Unarmed: chUnarmed,
      Archery: chArchery,
      Automatics: chAutomatics,
      ExoticRanged: chExoticRanged,
      Heavy: chHeavy,
      Longarms: chLongarms,
      Pistols: chPistols,
      Throwing: chThrowing,
      ArmorRating: chArmorRating,
      Dodge: chDodge,
      Gymnastics: chGymnastics,
      Physical: chPhysical
    }).then(function(ref){
      $location.path('/welcome');
      console.log("push was succesful why is location not working!: ", ref);
    }, function(error) {
      console.log("errror:", error);
    });



  }
}]);
