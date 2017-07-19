angular.module("ignitrack").directive("userTasks", function () {
    return {
        restrict: 'AEC',
        replace: true,
        templateUrl: 'directive_templates/user_tasks.html'
    };
})
