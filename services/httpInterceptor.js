/*
 * @file: httpInterceptor.js
 * @description: This file contains the code to implement steps while intercepting a request/response packet sent/recieved on our app
 * @author: Manish Kumar
 * @date: 12 June-2017
 * */

angular.module("procircle").factory('httpInjector', function ($q, $rootScope, jwtHelper, $cookieStore, $injector) {
    return {
        'request': function (config) {
            var token = $cookieStore.get('X-Token');
            if (token) {
                config.headers['X-Token'] = token;   //adding session token to the header of the request packet
            }
            return config;
        },
        'response': function (response) {
            // do something on success
            if (response.data.status == 405) {//if the session of the user is Expired then log him/her out
                var userService = $injector.get('userService');
                var commonService = $injector.get('commonService');
                userService.clearCredentials();
                $injector.get('$state').transitionTo('login');

            } else if (response.headers('X-Token') && response.data.status == 200) {

                var access_token = response.headers('X-Token');
                var user_data = response.data.data;
                var userService = $injector.get('userService');
                //Check if remember me check then save login details                            
                userService.saveToken(access_token);//Save Token returned from api
                userService.saveUserData(user_data);//Save Token returned from api
                /* Redirect user's on dashboard according their dashboard */
                if (parseInt(user_data.role_id) == 2) {
                    angular.element(".modalbackdrop").remove();

                    if (user_data.steps_completed == "1") {
                        console.log(user_data.steps_completed);
                        $injector.get('$state').transitionTo('employer_profile');
                    }
                    if (user_data.steps_completed == "2") {
                        $injector.get('$state').transitionTo('subscription_info');
                    }
                    if (user_data.steps_completed == "3") {
                        $injector.get('$state').transitionTo('subscription_plans', {plan_id: user_data.plan_id});

                    }
                    if (user_data.steps_completed == "4") {
                        $injector.get('$state').transitionTo('employer_profile_step_two', {id: 0, type: 1});
                    } else if (user_data.steps_completed == "5") {
                        $injector.get('$state').transitionTo('employer_profile_view');
                    }

                } else if (parseInt(user_data.role_id) == 3) {
                    angular.element(".modalbackdrop").remove();
                    if (user_data.steps_completed == "1") {
                        $injector.get('$state').transitionTo('main.create-professional-profile');
                    }
                    if (user_data.steps_completed == "2") {
                        $injector.get('$state').transitionTo('start_professional_personality_test');
                    }
                    if (user_data.steps_completed == "3") {
                        $injector.get('$state').transitionTo('professional_personality_test_result');
                    }
                    if (user_data.steps_completed == "4") {
                        $injector.get('$state').transitionTo('get_professional_profile');
                    }
                    //$injector.get('$state').transitionTo('main.create-professional-profile');
                }
                var commonService = $injector.get('commonService');
                commonService.closePopup();
            }
            return response;
        },
        'requestError': function (rejection) {
            return $q.reject(rejection);
        },
        'responseError': function (rejection) {
            var deferred = $q.defer();

            if (!rejection.data) {           //if timeout error occurs
                rejection.data = {
                    "statusCode": 408,
                    "error": "error",
                    "message": "Error occurred. Please try after some time"
                };
                deferred.resolve(rejection);
                return deferred.promise;
            } else {
                deferred.resolve(rejection);
                return deferred.promise;
            }
        }
    };
});
