angular.module("ignitrack").directive("efforts", function () {
    return {
        restrict: 'AEC',
        replace: true,
        templateUrl: 'directive_templates/efforts.html'
    };
})
