'use strict';

angular.module('myApp.controllers', []).
controller('TutorialController', ['$scope', '$http', function($scope, $http) {
	$('#navbar').children('.active').removeClass('active');
	$('#tutorial').addClass('active');
  
  $scope.p1ares = [];
  $scope.p1bres = [];
  $scope.p2res = [];
  $scope.p1aloaded = false;
  $scope.p1bloaded = false;
  $scope.p2loaded = false;
  
  $scope.showP1ares = function(){
    if(!$scope.p1aloaded){
      $http.get('/loansBySector').success(function(data, status, headers, config) {
          $scope.p1ares = data;
          $scope.p1aloaded = true;
      });
    }
  };
  
  $scope.showP1bres = function(){
    if(!$scope.p1bloaded){
      $http.get('/loansBySectorUganda').success(function(data, status, headers, config) {
          $scope.p1bres = data;
          $scope.p1bloaded = true;
      });
    }
  };
  
  $scope.showP2res = function(){
    if(!$scope.p2loaded){
      $http.get('/borrowerLender').success(function(data, status, headers, config) {
          $scope.p2res = data;
          $scope.p2loaded = true;
      });
    }
  };
}]).
controller('ProblemController', [function() {
	$('#navbar').children('.active').removeClass('active');
	$('#problem').addClass('active');
}]);