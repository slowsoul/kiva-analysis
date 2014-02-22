'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/basics', {templateUrl: 'partials/basics.html', controller: 'BasicsController'});
  $routeProvider.when('/visual', {templateUrl: 'partials/visual.html', controller: 'VisualController'});
  $routeProvider.otherwise({redirectTo: '/basics'});
}]);
