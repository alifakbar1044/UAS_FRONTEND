var app = angular.module('myApp', []);
app.controller('myController', function($scope) {
    $scope.showAlert = function() {
        alert('AngularJS Terhubung!');
    };
});
