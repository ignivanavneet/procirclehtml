/*
 * @file: loginCtrl.js
 * @description:This file is used to control all function related to admin login
 */

angular.module("procircle_admin").controller("loginCtrl", function ($scope, $cookieStore, $stateParams, $http, $timeout, $state, $rootScope, $window, jwtHelper, ModalService, commonService, userService) {
    
    $scope.heading = "Login";
    $scope.adminlogin = function () {
        $scope.requestdata = {
            "email": $scope.email,
            "password": $scope.password,
            "data_type": 1
        }
        commonService.loadingPopup(); // start processing popup
        userService.adminLogin($scope.requestdata, function (response) {   
            if (response.data.status == '200') {
                $cookieStore.put('token', response.headers('token'));                
                $state.go('employers');
            } else {
                swal({
                    title: "Email and password are invalid!",
                    type: "error",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                });
            }
        })
    }

    /*
     * @name : forgotPasswordModal
     * @Description : Function to open forgot password modal
     */
    $scope.forgotPasswordModal = function () {
        ModalService.showModal({
            templateUrl: 'admin/directive_templates/modals/forgot_password.html',
            controller: 'loginChildCtrl',
            scope: $scope
        }).then(function (modal) {
            modal.element.modal();
        });
    }

    /*
     * @name: adminLogout
     * @Description: Function for logout from admin panel
     */
    $scope.adminLogout = function () {
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
            $scope.request = {
                "token": $cookieStore.get('token'),
                "data_type": 1
            }
            if (isConfirm) {
                userService.loadingPopup(); // start processing popup                
                userService.adminLogout($scope.request, function (response) {
                    if (response.data.status == 200) {
                        $cookieStore.remove('token');
                        $cookieStore.remove('user_data');
                        $state.go('/');
                        userService.closePopup();
                    }
                });
            }
        });
    }
    /*
     * @name: adminChangePassword
     * @description: function for change password in admin panel
     */

    $scope.adminChangePassword = function () {        
        var request = {
            "old_password": $scope.reset.old_password,
            "new_password": $scope.reset.password,
            "confirm_password": $scope.reset.confirm_password,
            "data_type": 1
        };        
        userService.changePassword(request, function (response) {            
            if (response.data.status == 200) {
                swal({
                    title: response.data.message,
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                }, function () {
                    $state.go($state.current.name, {}, {reload: true})
                });
            } else {
                swal({
                    title: response.data.message,
                    type: "error",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                });
            }
        });
    }
    
    /*
     * @name: adminResetPassword
     * @description: function for save password when admin reset his password
     */
    $scope.adminResetPassword = function () {        
        var request = {
            "user_id":  $state.params.user_id,
            "reset_password_token":  $state.params.token,
            "time":  $state.params.time,
            "new_password": $scope.reset.password,
            "confirm_password": $scope.reset.confirm_password,
            "data_type": 1
        };        
        userService.savePassword(request, function (response) {
            if (response.data.status == 200) {
                swal({
                    title: response.data.message,
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                }, function () {
                    $state.go('/');
                });
            } else {
                swal({
                    title: response.data.message,
                    type: "error",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                });
            }
        });
    }

});

/* Child Controller for forgot password*/
angular.module("procircle_admin").controller("loginChildCtrl", function ($scope, $q, $stateParams, $http, $timeout, $state, $rootScope, $window, jwtHelper, ModalService, commonService, userService, close, $element) {
    // Submit data to the server
    $scope.forgotPassword = function () {        
        $scope.request = {email: $scope.email, data_type: 1};     
        $scope.closeModal();
        commonService.loadingPopup();
        userService.forgotPassword($scope.request, function (response) {
//            $scope.request = null; 
//            $scope.submitted = false;
//            $scope.forgot.$setUntouched();  
            if (response.data.status == 200) {                                                    
                swal({
                    title: response.data.message,
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                });
            } else {                     
                swal({
                    title: response.data.message,
                    type: "error",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                });
            }
        });
    }
    //Function for close the modal
    $scope.closeModal = function () {
        $element.modal('hide');
        close(null, 500);        
    }

});
