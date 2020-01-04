const app = angular.module("graphIt", ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "views/home.html"
        })
        .when("/contact", {
            templateUrl: "views/contact.html"
        })
        .when("/about", {
            templateUrl: "views/about.html"
        })
        .otherwise({
            template: `<h4>Page either not loading properly, or it doesn't exist.</h4>`
        });
});

app.controller("mainCtrl", ['$rootScope', '$scope', '$route', '$routeParams', '$location', '$http', function ($rootScope, $scope, $route, $routeParams, $location, $http) {
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
    $rootScope.username = "Brian A. Ruff";
    $http({
        method: "GET",
        url: "https://jsonplaceholder.typicode.com/todos"
    }).then(res => {
        console.log(res);
        $rootScope.todos = res.data
    }).catch(err => console.error(new Error(err)))
}]);

app.controller("circleGraphCtrl", ['$rootScope', '$scope', function ($rootScope, $scope) {
    // $scope.username = $rootScope.username;
}]);

app.controller("aboutCtrl", [function () {}]);

app.controller("contactCtrl", [function () {}]);