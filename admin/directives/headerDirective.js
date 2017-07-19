/**
 * file : headerDirective.js
 * description : directive use to include header template in index file
 * author: Mukesh
 * date 3 April 2017
 */
angular.module("ignitrack").directive("header", function (commonService) {
    return {
        restrict: 'A',
        templateUrl: 'directive_templates/header.html',
        scope: true,
        transclude: false,
        controller: function ($scope, $rootScope, $window, $state, $cookieStore, $injector) {

            $scope.logout = function () {

                swal({
                    title: "Are you sure?",
                    text: " You want to logout",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, logout me!",
                    closeOnConfirm: true,
                    html: false
                }, function (isConfirm) {

                    if (isConfirm) {
                        commonService.loadingPopup(); // start processing popup
                        commonService.logout(function (response) {
                            if (response.data.statusCode == 200) {
                                $cookieStore.remove('access_token');
                                var u_data = $cookieStore.get('user_credentials');
                                if (u_data != undefined && u_data != null && u_data.remember == false) {
                                    $cookieStore.remove('user_credentials');
                                }
                                $state.go('/');
                                commonService.closePopup();
                            }
                        });
                    }
                });


            }

        }
    };
});
