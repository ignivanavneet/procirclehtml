angular.module("ignitrack").directive("activity", function () {
    return {
        restrict: 'AEC',
        replace: true,
        templateUrl: 'directive_templates/activity.html'
    };
})
