angular.module("ignitrack").directive("sprints", function () {
    return {
        restrict: 'AEC',
        replace: true,
        templateUrl: 'directive_templates/sprints.html'
    };
})
