angular.module("ignitrack").directive("currentproject", function () {
    return {
        restrict: 'AEC',
        replace: true,
        templateUrl: 'directive_templates/current_project.html'
    };
})
