'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.controllers',
  'myApp.directives',
  'ui.bootstrap'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/problem', {templateUrl: 'partials/problem.html', controller: 'ProblemController'});
  $routeProvider.when('/tutorial', {templateUrl: 'partials/tutorial.html', controller: 'TutorialController'});
  //$routeProvider.when('/visual', {templateUrl: 'partials/visual.html', controller: 'VisualController'});
  $routeProvider.otherwise({redirectTo: '/problem'});
}]);
