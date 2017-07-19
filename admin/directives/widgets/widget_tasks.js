angular.module("ignitrack").directive("tasks", function () {
    return {
        restrict: 'AEC',
        replace: true,
        templateUrl: 'directive_templates/tasks.html'
    };
})
