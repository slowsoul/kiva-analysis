'use strict';

angular.module('myApp.controllers', []).
controller('TutorialController', ['$scope', '$http', function($scope, $http) {
	$('#navbar').children('.active').removeClass('active');
	$('#tutorial').addClass('active');
  
  $scope.p1res = [];
  $scope.p1loaded = false;
  
  $scope.showP1res = function(){
    if(!$scope.p1loaded){
      $http.get('/loansBySector').success(function(data, status, headers, config) {
          $scope.p1res = data;
          $scope.p1loaded = true;
      });
    }
  };
}]).
controller('ProblemController', [function() {
	$('#navbar').children('.active').removeClass('active');
	$('#problem').addClass('active');
}]);