angular.module("ignitrack").directive("projects", function () {
    return {
        restrict: 'AEC',
        replace: true,
        templateUrl: 'directive_templates/projects.html'
    };
})
