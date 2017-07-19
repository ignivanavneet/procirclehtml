
angular.module("ignitrack").directive("wnotifications", function () {
    return {
        restrict: 'AEC',
        replace: true,
        templateUrl: 'directive_templates/notifications.html'
    };
})
