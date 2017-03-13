var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {

  //routes
    $routeProvider
        .when ('/tracker', {
          templateUrl: '/views/templates/salary.tracker.html',
          controller: 'SalaryTrackerController',
          controllerAs: 'tracker'
        })
        .when ('/feature', {
            templateUrl: '/views/templates/view_2.html',
            controller: 'OneController',
            controllerAs: 'one'
        })
        .otherwise ( {
            redirectTo: '/tracker'
        });
}]);
