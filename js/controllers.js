'use strict';

angular.module('myApp.controllers', []).
controller('BasicsController', ['$scope', '$http', function($scope, $http) {
	$('#navbar').children('.active').removeClass('active');
	$('#basics').addClass('active');
  
  $scope.rows = [];
  $scope.loaded = false;
  
  $http.get('/loansByCountry').success(function(data, status, headers, config) {
    	$scope.rows = data;
      $scope.loaded = true;
  });
}]).
controller('VisualController', [function() {
	$('#navbar').children('.active').removeClass('active');
	$('#visual').addClass('active');
}]);