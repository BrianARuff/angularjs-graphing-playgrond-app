const app = angular.module("graphIt", ["ngRoute"]);

app.config(function($routeProvider) {
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

app.controller("mainCtrl", [
  "$rootScope",
  "$scope",
  "$route",
  "$routeParams",
  "$location",
  "$http",
  function($rootScope, $scope, $route, $routeParams, $location, $http) {
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
    $rootScope.username = "Brian A. Ruff";
    $http({
      method: "GET",
      url: "https://jsonplaceholder.typicode.com/todos"
    })
      .then(res => {
        $rootScope.todos = res.data;
      })
      .catch(err => {
        console.error("Path: controllers/app.js", "File: app.js", "Line: 39");
        console.error(new Error(err));
      });
  }
]);

app.controller("circleGraphCtrl", [
  "$rootScope",
  "$scope",
  function($rootScope, $scope) {
    $scope.drawGraph = function() {
      const data = [$scope.val1 || 1, $scope.val2 || 1, $scope.val3 || 1];

      // grab svg and attrs
      const svg = d3.select("svg");
      const width = svg.attr("width");
      const height = svg.attr("height");
      const radius = Math.min(width, height) / 2;
      const g = svg
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
      svg.append("g").attr("class", "labels");
      const color = d3.scaleOrdinal(["red", "green", "blue"]);

      // generate pie
      const pie = d3.pie();
      $scope.pie = pie;

      // generate pie arcs
      const arc = d3
        .arc()
        .innerRadius(0)
        .outerRadius(radius);

      // generate groups of pie
      const arcs = g
        .selectAll("arc")
        .data(pie(data))
        .enter()
        .append("g")
        .attr("class", "arc");

      // draw arc paths
      arcs
        .append("path")
        .attr("fill", function(d, i) {
          return color(i);
        })
        .attr("d", arc);
      $rootScope.arcs = arcs;
    };
  }
]);

app.controller("aboutCtrl", [function() {}]);

app.controller("contactCtrl", [function() {}]);
