/**
 * @file: professionalCtrl.js
 * @author: Manish Kumar
 * @description: This Js Controller is used for all the functioning related to users.
 * */

angular.module('procircle').controller("professionalCtrl", function ($q, $window, $scope, $cookieStore, $stateParams, $http, $timeout, $state, $rootScope, $window, userService, commonService, ModalService, Upload, BASE_PATH,API_URL) {

	$scope.baseurl = BASE_PATH;
    $scope.heading = "Professionals";
    $scope.currentPage = 1;

    /*
     * @name : Professional Personality Trait Questionaier
     * @Discription : Professional Personality
     */
    $scope.personalityQuestionair = function () {
        commonService.loadingPopup();
        var request = {page: ($scope.currentPage) ? $scope.currentPage : 1};
        userService.personalityQuestionair(request, function (response) {
            if (response.data.status == 200) {
                $scope.currentPage = response.data.response.current_page || 1;
                $scope.data = response.data.response;
                $scope.totalAnswer = response.data.total_answers;
                $window.scrollTo(0, 0);
                $timeout(commonService.closePopup(), 1000); // hide processing popup
            } else {
                var data = {title: 'oops', text: response.data.message, type: 'error'};
                commonService.showMessage(data);
            }
        })
    };

    $scope.professionalStartPersonalityQuestionair = function () {
        var request = {page: ($scope.currentPage) ? $scope.currentPage : 1};
        userService.personalityQuestionair(request, function (response) {
            if (response.data.status == 200) {
                $scope.totalAttemptAnswer = response.data.total_answers;
                if (response.data.total_answers == 50) {
                    $state.go('professional_personality_test_result');
                } else {
                    $scope.currentPage = response.data.response.current_page || 1;
                    $scope.data = response.data.response;
                    $scope.totalAnswer = response.data.total_answers;
                    $window.scrollTo(0, 0);
                }

            } else {
                var data = {title: 'oops', text: response.data.message, type: 'error'};
                commonService.showMessage(data);
            }
        })
    };

    $scope.saveAnswers = function (question_id, option_id) {
        var request = {question_id: question_id, option_id: option_id, data_type: 1};
        //commonService.loadingPopup();
        userService.saveAnswers(request, function (response) {
            if (response.data.status == 200) {
                $scope.totalAnswer = response.data.total_answers;
                // $timeout(commonService.closePopup(), 1000); // hide processing popup
            } else {
                var data = {title: 'oops', text: response.data.message, type: 'error'};
                commonService.showMessage(data);
            }
        })
    }


    $timeout(function () {
        $('.matchSlider').owlCarousel({
            loop: true,
            margin: 30,
            nav: true,
            navText: ['<img src="assets/images/nav-arrow-left.jpg" alt="" />', '<img src="assets/images/nav-arrow-right.jpg" alt="" />'],
            navigation: true,
            autoHeight: true,
            center: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 3
                },
                1100: {
                    items: 5
                }
            }
        });

        var lineyBtn = document.getElementById("nav-icon1");

        var mobileMenu = document.getElementById("asideOpen");

        lineyBtn.onclick = function () {
            mobileMenu.style.right = "0";
        }

        window.onclick = function (event) {
            if (event.target == mobileMenu) {
                mobileMenu.style.right = "-250px";
            }
        }
    }, 500)


    /* Get Professional Profile */
    $scope.getProfessionalProfile = function () {
        commonService.loadingPopup();
        userService.getProfessionalProfile({}, function (response) {
            if (response.data.status == 200) {
                $scope.details = response.data.data.details;
                for (var i = 0; i < $scope.details.length; i++) {
                    if ($scope.details[i].input_type == 'checkbox') {
                        var count = 0;
                        for (var k = 0; k < $scope.details[i].attribute_options.length; k++) {
                            if ($scope.details[i].attribute_options[k].is_checked == true) {
                                count++;
                            }
                        }
                        if (count > 0) {
                            $scope.details[i].page = true;
                        } else {
                            $scope.details[i].page = '';
                        }
                    }
                }
                $scope.name = response.data.name;
                $scope.profilePicture = response.data.profile_pic;
                $timeout(commonService.closePopup(), 1000); // hide processing popup
            } else {
                var data = {title: 'oops', text: response.data.message, type: 'error'};
                commonService.showMessage(data);
            }
        });
    }


    /* Get Professional Personality Test Result */
    $scope.getProfessionalPersoanlityTestResult = function () {
        commonService.loadingPopup();
        userService.getProfessionalPersonalityTraitResult({}, function (response) {
            if (response.data.status == 200) {
                $scope.data = response.data.data;
                $timeout(commonService.closePopup(), 1000); // hide processing popup
            } else {
                var data = {title: 'oops', text: response.data.message, type: 'error'};
                commonService.showMessage(data);
            }
        });
    }

    /* Get Professional Profile */
    $scope.getProfessionalProfileView = function () {
        commonService.loadingPopup();
        userService.getProfessionalProfileDetail({}, function (response) {
            if (response.data.status == 200) {
                $scope.data = response.data.data;
                $scope.data.Work_Experience = JSON.parse($scope.data.Work_Experience);
                $timeout(commonService.closePopup(), 1000); // hide processing popup
            } else {
                var data = {title: 'oops', text: response.data.message, type: 'error'};
                commonService.showMessage(data);
            }
        });
    }


    /* Get Professional Personality Test Result */
    $scope.getProfessionalPersoanlityTestResult = function () {
        commonService.loadingPopup();
        userService.getProfessionalPersonalityTraitResult({}, function (response) {
            if (response.data.status == 200) {
                $scope.data = response.data.data;
                $timeout(commonService.closePopup(), 1000); // hide processing popup
            } else {
                var data = {title: 'oops', text: response.data.message, type: 'error'};
                commonService.showMessage(data);
            }
        });
    }


    /**
     * save Professional profile 
     */
    $scope.createProfessionalProfile = function () {
        commonService.loadingPopup();
        var details = [];
        for (var i = 0; i < $scope.details.length; i++) {
            var attribute_option = [];
            for (var k = 0; k < $scope.details[i].attribute_options.length; k++) {
                /****************************/
                if ($scope.details[i].input_type == 'text') {
                    attribute_option.push({
                        id: $scope.details[i].attribute_options[k].id,
                        attribute_type: '',
                        attribute_value: $scope.details[i].attribute_options[k].attribute_value
                    });
                } else if ($scope.details[i].input_type == "checkbox" &&
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

                } else if ($scope.details[i].input_type == "dropdown" &&
                        $scope.details[i].attribute_options[k].id ==
                        $scope.details[i].selectedValue.id

                        ) {
                    if ($scope.details[i].attribute_options[k].info == '1') {
                        attribute_option.push({
                            id: $scope.details[i].attribute_options[k].id,
                            attribute_type: 'other',
                            attribute_value: $scope.details[i].selectedValue.professional[0].attribute_value
                        });
                    } else {
                        attribute_option.push({
                            id: $scope.details[i].selectedValue.id,
                            attribute_type: '',
                            attribute_value: ''
                        });
                    }


                } else if ($scope.details[i].input_type == "url") {
                    var value = $scope.details[i].attribute_options[k].attribute_value;
                    if (value != undefined && value != '') {
                        attribute_option.push({
                            id: $scope.details[i].attribute_options[k].id,
                            attribute_type: '',
                            attribute_value: $scope.details[i].attribute_options[k].attribute_value != undefined ?
                                    $scope.details[i].attribute_options[k].attribute_value : ''
                        });

                    }


                } else if ($scope.details[i].input_type == "textarea") {
                    var value = $scope.details[i].attribute_options[k].attribute_value;
                    if (value != undefined && value != '') {
                        attribute_option.push({
                            id: $scope.details[i].attribute_options[k].id,
                            attribute_type: '',
                            attribute_value: $scope.details[i].attribute_options[k].attribute_value != undefined ?
                                    $scope.details[i].attribute_options[k].attribute_value : ''
                        });
                    }
                } else if ($scope.details[i].input_type == "more-text") {
                    var input = $scope.details[i].attribute_options[k].attribute_value;
                    var ex = [];
                    for (var l = 0; l < $scope.details[i].attribute_options[k].attribute_value.length; l++) {
                        var name = $scope.details[i].attribute_options[k].attribute_value[l].name;
                        if (name != null && name.trim() != '') {
                            ex.push({name: name});
                        }
                    }

                    attribute_option.push({
                        id: $scope.details[i].attribute_options[k].id,
                        attribute_type: '',
                        attribute_value: ex
                    });

                } else if ($scope.details[i].input_type == "file") {
                    var value = $scope.details[i].attribute_options[k].attribute_value;
                    if (value != undefined && value != '') {
                        attribute_option.push({
                            id: $scope.details[i].attribute_options[k].id,
                            attribute_type: '',
                            attribute_value: $scope.details[i].attribute_options[k].attribute_value != undefined ?
                                    $scope.details[i].attribute_options[k].attribute_value : ''
                        });
                    }

                } else if ($scope.details[i].input_type == "group-text") {
                    var value = $scope.details[i].attribute_options[k].attribute_value;
                    if (value != undefined && value != '') {
                        attribute_option.push({
                            id: $scope.details[i].attribute_options[k].id,
                            attribute_type: '',
                            attribute_value: $scope.details[i].attribute_options[k].attribute_value != undefined ?
                                    $scope.details[i].attribute_options[k].attribute_value : ''
                        });
                    }
                }
                /****************************/
            }
            var records = {
                id: $scope.details[i].id,
                input_type: $scope.details[i].input_type,
                attribute_options: attribute_option
            };
            details.push(records);
        }
        var request = {
            details: details,
            name: $scope.name,
            data_type: 1
        };
        
        userService.createProfessionalProfile(request, function (response) {
            if (response.data.status == 200) {
                userService.getStepCompletedValues({}, function (response) {
                   if (response.data.status == 200) {
                        var loginUserCookie = $cookieStore.get('user_data');
                        loginUserCookie.steps_completed = response.data.data.steps_completed;
                        userService.saveUserData(loginUserCookie);
                        $rootScope.step_completed = parseInt(response.data.data.steps_completed);
                        if (parseInt(response.data.data.steps_completed) == 3 || parseInt(response.data.data.steps_completed) == 4) {
                            $state.go('get_professional_profile');
                        } else {
                            $state.go('start_professional_personality_test');
                        }
                        $timeout(commonService.closePopup(), 200); // hide processing popup
                       
                    } else {
                        var data = {title: 'oops', text: response.data.message, type: 'error'};
                        commonService.showMessage(data);
                    }
                });
            } else {
                var data = {title: 'oops', text: response.data.message, type: 'error'};
                commonService.showMessage(data);

            }

        });
    }

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
                    userService.getProfessionalProfile({}, function (response) {
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

    $scope.selectBoxChange = function (data, index, id) {
        var checked = 0;
        for (var i = 0; i < data.length; i++) {
            if (data[i].is_checked == true) {
                checked++;
            }
        }
        if (checked > 0) {
            $scope.details[index].page = true;
        } else {
            $scope.details[index].page = '';
        }
        angular.element('#check-' + id).triggerHandler('click');
    }

    $scope.uploadCv = function (input, outerIndex, innerIndex, error) {
        if (input != null) {
            commonService.loadingPopup();
            var request = {file_to_upload: input};

            Upload.upload({
                method: 'POST',
                url: API_URL + 'professional/uploadCV',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                arrayKey: '',
                data: request
            }).then(function (response) {
                if (response.data.status == 200) {
                    $scope.details[outerIndex].attribute_options[innerIndex].attribute_value = response.data.cv;
                    swal({title:"Success.", text:'File uploaded successfully.', type:'success',timer:2000});
                } else {
                    swal("Oops...", response.data.message, 'error');
                    $scope.requestSend = false;
                }
            });
        }

    };

    $scope.addMoreExperience = function (outerindex) {
        $scope.details[outerindex].attribute_options[0].attribute_value.push({name: ''});
    };

    $scope.removeExperience = function (outerIndex, Index) {
        $scope.details[outerIndex].attribute_options[0].attribute_value.splice(Index, 1)

    };


    /* Professional Final Step */
    $scope.creatProfessionalFinalStep = function () {
        commonService.loadingPopup();
        userService.createProfessionalFinal({}, function (response) {
            if (response.data.status == 200) {
                $state.go('get_professional_profile');
                $timeout(commonService.closePopup(), 1000); // hide processing popup
            } else {
                var data = {title: 'oops', text: response.data.message, type: 'error'};
                commonService.showMessage(data);
            }
        });
    };

    /* Submit Professional Test */
    $scope.submitProfessionalTest = function () {
        commonService.loadingPopup();
        userService.submitProfessionalTest({}, function (response) {
            if (response.data.status == 200) {
                $state.go('professional_personality_test_result');
                $timeout(commonService.closePopup(), 1000); // hide processing popup
            } else {
                var data = {title: 'oops', text: response.data.message, type: 'error'};
                commonService.showMessage(data);
            }
        });
    };

    /* Submit Professional Test */
    $scope.getProfessionalStepCompleted = function () {
        commonService.loadingPopup();
        userService.getProfessionalStep({}, function (response) {
            if (response.data.status == 200) {
                $scope.most_step_completed = response.data.step_no;
                if (response.data.step_no == 3) {
                    $state.go('professional_personality_test_result');
                }
                $timeout(commonService.closePopup(), 1000); // hide processing popup
            } else {
                var data = {title: 'oops', text: response.data.message, type: 'error'};
                commonService.showMessage(data);
            }
        });
    };

    $scope.removeCV = function (outerIndex, index) {
        $scope.details[outerIndex].attribute_options[index].upload_value = '';
        $scope.details[outerIndex].attribute_options[index].attribute_value = '';
    }

});


angular.module('procircle').directive('myYoutube', function ($sce) {
    return {
        restrict: 'EA',
        scope: {code: '='},
        replace: true,
        template: '<div style="height:400px;"><iframe style="overflow:hidden;height:100%;width:100%" width="100%" height="100%" src="{{url}}" frameborder="0" allowfullscreen></iframe></div>',
        link: function (scope) {
            scope.$watch('code', function (newVal) {
                if (newVal) {
					 var res = newVal.split("/");
					 if(res[2] == 'www.youtube.com' || res[2] == 'youtube.com'){
						 var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
						 var match = newVal.match(regExp);
						 if (match && match[2].length == 11){
							 scope.url = $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + match[2]);
						 }else{
							 scope.url = $sce.trustAsResourceUrl('' + newVal);
						 }
					 }else{
						  scope.url = $sce.trustAsResourceUrl('' + newVal);
					 }
                }
            });
        }
    };
});


