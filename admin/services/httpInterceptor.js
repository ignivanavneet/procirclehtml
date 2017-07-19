/*
 * @file: httpInterceptor.js
 * @description: This file contains the code to implement steps while intercepting a request/response packet sent/recieved on our app
 * @author: Manish Kumar
 * @date: 12 June-2017
 * */

angular.module("procircle_admin").factory('httpInjector', function ($q, $rootScope, jwtHelper,$cookieStore, $injector) {
    return {
        'request': function (config) {
            var token = $cookieStore.get('token');
            if (token) {
                config.headers['token'] = token;   //adding session token to the header of the request packet
            }
            return config;
        },
        'response': function (response) {
         
            // do something on success 
            if (response.data.status == 405 ) {//if the session of the user is Expired then log him/her out
                var userService = $injector.get('userService');
                userService.clearCredentials(function () {
                    $injector.get('$state').transitionTo('/');
                });
            }
            else if (response.headers('token') && response.data.status == 200 ) {
                var access_token = response.headers('token');
                var user_data = jwtHelper.decodeToken(access_token); // decode token
                var userService = $injector.get('userService');
                //Check if remember me check then save login details                            
                userService.saveToken(access_token);//Save Token returned from api
                userService.saveUserData(user_data);//Save Token returned from api
                
                $injector.get('$state').transitionTo('employers');
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
