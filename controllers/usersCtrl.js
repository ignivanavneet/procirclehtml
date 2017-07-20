/**
 * @file: usersCtrl.js
 * @author: Sachin Jariyal
 * @description: This Js Controller is used for all the functioning related to users.
 * */

angular.module('procircle').controller("usersCtrl", function ($q, $scope, $cookieStore, $stateParams, $http, $timeout, $state, $rootScope, $window, userService, commonService, ModalService, Upload, API_URL) {
    $scope.heading = "Users";
    $scope.role_type = [{id: 2, name: "Employer"}, {id: 3, name: "Professional"}];
    $scope.no_of_employees = {'9': '1-9', '49': '10-49', '249': '50-249', '99999': '250+'};
    $scope.company_years = {'0-2': '0-2', '3-5': '3-5', '5-10': '5-10', '10+': '10+'};
    $scope.recruit_per_year = {'2': '1-2', '10': '3-10', '49': '11-49', '99999': '50+'};
    $scope.current_date_time = new Date();

    $scope.hitTwitterLoginUrl = function () {
        window.location.href = API_URL + "auth/twitter";
    };

    $scope.twitter_login = function () {
        if ($state.params.id != null && $state.params.popup == 1) {
            //opens popup after clicking twitter login
            ModalService.showModal({
                templateUrl: 'views/frontend/elements/modals/social_usertype.html',
                controller: 'childUsersCtrl',
                scope: $scope
            }).then(function (modal) {
                modal.element.modal();
            });
        } else {
            if ($state.params.id != null) {
                userService.loginWithTwitter({id: $state.params.id}, function (response) {
                    if (response.data.status == 200) {
                        // nothing to do here
                    } else {
                        var data = {title: 'oops', text: response.data.message, type: 'error'};
                        commonService.showMessage(data);
                        $scope.submitted = false;
                        $scope.isDisabled = false;
                    }
                });
            }
        }
    };

    /*
     * @name : Users signup
     * @Discription : User signup
     */
    $scope.signup = function () {
        $scope.isDisabled = true;
        if ($state.params.type == "employer") {
            var role_type = 2;
        } else {
            var role_type = 3;
        }
        $scope.request = {role_id: role_type, social_id: "", first_name: $scope.user.firstname, last_name: $scope.user.lastname, email: $scope.user.email, username: $scope.user.username, password: $scope.user.password, confirm_password: $scope.user.confirm_password, register_type: "manual", data_type: 1};
        commonService.loadingPopup();
        userService.signup($scope.request, function (response) {
            if (response.data.status == 200) {
                swal({
                    title: "Success!",
                    text: response.data.message,
                    type: "success",
                    showCancelButton: true,
                    cancelButtonText: "OK",
                    confirmButtonColor: "#63CE0A",
                    confirmButtonText: "Did not receive mail, Send it again.",
                    closeOnConfirm: false},
                function () {
                    $scope.resendActivationEmail(response.data.user_id);
                });
                $scope.user = null; //empty $scope.use data from form
                $scope.submitted = false;
                $scope.usersignup.$setUntouched();
                $scope.isDisabled = false;
                $state.go('login');
            } else {
                var data = {title: 'oops', text: response.data.message, type: 'error'};
                commonService.showMessage(data);
                // $scope.submitted = true;
                $scope.usersignup.$setUntouched();
                $scope.isDisabled = false;
            }
        });
    };


    /*
     * @name : Users signup
     * @Discription : User signup
     */
    $scope.signIn = function () {
        $scope.request = {email: $scope.signin.username, password: $scope.signin.password, data_type: 1};
        commonService.loadingPopup();
        userService.signIn($scope.request, function (response) {
            if (response.data.status == 200) {
//                if(response.headers('p-token')){
//                   $cookieStore.put('p-token', response.headers('p-token'));  
//                }else if(response.headers('e-token')){
//                   $cookieStore.put('e-token', response.headers('e-token')); 
//                }
                // $state.go('employer_profile');
            } else if (response.data.status == 401) {
                swal({
                    title: "oops!",
                    text: response.data.message,
                    type: "error",
                    showCancelButton: true,
                    confirmButtonColor: "#63CE0A",
                    confirmButtonText: "Didn't receive the email. Please check your spam folder or resend mail",
                    closeOnConfirm: false},
                function () {
                    $scope.resendActivationEmail(response.data.user_id);
                });
            } else {
                var data = {title: 'oops', text: response.data.message, type: 'error'};
                commonService.showMessage(data);
                $scope.submitted = false;
                $scope.userlogin.$setUntouched();
                $scope.isDisabled = false;
            }
        });
    };


    /*
     * @name: adminLogout
     * @Description: Function for logout from admin panel
     */
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
            $scope.request = {
                "token": $cookieStore.get('token'),
                "data_type": 1
            }
            if (isConfirm) {
                userService.adminLogout($scope.request, function (response) {
                    if (response.data.status == 200) {
                        $cookieStore.remove('token');
                        $cookieStore.remove('user_data');
                        $state.go('/');
                    }
                });
            }
        });
    };

    /*
     * @name : Activate
     * @Description : activates a user on the platform
     */
    $scope.activate = function () {
        var user_id = ($state.params.id != undefined) ? $state.params.id : "";
        var verification_key = ($state.params.key != undefined) ? $state.params.key : "";
        $scope.request = {user_id: user_id, verification_key: verification_key, data_type: 1};
        userService.activateUser($scope.request, function (response) {
            if (response.data.status == 200) {
                swal({
                    title: "Success!",
                    text: response.data.message,
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#63CE0A",
                    confirmButtonText: "OK",
                    closeOnConfirm: true},
                function () {
                    $state.go('login');
                });
            } else {
                swal({
                    title: "oops!",
                    text: response.data.message,
                    type: "error",
                    showCancelButton: false,
                    confirmButtonColor: "#63CE0A",
                    confirmButtonText: "OK",
                    closeOnConfirm: true},
                function () {
                    $state.go('login');
                });
            }
        });
    };

    /*
     * @name : Forgot Password
     * @Description : sends an email to reset a password
     */
    $scope.forgotPassword = function () {
        $scope.isDisabled = true;
        $scope.request = {email: $scope.forgot.email, data_type: 1};
        commonService.loadingPopup();
        userService.forgotPassword($scope.request, function (response) {
            if (response.data.status == 200) {
                swal({
                    title: "Sent!",
                    text: response.data.message,
                    type: "success",
                    showCancelButton: true,
                    confirmButtonColor: "#63CE0A",
                    confirmButtonText: "Did not receive, Send it again.",
                    closeOnConfirm: false},
                function () {
                    $scope.resendForgotEmail(response.data.user_id);
                });
                $scope.forgot = null; //empty $scope.forgot data from form
                $scope.submitted = false;
                $scope.forgotpassform.$setUntouched();
                $scope.isDisabled = false;
            } else {
                var data = {title: 'oops', text: response.data.message, type: 'error'};
                commonService.showMessage(data);
                $scope.submitted = false;
                $scope.forgotpassform.$setUntouched();
                $scope.isDisabled = false;
            }
        });
    };

    /*
     * @name : resetPassword
     * @Description : resets a user's password on the platform
     */
    $scope.resetPassword = function () {
        $scope.isDisabled = true;
        var user_id = $state.params.id;
        var password_token = $state.params.token;
        var link_generation_time = $state.params.time;
        $scope.request = {user_id: user_id, reset_password_token: password_token, time: link_generation_time, new_password: $scope.reset.password, confirm_password: $scope.reset.confirm_password, data_type: 1};
        userService.resetPassword($scope.request, function (response) {
            if (response.data.status == 200) {
                swal({
                    title: "Success!",
                    text: response.data.message,
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#63CE0A",
                    confirmButtonText: "OK",
                    closeOnConfirm: true},
                function () {
                    $state.go('login');
                });
                //var data = {title: "Success!", text: response.data.message, type: 'success', confirmButtonText: "OK"};
                //commonService.showMessage(data);
                $scope.reset = null; //empty $scope.use data from form
                $scope.submitted = false;
                $scope.reset_pass.$setUntouched();
                $scope.isDisabled = false;
            } else {
                var data = {title: 'oops', text: response.data.message, type: 'error'};
                commonService.showMessage(data);
                $scope.submitted = false;
                $scope.reset_pass.$setUntouched();
                $scope.isDisabled = false;
            }
        });
    };

    /*
     * @name : resendForgotEmail
     * @Description : resends a email forgot password
     * @param : uses user_id to send another link for resetting password
     */
    $scope.resendForgotEmail = function (user_id) {
        $scope.request = {user_id: user_id, data_type: 1};
        userService.resendForgotEmail($scope.request, function (response) {
            if (response.data.status == 200) {
                var data = {title: "Success!", text: response.data.message, type: 'success', confirmButtonText: "OK"};
                commonService.showMessage(data);
            } else {
                var data = {title: 'oops', text: response.data.message, type: 'error'};
                commonService.showMessage(data);
            }
        });
    };

    /*
     * @name : resendActivationEmail
     * @Description : resends a activation email 
     * @param : uses user_id to send another link for resetting password
     */
    $scope.resendActivationEmail = function (user_id) {
        $scope.request = {user_id: user_id, data_type: 1};
        userService.resendActivationMail($scope.request, function (response) {
            if (response.data.status == 200) {
                var data = {title: "Success!", text: response.data.message, type: 'success', confirmButtonText: "OK"};
                commonService.showMessage(data);
            } else {
                var data = {title: 'oops', text: response.data.message, type: 'error'};
                commonService.showMessage(data);
            }
        });
    };

    /*
     * @name : Employer Profile
     * @Description : Create/Update My - Employer Profile 
     * @param : 
     */
    $scope.getEmployerProfile = function () {
        commonService.loadingPopup();
        var methods = {
            sectors: userService.getSectors({}),
            companySizeArray: userService.getCompanySizeArray({}),
            firstProfile: userService.getUserFirstStep({}),
        };

        $q.all(methods).then(function (methods) {
            var response = _.filter(methods, function (obj) {
                return obj.status != 200 || !obj.data || obj.data.status != 200
            });

            if (response.length > 0) {
                swal("Oops...", 'Technical error. Please try again later', 'error');
            } else {
                $scope.sectors = methods.sectors.data.data;
                $scope.companySize = methods.companySizeArray.data.data;
                $scope.firstProfile = methods.firstProfile.data.data;
                $scope.firstProfile.employer_name = $scope.firstProfile.first_name + ' ' + $scope.firstProfile.last_name;
                $scope.profilePicture = methods.firstProfile.data.profile_pic;
                if ($scope.firstProfile.companies != null) {
                    $scope.firstProfile.companies.sector_id = {
                        id: $scope.firstProfile.companies.sector_id == undefined ?
                                '' : $scope.firstProfile.companies.sector_id
                    }
                }
                if ($scope.firstProfile.location.length == 0) {
                    $scope.firstProfile.location.push({address: "", city: "", country: "", zipcode: ""});
                }
                $timeout(commonService.closePopup(), 200); // hide processing popup 
            }
        });
    };

    /* Save user profile remove location  */
    $scope.removeLocation = function (key) {
        $scope.firstProfile.location.splice(key, 1);
    };

    /* Save user profile add location  */
    $scope.addLocation = function (key) {
        $scope.firstProfile.location.push({address: "", city: "", country: "", zipcode: ""});
    };

    /* Save user profile */
    $scope.saveProfileFirstStep = function () {
        commonService.loadingPopup();
        var request = {
            employer_name: $scope.firstProfile.employer_name,
            companies: {
                company_name: $scope.firstProfile.companies.company_name,
                sector_id: $scope.firstProfile.companies.sector_id.id,
                other_sector: $scope.firstProfile.companies.other_sector != undefined
                        ? $scope.firstProfile.companies.other_sector
                        : '',
                company_size: $scope.firstProfile.companies.company_size,
                company_description: $scope.firstProfile.companies.company_description
            },
            location: $scope.firstProfile.location,
            data_type: 1
        }
        userService.saveFirstStep(request, function (response) {
            if (response.data.status == 200) {
                userService.getProfessionalStep({}, function (response) {
                    if (response.data.status == 200) {
                        if (response.data.step_no == 2) {
                            $state.go('subscription_info');
                        } else {
                            $state.go('employer_profile_view');
                        }
                    } else {
                        var data = {title: 'oops', text: response.data.message, type: 'error'};
                        commonService.showMessage(data);
                    }
                });
                $timeout(commonService.closePopup(), 200); // hide processing popup

            } else {
                var data = {title: 'oops', text: response.data.message, type: 'error'};
                commonService.showMessage(data);
            }
        });
    };

    /* Get Candidate profile step one  */
    $scope.getEmployerProfileStepTwo = function () {
        commonService.loadingPopup();
        var methods = {
            profileData: userService.getEmployerProfileStepTwo({profile_id: $state.params.id,
                data_type: $state.params.type}),
            profileImage: userService.getUserFirstStep({}),
        };

        $q.all(methods).then(function (methods) {
            var response = _.filter(methods, function (obj) {
                return obj.status != 200 || !obj.data || obj.data.status != 200
            });

            if (response.length > 0) {
                swal("Oops...", 'Technical error. Please try again later', 'error');
            } else {
                $scope.details = methods.profileData.data.data;
                $scope.profilePicture = methods.profileImage.data.profile_pic;
                $timeout(commonService.closePopup(), 200); // hide processing popup 
            }
        });
    };

    /* Save Candidate profile step one  */
    $scope.candidateProfile = function () {
        if ($scope.candidateProfileStepOneValdaions() == false) {
            return false;
        }

        commonService.loadingPopup();
        var details = [];
        for (var i = 0; i < $scope.details.length; i++) {
            var attribute_option = [];
            for (var k = 0; k < $scope.details[i].attribute_options.length; k++) {
                if ($scope.details[i].input_type == "checkbox" &&
                        $scope.details[i].attribute_options[k].is_checked == true) {
                    if ($scope.details[i].attribute_options[k].info == 1) {
                        attribute_option.push({
                            id: $scope.details[i].attribute_options[k].id,
                            attribute_type: 'other',
                            attribute_value: $scope.details[i].attribute_options[k].attribute_value
                        });
                    } else {
                        attribute_option.push({
                            id: $scope.details[i].attribute_options[k].id
                        });
                    }

                } else if ($scope.details[i].input_type == "radio" &&
                        $scope.details[i].selectedValue != undefined &&
                        $scope.details[i].selectedValue != ''
                        ) {
                    if ($scope.details[i].attribute_options[k].id == $scope.details[i].selectedValue) {

                        if ($scope.details[i].attribute_options[k].info == 1) {
                            attribute_option.push({
                                id: $scope.details[i].attribute_options[k].id,
                                attribute_type: 'other',
                                attribute_value: $scope.details[i].attribute_options[k].attribute_value
                            });
                        } else {
                            attribute_option.push({
                                id: $scope.details[i].attribute_options[k].id
                            });
                        }
                    }

                } else if ($scope.details[i].input_type == 'text') {
                    attribute_option.push({
                        id: $scope.details[i].attribute_options[k].id,
                        attribute_type: '',
                        attribute_value: $scope.details[i].attribute_options[k].attribute_value
                    });
                }

            }
            var records = {id: $scope.details[i].id, attribute_options: attribute_option};
            details.push(records);
        }

        var request = {details: details,
            profile_id: parseInt($state.params.id),
            data_type: parseInt($state.params.type)};
        userService.createEmployerProfileStepOne(request, function (response) {
            if (response.data.status == 200) {
                $timeout(commonService.closePopup(), 200); // hide processing popup
                $state.go('employer_profile_step_three', {id: parseInt(response.data.profile_id)});

            } else {
                var data = {title: 'oops', text: response.data.message, type: 'error'};
                commonService.showMessage(data);
            }
        });
    };

    $scope.candidateProfileStepOneValdaions = function () {
        var error = 0;

        for (var i = 0; i < $scope.details.length; i++) {
            if ($scope.details[i].is_mandatory == '1' && $scope.details[i].input_type == 'checkbox') {
                var trueCount = 0;
                var message = '';
                for (var k = 0; k < $scope.details[i].attribute_options.length; k++) {
                    var checked = $scope.details[i].attribute_options[k].is_checked;
                    var info = $scope.details[i].attribute_options[k].info;
                    var attribute_value = $scope.details[i].attribute_options[k].attribute_value != undefined ?
                            $scope.details[i].attribute_options[k].attribute_value
                            : '';
                    if (checked == true && info == 1 && attribute_value.trim() == '') {
                        error++;
                        trueCount++;
                        message = $scope.details[i].attribute_options[k].error_msg;
                    } else if (checked == true) {
                        trueCount++;
                    }
                }
                if (trueCount < 1) {
                    $scope.details[i]['validationMessage'] = "Please select at least one option.";
                    error++;
                } else {
                    $scope.details[i]['validationMessage'] = message;
                }
            } else if ($scope.details[i].is_mandatory == '1' && $scope.details[i].input_type == 'radio') {
                var message = '';
                if ($scope.details[i].selectedValue != undefined) {
                    for (var k = 0; k < $scope.details[i].attribute_options.length; k++) {
                        var info = $scope.details[i].attribute_options[k].info;
                        var id = $scope.details[i].attribute_options[k].id;
                        var attribute_value = $scope.details[i].attribute_options[k].attribute_value;
                        var selectedValue = $scope.details[i].selectedValue;
                        if (info == 1 && id == selectedValue && attribute_value == '') {
                            $scope.details[i]['validationMessage'] = $scope.details[i].attribute_options[k].error_msg;
                            error++;
                        } else {
                            $scope.details[i]['validationMessage'] = '';
                        }
                    }
                } else {
                    $scope.details[i]['validationMessage'] = 'Please select at least one option.';
                    error++;
                }
            } else if ($scope.details[i].is_mandatory == '1' && $scope.details[i].input_type == 'text') {
                for (var k = 0; k < $scope.details[i].attribute_options.length; k++) {
                    var attribute_value = $scope.details[i].attribute_options[k].attribute_value != undefined &&
                            $scope.details[i].attribute_options[k].attribute_value != '' ? $scope.details[i].attribute_options[k].attribute_value : '';
                    if (attribute_value.trim() == '') {
                        $scope.details[i]['validationMessage'] = 'Please enter ' + $scope.details[i].attribute_options[k].title + '.';
                        $scope.details[i]['validationMessage'] = $scope.details[i].attribute_options[k].title + ' is required.';
                        error++;

                    } else {
                        $scope.details[i]['validationMessage'] = '';

                    }
                }
            }
        }
        if (error > 0) {
            return false;
        }
    };

    $scope.validationCheck = function (is_mandatory, type, index, data) {
        if (is_mandatory == '1' && type == 'checkbox') {
            var message = '';
            var trueCount = 0;
            for (var i = 0; i < data.attribute_options.length; i++) {
                var error = 0;
                var checked = data.attribute_options[i].is_checked;
                var info = data.attribute_options[i].info;
                var attribute_value = data.attribute_options[i].attribute_value != undefined ?
                        data.attribute_options[i].attribute_value
                        : '';

                if (checked == true && info == 1 && attribute_value.trim() == '') {
                    message = data.attribute_options[i].error_msg;
                    error++;
                } else if (checked == true) {
                    trueCount++;
                }

                if (trueCount < 1 && error == 0) {
                    $scope.details[index]['validationMessage'] = "Please select at least one option.";
                } else {
                    $scope.details[index]['validationMessage'] = message;
                }

            }
        } else if (is_mandatory == '1' && type == 'radio') {
            var message = '';
            if (data.selectedValue != undefined) {
                for (var i = 0; i < data.attribute_options.length; i++) {
                    var info = data.attribute_options[i].info;
                    var id = data.attribute_options[i].id;
                    var attribute_value = data.attribute_options[i].attribute_value;
                    var selectedValue = data.selectedValue;
                    if (info == 1 && id == selectedValue && attribute_value == '') {
                        $scope.details[index]['validationMessage'] = data.attribute_options[i].error_msg;
                        error++;
                    } else {
                        $scope.details[index]['validationMessage'] = '';
                    }
                }
            } else {
                $scope.details[index]['validationMessage'] = 'Please select at least one option.';
            }

        } else if (is_mandatory == '1' && type == 'text') {
            for (var i = 0; i < data.attribute_options.length; i++) {
                var attribute_value = data.attribute_options[i].attribute_value != undefined &&
                        data.attribute_options[i].attribute_value != '' ? data.attribute_options[i].attribute_value : '';
                if (attribute_value.trim() == '') {
                    $scope.details[index]['validationMessage'] = 'Please enter ' + data.attribute_options[i].title + '.';
                } else {
                    $scope.details[index]['validationMessage'] = '';

                }
            }
        }
    };

    /* Get candidate profile step two */
    $scope.getCandidateProfileStepTwo = function () {
        commonService.loadingPopup();
        var methods = {
            profileData: userService.getCandidateProfileStepTwo(
                    {profile_id: parseInt($state.params.id)}),
            profileImage: userService.getUserFirstStep({}),
        };

        $q.all(methods).then(function (methods) {
            var response = _.filter(methods, function (obj) {
                return obj.status != 200 || !obj.data || obj.data.status != 200
            });

            if (response.length > 0) {
                swal("Oops...", 'Technical error. Please try again later', 'error');
            } else {
                $scope.details = methods.profileData.data.data.data;
                $scope.about_team = methods.profileData.data.data.about_team;
                $scope.emails = methods.profileData.data.data.emails;
                var count = 5 - methods.profileData.data.data.emails.length;
                for (var i = 0; i < count; i++) {
                    $scope.emails.push({id: '', employee_email: ''});
                }
                $scope.profilePicture = methods.profileImage.data.profile_pic;
                $timeout(commonService.closePopup(), 200); // hide processing popup 
            }
        });
    };

    $scope.saveCandidateProfileStepThree = function () {
        if ($scope.candidateProfileStepOneValdaions() == false) {
            return false;
        }
        commonService.loadingPopup();
        var details = [];
        for (var i = 0; i < $scope.details.length; i++) {
            var attribute_option = [];
            for (var k = 0; k < $scope.details[i].attribute_options.length; k++) {
                if ($scope.details[i].input_type == "checkbox" &&
                        $scope.details[i].attribute_options[k].is_checked == true) {
                    if ($scope.details[i].attribute_options[k].info == 1) {
                        attribute_option.push({
                            id: $scope.details[i].attribute_options[k].id,
                            attribute_type: 'other',
                            attribute_value: $scope.details[i].attribute_options[k].attribute_value
                        });
                    } else {
                        attribute_option.push({
                            id: $scope.details[i].attribute_options[k].id
                        });
                    }

                } else if ($scope.details[i].input_type == "radio" &&
                        $scope.details[i].selectedValue != undefined &&
                        $scope.details[i].selectedValue != ''
                        ) {
                    if ($scope.details[i].attribute_options[k].id == $scope.details[i].selectedValue) {

                        if ($scope.details[i].attribute_options[k].info == 1) {
                            attribute_option.push({
                                id: $scope.details[i].attribute_options[k].id,
                                attribute_type: 'other',
                                attribute_value: $scope.details[i].attribute_options[k].attribute_value
                            });
                        } else {
                            attribute_option.push({
                                id: $scope.details[i].attribute_options[k].id
                            });
                        }
                    }

                } else if ($scope.details[i].input_type == 'text') {
                    attribute_option.push({
                        id: $scope.details[i].attribute_options[k].id,
                        attribute_type: '',
                        attribute_value: $scope.details[i].attribute_options[k].attribute_value
                    });
                }

            }
            var records = {id: $scope.details[i].id, attribute_options: attribute_option};
            details.push(records);
        }
        var emails = [];
        for (var m = 0; m < $scope.emails.length; m++) {
            if ($scope.emails[m].employee_email != '' && $scope.emails[m].id == '') {
                emails.push({email: $scope.emails[m].employee_email});
            }
        }

        var request = {details: details,
            profile_id: parseInt($state.params.id),
            emails: emails,
            about_team: $scope.about_team,
            data_type: 1
        };
        userService.createCandidateProfileStepThree(request, function (response) {
            if (response.data.status == 200) {
                $timeout(commonService.closePopup(), 200); // hide processing popup
                $state.go('employer_profile_listing');
            } else {
                var data = {title: 'oops', text: response.data.message, type: 'error'};
                commonService.showMessage(data);
            }
        });
    };


    $scope.uploadProfilePicture = function () {
        if ($scope.profilePic != null) {
            commonService.loadingPopup();
            var request = {file_to_upload: $scope.profilePic};

            Upload.upload({
                method: 'POST',
                url: API_URL + 'user/uploadProfileImage',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                arrayKey: '',
                data: request
            }).then(function (response) {
                if (response.data.status == 200) {
                    userService.getUserFirstStep({}, function (response) {
                        if (response.data.status == 200) {
                            $scope.profilePicture = response.data.profile_pic;
                            $rootScope.profile_image = response.data.profile_pic;
                        }
                        $timeout(commonService.closePopup(), 200); // hide processing popup
                    })
                } else {
                    swal("Oops...", response.data.message, 'error');
                    $scope.requestSend = false;
                }
            });
        }
    };

    /*
     * @name : Employer's Profile Listing
     * @Description : employer's profile listing
     */
    $scope.employerProfileListing = function () {
        commonService.loadingPopup();
        var methods = {
            candidateListing: userService.employerProfileListing({}),
            profileImage: userService.getUserFirstStep({}),
        };
        $q.all(methods).then(function (methods) {
            var response = _.filter(methods, function (obj) {
                return obj.status != 200 || !obj.data || obj.data.status != 200
            });

            if (response.length > 0) {
                swal("Oops...", 'Technical error. Please try again later', 'error');
            } else {
                $scope.data = methods.candidateListing.data.data;
                $scope.profilePicture = methods.profileImage.data.profile_pic;
                $timeout(commonService.closePopup(), 200); // hide processing popup 
            }
        });
    };

    /**
     * method to save employees company details for subscription package selection
     * @param {int} no_of_employees
     * @param {int} active_since
     * @param {int} recruitment_per_year
     * @returns {int} plan_id this plan id shows select button on the package
     * 
     */
    $scope.saveSubscriptionInfo = function () {
        $scope.request = {
            no_of_employees: $scope.sub_info.employees,
            active_since: $scope.sub_info.years,
            recruitment_per_year: $scope.sub_info.recruitment,
            data_type: 1
        };
        userService.saveSubscriptionInfo($scope.request, function (response) {
            if (response.data.status == 200) {
                $state.go('subscription_plans', {plan_id: response.data.plan_id});
            } else {
                var data = {title: 'oops', text: response.data.message, type: 'error'};
                commonService.showMessage(data);
            }
        });
    };

    /**
     * This method is used for displaying all offers in the web app
     * @returns {array} all offers of the web app
     */
    $scope.getAllOffers = function () {
        userService.getAllOffers({}, function (response) {
            if (response.data.status == 200) {
                $scope.all_offers = response.data.data;
            } else {
                var data = {title: 'oops', text: response.data.message, type: 'error'};
                commonService.showMessage(data);
            }
        });
    };

    /**
     * This method is used for displaying all subscription plans
     * @returns {array} all plans raw data
     */
    $scope.getAllSubscriptionPlans = function () {
        commonService.loadingPopup();
        var suggested_plans_id = atob($state.params.plan_id);
        var data = suggested_plans_id.split('-'); // get suggested plans id by system

        var suggested_plans = [];
        angular.forEach(data, function (value, key) {
            suggested_plans.push(parseInt(value));
        });
        $scope.suggested_plans = suggested_plans;
        userService.getAllSubscriptionPlans({}, function (response) {
            if (response.data.status == 200) {
                $scope.all_plans = response.data.data;
                $scope.getAllOffers();
            } else {
                var data = {title: 'oops', text: response.data.message, type: 'error'};
                commonService.showMessage(data);
            }
            $timeout(commonService.closePopup(), 200); // hide processing popup 
        });
    };

    /**
     * This method is used on selection of yearly/mopnthly plan to get plans detail form plan_id
     * @param {int} plan_id 
     * @param {int} data_type 
     * @returns {array} returns single plans information
     */
    $scope.getPlanInfoById = function () {
        commonService.loadingPopup();
        $scope.request = {plan_id: atob($state.params.suggested_plan), data_type: 1};
        userService.getPlanInfoById($scope.request, function (response) {
            if (response.data.status == 200) {
                $scope.selected_plan = response.data.data;
                $scope.subscription_type = response.data.data.interval_count; // pre selected subscription for one month
            } else {
                var data = {title: 'oops', text: response.data.message, type: 'error'};
                commonService.showMessage(data);
            }
            $timeout(commonService.closePopup(), 200); // hide processing popup 
        });
    };


    /**
     * Subscription select form
     * @returns {undefined}
     */
    $scope.selectSubscriptionPlan = function () {
        $state.go('pay_payment', {plan_id: btoa($scope.selected_plan.id), interval: btoa($scope.subscription_type)});
    };


    /**
     * 
     * @returns {undefined}
     */
    $scope.initatePayment = function () {
        commonService.loadingPopup();
        $scope.request = {plan_id: atob($state.params.plan_id), interval: atob($state.params.interval), data_type: 1};
        userService.getInvoiceOfPayment($scope.request, function (response) {
            if (response.data.status == 200) {
                $scope.payment = {interval: $state.params.interval, user_id: response.data.data.user_id, currency: response.data.data.plan.currency, plan_id: response.data.data.plan.id, stripe_plan_id: response.data.data.stripe_plan_id, total: response.data.data.total, data_type: 1};
                $scope.invoice_data = response.data.data;
            } else {
                var data = {title: 'oops', text: response.data.message, type: 'error'};
                commonService.showMessage(data);
            }
            $timeout(commonService.closePopup(), 200); // hide processing popup 
        });
    };

    $scope.processPayment = function () {
        commonService.loadingPopup();
        userService.processPayment($scope.payment, function (response) {
            if (response.data.status == 200) {
                swal({
                    title: "Success!",
                    text: "Your payment is being processed. We'll email you when your details have been verified.",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#63CE0A",
                    confirmButtonText: "OK",
                    closeOnConfirm: true},
                function () {
                    $state.go('employer_profile_step_two', {id: 0, type: 1});
                });
            } else {
                var data = {title: 'oops', text: response.data.response, type: 'error'};
                commonService.showMessage(data);
            }
        });
    };

    $scope.getEmployerProfileViewDetails = function () {
        commonService.loadingPopup();
        userService.getEmployerProfileViewDetails({}, function (response) {
            if (response.data.status == 200) {
                $scope.employerDetail = response.data.data;
                $timeout(commonService.closePopup(), 200); // hide processing popup
            } else {
                var data = {title: 'oops', text: response.data.response, type: 'error'};
                commonService.showMessage(data);
            }
        });

    };

    /* Delete client profile */
    $scope.deleteClient = function (id) {
        swal({
            title: "Are you sure?",
            text: "Deleted data will not be recover!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false},
        function () {
            userService.deleteCandidate({profile_id: id}, function (response) {
                if (response.data.status == 200) {
                    $timeout(commonService.closePopup(), 200); // hide processing popup
                    $state.reload();
                } else {
                    var data = {title: 'oops', text: response.data.response, type: 'error'};
                    commonService.showMessage(data);
                }
            });
        });

    };


    /* send contact us page */
    $scope.sendContactUs = function () {
        $scope.request = {
            name: $scope.user.name,
            email: $scope.user.email,
            message: $scope.user.message
        };
        commonService.loadingPopup();
        userService.sendinquiry($scope.request, function (response) {
            if (response.data.status == 200) {
                $scope.user = {'name': '', 'email': '', 'message': ''}; //empty $scope.use data from form
                $scope.submitted = false;
                $scope.contact.$setUntouched();
                swal({
                    title: "Success!",
                    text: response.data.message,
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#63CE0A",
                    confirmButtonText: "OK",
                    closeOnConfirm: true},
                function () {

                });
            } else {
                var data = {title: 'oops', text: response.data.message, type: 'error'};
                commonService.showMessage(data);
            }
        });
    }
	
	
	$scope.getProfessionalSearch = function(page){
		commonService.loadingPopup();
		var filter = [];
		$scope.currentPage = page;
		$scope.maxSize = 5;
		var request = { name : $scope.str != undefined ? $scope.str : '' , data: filter, data_type:1 ,page:$scope.currentPage};
        var methods = {
            filter: userService.getFilters({}),
            searchRecords: userService.searchProfessionals(request),
        };
        $q.all(methods).then(function (methods) {
            var response = _.filter(methods, function (obj) {
                return obj.status != 200 || !obj.data || obj.data.status != 200
            });

            if (response.length > 0) {
                swal("Oops...", 'Technical error. Please try again later', 'error');
            } else {
                $scope.filters = methods.filter.data.data;
                console.log(methods.searchRecords);
                $scope.result = methods.searchRecords.data.data.records;
				$scope.total = methods.searchRecords.data.data.count;
                $timeout(commonService.closePopup(), 200); // hide processing popup 
            }
        });
	}
	
	$scope.pageChanged = function(){
		  $scope.getProfessionalSearch($scope.currentPage);
		}
		
	 /* Suggessions */
	  $scope.getSuggestions = function(val) {
			return $http.get(API_URL+'employer/getAutocompleteSearchData', {
			  params: {
				keyword: val
			  }
			}).then(function(response){
			  return response.data.data.map(function(item){
				return item.name;
			  });
			});
		  };
	
	$scope.applyFilter = function(name){
		
		var filter = [];
		for(var i=0;i<$scope.filters.length;i++){
			var checked = [];
			for(var k=0;k<$scope.filters[i].attribute_options.length;k++){
				if($scope.filters[i].attribute_options[k].checked == true){
					checked.push({id:$scope.filters[i].attribute_options[k].id});
				}
			}
			if(checked.length>0){
				filter.push({id:$scope.filters[i].id, attribute_options:checked});
			}
		}
		
		var request = { name : $scope.str != undefined ? $scope.str : '' , data: filter, data_type:1 ,page:1};
		commonService.loadingPopup();
        userService.searchProfessionals(request, function (response) {
            if (response.data.status == 200) {
				$scope.result = response.data.data.records;
				$scope.total = response.data.data.count;
                $timeout(commonService.closePopup(), 200); // hide processing popup
            } else {
                var data = {title: 'oops', text: response.data.response, type: 'error'};
                commonService.showMessage(data);
            }
        });
		
	}
	
	
});

angular.module('procircle').controller("childUsersCtrl", function ($scope, $cookieStore, $stateParams, $http, $timeout, $state, $rootScope, $window, userService, commonService, ModalService) {
    $scope.saveUser = function () {
        $scope.request = {register_type: $state.params.type, twitter_temp_id: $state.params.id, social_id: $state.params.social_id, email: $scope.live_data.email, role_id: $scope.live_data.user_type, data_type: 1};
        commonService.loadingPopup();
        userService.twitterLogin($scope.request, function (response) {
            if (response.data.status == 200) {
                commonService.closePopup();
            } else {
                var data = {title: 'oops', text: response.data.message, type: 'error'};
                commonService.showMessage(data);
            }
        });
    }
});
