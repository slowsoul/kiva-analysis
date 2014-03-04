'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.controllers',
  'myApp.directives',
  'ui.bootstrap',
  'ngScrollSpy'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/problem', {templateUrl: 'partials/problem.html', controller: 'ProblemController'});
  $routeProvider.when('/tutorial', {templateUrl: 'partials/tutorial.html', controller: 'TutorialController'});
  $routeProvider.otherwise({redirectTo: '/problem'});
}]);

function NavBarCtrl($scope) {
  $scope.isCollapsed = true;
}

function MainCtrl($scope, $location, $anchorScroll, $routeParams) {
  $scope.scrollTo = function(id) {
    $location.hash(id);
    $anchorScroll();
  };
}