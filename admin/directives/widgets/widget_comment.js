angular.module("ignitrack").directive("comments", function () {
    return {
        restrict: 'AEC',
        replace: true,
        templateUrl: 'directive_templates/comments.html'
    };
})
