/**
 * @file: professionalCtrl.js
 * @author: Manish Kumar
 * @description: This Js Controller is used for all the functioning related to users.
 * */

angular.module('procircle').controller("employeeCtrl", function ($q, $window, $scope, $cookieStore, $stateParams, $http, $timeout, $state, $rootScope, $window, userService, commonService, ModalService) {
    $scope.heading = "Employee";
    $scope.currentPage = 1;

    /*
     * @name : Professional Personality Trait Questionaier
     * @Discription : Professional Personality
     */
    $scope.personalityQuestionair = function () {
        commonService.loadingPopup();
        var request = {employer_id: $state.params.employer_id, employee_email: $state.params.employee_email, page: ($scope.currentPage) ? $scope.currentPage : 1};
        userService.employeepersonalityQuestionair(request, function (response) {
            if (response.data.status == 200) {
                $scope.currentPage = response.data.response.current_page || 1;
                $scope.data = response.data.response;
                $scope.totalAnswer = response.data.total_answers;
                $window.scrollTo(0, 0);
                $timeout(commonService.closePopup(), 1000); // hide processing popup                
            } else {
                var data = {title: 'oops', text: 'Failed', type: 'error'};
                commonService.showMessage(data);
            }
        })
    };

    $scope.startPersonalityQuestionair = function () {
        commonService.loadingPopup();
        var request = {employer_id: $state.params.employer_id, employee_email: $state.params.employee_email, page: ($scope.currentPage) ? $scope.currentPage : 1};
        userService.employeepersonalityQuestionair(request, function (response) {
            if (response.data.status == 200) {
                if (response.data.total_answers == 50) {
                    swal({
                        title: "Link Expired",
                        text: "This link is expired for you.",
                        type: "warning",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "OK",
                        closeOnConfirm: true,
                        html: false
                    }, function (isConfirm) {
                        if (isConfirm) {
                            $state.go('signup');
                        }
                    });
                } else {
                    $scope.currentPage = response.data.response.current_page || 1;
                    $scope.data = response.data.response;
                    $scope.totalAnswer = response.data.total_answers;
                    $window.scrollTo(0, 0);
                    $timeout(commonService.closePopup(), 1000); // hide processing popup
                }
            } else {
                var data = {title: 'oops', text: 'Failed', type: 'error'};
                commonService.showMessage(data);
            }
        })
    };


    $scope.getvariable = function () {
        $scope.employer_id = $state.params.employer_id;
        $scope.employee_email = $state.params.employee_email;
    };

    $scope.saveAnswers = function (question_id, option_id) {
        var request = {employer_id: $state.params.employer_id, employee_email: $state.params.employee_email, question_id: question_id, option_id: option_id, data_type: 1};
        //commonService.loadingPopup();        
        userService.employeesaveAnswers(request, function (response) {
            if (response.data.status == 200) {
                $scope.totalAnswer = response.data.total_answers;
                //$timeout(commonService.closePopup(), 1000); // hide processing popup
            } else {
                var data = {title: 'oops', text: 'Failed', type: 'error'};
                commonService.showMessage(data);
            }
        })
    }

    $scope.sendTestResult = function () {
        commonService.loadingPopup();
        var request = {employer_id: $state.params.employer_id, employee_email: $state.params.employee_email, data_type: 1};
        userService.sendTestResultEmail(request, function (response) {
            if (response.data.status == 200) {
                //$state.go('employee_personality_test_result', {employer_id: $state.params.employer_id, employee_email: $state.params.employee_email});
                swal({
                        title: "Success",
                        text: "Thanks for taking the test, Your result has been sent to your employer.",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Sign up with us to avail all services",
                        closeOnConfirm: true,
                        html: false
                    }, function (isConfirm) {                       
                            $state.go('signup');
                       
                    });
                //$timeout(commonService.closePopup(), 1000); // hide processing popup
            } else {
                var data = {title: 'oops', text: 'Failed', type: 'error'};
                commonService.showMessage(data);
            }
        })
    }


});


