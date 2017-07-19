/*
 * @name : masterModalLayout 
 * @Description : masterModalLayout directive to call modals inside this master modal layout
 */
angular.module("ignitrack").directive("masterModalLayout", ['$compile','ModalService',function ($compile,ModalService) {
    return {
        restrict: 'A',
        scope: {
            modaldata: '=modaldata'
        },
        link: function (scope, el, attrs,form) {
            el.bind('click', function () {
                var template_name = scope.modaldata.template;
                var handler = scope.modaldata.controller;
                ModalService.showModal({
                    templateUrl: 'directive_templates/modals/'+template_name+'.html',
                    controller: handler
                }).then(function(modal) {
                    modal.element.modal();
                });
            });
        }
    };
}]);
