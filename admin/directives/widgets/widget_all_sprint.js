angular.module("ignitrack").directive("allSprint", function () {
    return {
        restrict: 'AEC',
        replace: true,
        templateUrl: 'directive_templates/all_sprint.html'
    };
})
