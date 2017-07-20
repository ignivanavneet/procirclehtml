/**
 * file : userService.js
 * description : Basic users functions
 * author: Sachin Jariyal
 * date: 08 June 2017
 */

'use strict';
angular.module("procircle").factory('userService',
        ['$http', '$q', '$cookieStore', '$rootScope', '$timeout', '$location', 'commonService', 'API_URL',
            function ($http, $q, $cookieStore, $rootScope, $timeout, $location, commonService, API_URL) {
                var obj = {};


                obj.saveToken = function (request) {
                    $cookieStore.put('X-Token', request);
                };
                obj.saveUserData = function (request) {
                    $cookieStore.put('user_data', request);
                };

                obj.getToken = function () {
                    $cookieStore.get('X-Token');
                };

                obj.clearCredentials = function () {
                    $cookieStore.remove('X-Token');
                    $cookieStore.remove('user_data');
                };
                /*
                 * @Name :- service for signup
                 * @Description :- used for signing up a user
                 */
                obj.signup = function (sendData, callback) {
                    $rootScope.submitted = true;
                    $http({
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        url: API_URL + 'user/register',
                        data: sendData
                    }).then(function (response) {
                        callback(response);
                    });
                };

                /* @Name for social sign up token
                 *@Description: Used for sign up social login
                 */
                obj.socialsignup = function (sendData, callback) {
                    $rootScope.submitted = true;
                    $http({
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        url: API_URL + 'user/socialRegisterOrLogin',
                        data: sendData
                    }).then(function (response) {
                        callback(response);
                    });
                };

                /* @Name for social account check
                 *@Description: Used for social account check
                 */
                obj.socialcheck = function (sendData, callback) {
                    $rootScope.submitted = true;
                    $http({
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        url: API_URL + 'user/checkSocialLoginExistance',
                        data: sendData
                    }).then(function (response) {
                        callback(response);
                    });
                };

                /*
                 * @Name :- service for signup
                 * @Description :- used for signing up a user
                 */
                obj.signIn = function (sendData, callback) {
                    $rootScope.submitted = true;
                    $http({
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        url: API_URL + 'user/login',
                        data: sendData
                    }).then(function (response) {
                        callback(response);
                    });
                };

                /*
                 * @Name :- Activate user
                 * @Description :- service for activating user from clicking link on email 
                 */
                obj.activateUser = function (sendData, callback) {
                    $http({
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        url: API_URL + 'user/activateAccount',
                        data: sendData
                    }).then(function (response) {
                        callback(response);
                    });
                };
                /*
                 * 
                 * @Name :- forgotPassword
                 * @Description :- Send forgot password email to user
                 */
                obj.forgotPassword = function (sendData, callback) {
                    $http({
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        url: API_URL + 'user/forgotPassword',
                        data: sendData
                    }).then(function (response) {
                        callback(response);
                    });
                };
                /*
                 * @Name :- resetPassword
                 * @Description :- function for resetting password on the platform
                 */
                obj.resetPassword = function (sendData, callback) {
                    $http({
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        url: API_URL + 'user/resetPassword',
                        data: sendData
                    }).then(function (response) {
                        callback(response);
                    });
                };
                /*
                 * @Name :- resetPassword
                 * @Description :- function for resetting password on the platform
                 */
                obj.resendForgotEmail = function (sendData, callback) {
                    $http({
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        url: API_URL + 'user/resendForgotPassword',
                        data: sendData
                    }).then(function (response) {
                        callback(response);
                    });
                };
                /*
                 * @Name :- resendActivationMail
                 * @Description :- function for resend activation mail
                 */
                obj.resendActivationMail = function (sendData, callback) {
                    $http({
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        url: API_URL + 'user/resendActivationLink',
                        data: sendData
                    }).then(function (response) {
                        callback(response);
                    });
                };


                /* @Name for twitter login 
                 * @Description: Used for sign up twitter login
                 */
                obj.twitterLogin = function (sendData, callback) {
                    $rootScope.submitted = true;
                    $http({
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        url: API_URL + 'user/twitterLogin',
                        data: sendData
                    }).then(function (response) {
                        callback(response);
                    });
                };

                /* @Name for twitter login 
                 * @Description: Used for sign up twitter login
                 */
                obj.loginWithTwitter = function (sendData, callback) {
                    $rootScope.submitted = true;
                    $http({
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        url: API_URL + 'user/getUserInfoById',
                        data: sendData
                    }).then(function (response) {
                        callback(response);
                    });
                };


                /* @Name Get User profile 
                 * @Description: get user's first setep profile
                 */
                obj.getUserFirstStep = function (sendData, callback) {
                    var req = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: sendData,
                        url: API_URL + 'user/getEmployerDetails',
                    };
                    if (typeof callback === "function") {
                        $http(req).then(function successCallback(response) {
                            callback(response);

                        }, function errorCallback(response) {
                            callback(response);
                        });
                    } else {
                        var deferred = $q.defer();
                        $http(req).then(function (response) {
                            deferred.resolve(response);
                        });
                        return deferred.promise;

                    }
                };

                /* @Name Get User profile 
                 * @Description: get user's first setep profile
                 */
                obj.getSectors = function (data, callback) {
                    var req = {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        url: API_URL + 'common/getSectors',
                    };
                    if (typeof callback === "function") {
                        $http(req).then(function successCallback(response) {
                            callback(response);

                        }, function errorCallback(response) {
                            callback(response);
                        });
                    } else {
                        var deferred = $q.defer();
                        $http(req).then(function (response) {
                            deferred.resolve(response);
                        });
                        return deferred.promise;

                    }
                };

                /* @Name Get User profile 
                 * @Description: get user's first setep profile
                 */
                obj.getCompanySizeArray = function (data, callback) {
                    var req = {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        url: API_URL + 'common/getCompanySizeArray',
                    };
                    if (typeof callback === "function") {
                        $http(req).then(function successCallback(response) {
                            callback(response);

                        }, function errorCallback(response) {
                            callback(response);
                        });
                    } else {
                        var deferred = $q.defer();
                        $http(req).then(function (response) {
                            deferred.resolve(response);
                        });
                        return deferred.promise;

                    }
                };


                /* @Name Get User profile 
                 * @Description: get user's first setep profile
                 */
                obj.saveFirstStep = function (sendData, callback) {
                    var req = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        url: API_URL + 'user/saveEmployerDetails',
                        data: sendData
                    };
                    if (typeof callback === "function") {
                        $http(req).then(function successCallback(response) {
                            callback(response);

                        }, function errorCallback(response) {
                            callback(response);
                        });
                    } else {
                        var deferred = $q.defer();
                        $http(req).then(function (response) {
                            deferred.resolve(response);
                        });
                        return deferred.promise;

                    }
                };

                obj.getEmployerProfileStepTwo = function (sendData, callback) {
                    var req = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        url: API_URL + 'employer/getProfileStepOneDetails',
                        data: sendData
                    };
                    if (typeof callback === "function") {
                        $http(req).then(function successCallback(response) {
                            callback(response);

                        }, function errorCallback(response) {
                            callback(response);
                        });
                    } else {
                        var deferred = $q.defer();
                        $http(req).then(function (response) {
                            deferred.resolve(response);
                        });
                        return deferred.promise;

                    }
                };
                obj.createEmployerProfileStepOne = function (sendData, callback) {
                    var req = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        url: API_URL + 'user/saveEmployerProfileStepOne',
                        data: sendData
                    };
                    if (typeof callback === "function") {
                        $http(req).then(function successCallback(response) {
                            callback(response);

                        }, function errorCallback(response) {
                            callback(response);
                        });
                    } else {
                        var deferred = $q.defer();
                        $http(req).then(function (response) {
                            deferred.resolve(response);
                        });
                        return deferred.promise;

                    }
                };


                /* @Name getAllSubscriptionPlans
                 * @Description: Used to get all plans of the web app
                 */
                obj.getAllSubscriptionPlans = function (sendData, callback) {
                    $http({
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'GET',
                        url: API_URL + 'user/getAllSubscriptionPlans',
                        //data: sendData
                    }).then(function (response) {
                        callback(response);
                    });
                };

                /* @Name for professionals personality questionair
                 * @Description: Used for personality questionair
                 */
                obj.personalityQuestionair = function (sendData, callback) {
                    $rootScope.submitted = true;
                    $http({
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'GET',
                        url: API_URL + 'professional/personalityQuestionListing/?' + commonService.arrayObjectToSting(sendData),
                    }).then(function (response) {
                        callback(response);
                    });
                };

                obj.saveAnswers = function (sendData, callback) {
                    $rootScope.submitted = true;
                    $http({
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        url: API_URL + 'professional/savePersonalityQuestionListing',
                        data: sendData
                    }).then(function (response) {
                        callback(response);
                    });
                };


                /* @Name for employee personality questionair
                 * @Description: Used for personality questionair
                 */
                obj.employeepersonalityQuestionair = function (sendData, callback) {
                    $rootScope.submitted = true;
                    $http({
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'GET',
                        url: API_URL + 'employee/personalityQuestionListing?' + commonService.arrayObjectToSting(sendData),
                    }).then(function (response) {
                        callback(response);
                    });
                };


                obj.employeesaveAnswers = function (sendData, callback) {
                    $rootScope.submitted = true;
                    $http({
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        url: API_URL + 'employee/savePersonalityQuestionListing',
                        data: sendData
                    }).then(function (response) {
                        callback(response);
                    });
                };

                /**
                 * Send Email to Employer and Employee for result notification and result
                 */
                obj.sendTestResultEmail = function (sendData, callback) {
                    $http({
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        url: API_URL + 'employee/sendResultToEmployer',
                        data: sendData
                    }).then(function (response) {
                        callback(response);
                    });
                };


                /* @Name for employer`s profile listing 
                 * @Description: Used for employer`s profile listing
                 */
                obj.employerProfileListing = function (sendData, callback) {
                    var req = {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        url: API_URL + 'employer/employerProfileListing'
                    };
                    if (typeof callback === "function") {
                        $http(req).then(function successCallback(response) {
                            callback(response);

                        }, function errorCallback(response) {
                            callback(response);
                        });
                    } else {
                        var deferred = $q.defer();
                        $http(req).then(function (response) {
                            deferred.resolve(response);
                        });
                        return deferred.promise;

                    }
                };

                /**
                 * method to save employees company details for subscription package selection
                 * @param {int} no_of_employees
                 * @param {int} active_since
                 * @param {int} recruitment_per_year
                 * @returns {int} plan_id this plan id shows select button on the package
                 */
                obj.saveSubscriptionInfo = function (sendData, callback) {
                    $http({
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        url: API_URL + 'employer/savePaymentPageDetails',
                        data: sendData
                    }).then(function (response) {
                        callback(response);
                    });
                };


                /**
                 * This method is used on selection of yearly/mopnthly plan to get plans detail form plan_id
                 * @param {int} plan_id 
                 * @returns {array} returns single plans information
                 */
                obj.getPlanInfoById = function (sendData, callback) {
                    $http({
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        url: API_URL + 'user/getPlanInfoById',
                        data: sendData
                    }).then(function (response) {
                        callback(response);
                    });
                };


                obj.getCandidateProfileStepTwo = function (sendData, callback) {
                    var req = {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        url: API_URL + 'employer/getProfileStepTwoDetails?' + commonService.arrayObjectToSting(sendData)
                    };

                    if (typeof callback === "function") {
                        $http(req).then(function successCallback(response) {
                            callback(response);

                        }, function errorCallback(response) {
                            callback(response);
                        });
                    } else {
                        var deferred = $q.defer();
                        $http(req).then(function (response) {
                            deferred.resolve(response);
                        });
                        return deferred.promise;

                    }
                };

                obj.createCandidateProfileStepThree = function (sendData, callback) {
                    var req = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        url: API_URL + 'employer/saveProfileSecondStep',
                        data: sendData
                    };
                    if (typeof callback === "function") {
                        $http(req).then(function successCallback(response) {
                            callback(response);

                        }, function errorCallback(response) {
                            callback(response);
                        });
                    } else {
                        var deferred = $q.defer();
                        $http(req).then(function (response) {
                            deferred.resolve(response);
                        });
                        return deferred.promise;

                    }
                };

                obj.sendinquiry = function (sendData, callback) {
                    var req = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        url: API_URL + 'user/contactUs',
                        data: sendData
                    };
                    if (typeof callback === "function") {
                        $http(req).then(function successCallback(response) {
                            callback(response);

                        }, function errorCallback(response) {
                            callback(response);
                        });
                    } else {
                        var deferred = $q.defer();
                        $http(req).then(function (response) {
                            deferred.resolve(response);
                        });
                        return deferred.promise;

                    }
                };


                obj.getProfessionalProfile = function (data, callback) {
                    var req = {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        url: API_URL + 'professional/getProfessionalProfileDetails',
                    };
                    if (typeof callback === "function") {
                        $http(req).then(function successCallback(response) {
                            callback(response);

                        }, function errorCallback(response) {
                            callback(response);
                        });
                    } else {
                        var deferred = $q.defer();
                        $http(req).then(function (response) {
                            deferred.resolve(response);
                        });
                        return deferred.promise;

                    }
                };

                obj.getProfessionalPersonalityTraitResult = function (sendData, callback) {
                    $http({
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'GET',
                        url: API_URL + 'professional/getProfessionalTestResult',
                        data: ''
                    }).then(function (response) {
                        callback(response);
                    });
                };

                obj.createProfessionalProfile = function (sendData, callback) {
                    var req = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        url: API_URL + 'professional/saveProfessionalProfileDetails',
                        data: sendData
                    };
                    if (typeof callback === "function") {
                        $http(req).then(function successCallback(response) {
                            callback(response);

                        }, function errorCallback(response) {
                            callback(response);
                        });
                    } else {
                        var deferred = $q.defer();
                        $http(req).then(function (response) {
                            deferred.resolve(response);
                        });
                        return deferred.promise;

                    }
                };


                obj.getInvoiceOfPayment = function (sendData, callback) {
                    $http({
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        url: API_URL + 'user/getInvoiceOfPayment',
                        data: sendData
                    }).then(function (response) {
                        callback(response);
                    });
                };


                obj.getProfessionalProfileDetail = function (sendData, callback) {
                    $http({
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'GET',
                        url: API_URL + 'professional/getProfessionalProfile',
                        data: ''
                    }).then(function (response) {
                        callback(response);
                    });
                };


                obj.processPayment = function (sendData, callback) {
                    $http({
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        url: API_URL + 'user/processPayment',
                        data: sendData
                    }).then(function (response) {
                        callback(response);
                    });
                };

                /* @Name getAllOffers
                 * @Description: Used to get all offers of the web app
                 */
                obj.getAllOffers = function (sendData, callback) {
                    $http({
                        headers: {'Content-Type': 'application/json'},
                        method: 'GET',
                        url: API_URL + 'user/getAllOffers'
                    }).then(function (response) {
                        callback(response);
                    });
                };

                obj.getEmployerProfileViewDetails = function (sendData, callback) {
                    var req = {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        url: API_URL + 'employer/getEmployerCompleteProfile'
                    };
                    if (typeof callback === "function") {
                        $http(req).then(function successCallback(response) {
                            callback(response);

                        }, function errorCallback(response) {
                            callback(response);
                        });
                    } else {
                        var deferred = $q.defer();
                        $http(req).then(function (response) {
                            deferred.resolve(response);
                        });
                        return deferred.promise;

                    }
                };

                obj.deleteCandidate = function (sendData, callback) {
                    $http({
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'GET',
                        url: API_URL + 'employer/deleteEmployerCandidateProfile?' + commonService.arrayObjectToSting(sendData),
                    }).then(function (response) {
                        callback(response);
                    });
                };
                
                /*
                 * @Name :- for last step of professional
                 * @Description :- used for final step of professional
                 */
                obj.createProfessionalFinal = function (sendData, callback) {
                    //$rootScope.submitted = true;
                    $http({
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        url: API_URL + 'professional/createProfessionalFinalStep',
                        data: sendData
                    }).then(function (response) {
                        callback(response);
                    });
                };
                
                
                /*
                 * @Name :- for submit professional test
                 * @Description :- used for save professional test
                 */
                obj.submitProfessionalTest = function (sendData, callback) {
                    //$rootScope.submitted = true;
                    $http({
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        url: API_URL + 'professional/submitProfessionalTestResult',
                        data: sendData
                    }).then(function (response) {
                        callback(response);
                    });
                };
                
                
                /*
                 * @Name :- for Get professional completed step
                 * @Description :- used for get professional step
                 */
                obj.getProfessionalStep = function (sendData, callback) {
                    //$rootScope.submitted = true;
                    $http({
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'GET',
                        url: API_URL + 'professional/getProfessionalProfileStepCompleted',
                        data: ''
                    }).then(function (response) {
                        callback(response);
                    });
                };
                
                
                 obj.getStepCompletedValues = function (sendData, callback) {
                    var req = {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        url: API_URL + 'user/getUserTokenData'
                    };
                    if (typeof callback === "function") {
                        $http(req).then(function successCallback(response) {
                            callback(response);

                        }, function errorCallback(response) {
                            callback(response);
                        });
                    } else {
                        var deferred = $q.defer();
                        $http(req).then(function (response) {
                            deferred.resolve(response);
                        });
                        return deferred.promise;

                    }
                };
				
				 obj.getFilters = function (sendData, callback) {
                    var req = {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        url: API_URL + 'user/getUserTokenData'
                    };
                    if (typeof callback === "function") {
                        $http(req).then(function successCallback(response) {
                            callback(response);

                        }, function errorCallback(response) {
                            callback(response);
                        });
                    } else {
                        var deferred = $q.defer();
                        $http(req).then(function (response) {
                            deferred.resolve(response);
                        });
                        return deferred.promise;

                    }
                };
                
                return obj;

            }]);


