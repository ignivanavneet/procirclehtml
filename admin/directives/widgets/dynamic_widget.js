/*
 * @name : dynamicPannel 
 * @Description : dynamicPannel widget call all dasbord directives htnl dynamically its required to call that directives 
 */
angular.module("ignitrack").directive("dynamicPannel", function ($compile) {
        return {
            restrict: 'A',
            scope: {
                widget: '@widget'
            },
            link: function (scope, element) {
                scope.widget = JSON.parse(scope.widget);
                var generatedTemplate = "<div class=" + scope.widget.direct + "></div>";
                element.append($compile(generatedTemplate)(scope));
            }
        };
    });
