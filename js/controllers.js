'use strict';

angular.module('myApp.controllers', []).
controller('TutorialController', ['$scope', '$http', function($scope, $http) {
	$('#navbar').children('.active').removeClass('active');
	$('#tutorial').addClass('active');
  
  $scope.rows = [];
  $scope.loaded = false;
  
  $http.get('/loansByCountry').success(function(data, status, headers, config) {
    	$scope.rows = data;
      $scope.loaded = true;
  });
}]).
controller('ProblemController', [function() {
	$('#navbar').children('.active').removeClass('active');
	$('#problem').addClass('active');
}]);