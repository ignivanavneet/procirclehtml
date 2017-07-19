/**
 * file : userService.js
 * description : Basic users function
 * author: Manish Kumar
 * date: 10-05-2017
 */

'use strict';
angular.module("procircle_admin").factory('userService',

        ['$http', '$q', '$cookieStore', '$rootScope', '$timeout', '$location', 'commonService', 'API_URL',
            function ($http, $q, $cookieStore, $rootScope, $timeout, $location, commonService, API_URL,socketEventService) {

                var obj = {};                       
                
                /*
                * @Name :- login popup  
                * @Description :- function that open error popup
                */	  
                obj.loadingPopup = function(){
                        swal({   title: "Loading! ",   text: "<div class=\"progress\"><div class=\"progress-bar progress-bar-striped progress-bar-animated active\" role=\"progressbar\" aria-valuenow=\"75\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 100%\"></div></div>",   html  : true,  showConfirmButton: false });
                };

                /*
                * @Name :-  popup close  
                * @Description :- function that open error popup
                */			  
                obj.closePopup = function(){
                                swal.close()
                };

                obj.saveToken = function (request) {
                    $cookieStore.put('token', request);
                };
                obj.saveUserData = function (request) {
                    $cookieStore.put('user_data', request);
                };
                
                obj.getToken = function () {
                    $cookieStore.get('token');
                };
                
                obj.clearCredentials = function () {
                    $cookieStore.remove('token');
                };

                /*
                 * @Name :- User login service  
                 * @Description :- That return login user token
                 */
                obj.adminLogin = function (sendData, callback) {
                    $http({
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        url: API_URL+'admin/login',
                        data: sendData
                    }).then(function (response) {
                        callback(response);
                    });
                };
                
                /*
                 * @name: adminLogout
                 * @Description: Service for logout from admin panel
                 */
                obj.adminLogout = function (sendData, callback) {
                    var token = $cookieStore.get('token');
                    var user_data = $cookieStore.get('user_data');
                    if (token != undefined && user_data != undefined) {
                        $http({
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            method: 'POST',
                            url: API_URL + 'admin/logout',
                            data: sendData
                        }).then(function (response) {
                            callback(response);
                        });
                    } else { //if no login token is present or the user is logged out then automatcally send a success object
                        callback({
                            data: {
                                status: 200,
                                statustype: "success",
                                message: "User logout successfully."
                            }
                        })
                    }

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
                        url: API_URL + 'admin/forgotPassword',
                        data: sendData
                    }).then(function (response) {
                        callback(response);
                    });
                };
                
                /*
                 * @Name :- changePassword
                 * @Description :- function for change password
                 */
                obj.changePassword = function (sendData, callback) {                   
                    $http({
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        url: API_URL + 'admin/changePassword',
                        data: sendData
                    }).then(function (response) {
                        callback(response);
                    });
                };
                
                /*
                 * @Name :- savePassword
                 * @Description :- save reset password 
                 */
                obj.savePassword = function (sendData, callback) {                    
                    $http({
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        url: API_URL + 'admin/resetPassword',
                        data: sendData
                    }).then(function (response) {
                        callback(response);
                    });
                };


                /*
                 * @Name :- usersListing
                 * @Description :- Get listing of uses(Employers & Professionals)
                 */
                obj.usersListing = function (sendData, callback) {                    
                    $http({
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        url: API_URL + 'users/listing',
                        data: sendData
                    }).then(function (response) {
                        callback(response);
                    });
                };                              
                
                
                /*
                 * @Name :- deactivateUser
                 * @Description :- Deactivate User
                 */
                obj.actionUser = function (sendData, callback) {                    
                    $http({
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        url: API_URL + 'users/actions',
                        data: sendData
                    }).then(function (response) {
                        callback(response);
                    });
                };               
               
                
                return obj;
            }]);


