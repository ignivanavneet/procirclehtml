/**
 * file : userService.js
 * description : 
 * author: 
 * date: 
 */

'use strict';
angular.module("procircle").factory('commonService',
        ['$http', '$q', '$cookieStore', '$rootScope', '$timeout', 'API_URL',
            function ($http, $q, $cookieStore, $rootScope, $timeout, API_URL) {
                var obj = {};
                var deferred = $q.defer();
                /*
                 * @Name :- error popup  
                 * @Description :- function that open error popup
                 */
                obj.errorPopup = function () {
                    swal("Oops...", "Server error try after some time!", "error");
                };

                /*
                 * @Name :- Custom message popup
                 * @Description :- Function that used for Response error and success messages
                 */
                obj.showMessage = function (data) {
                    swal(data);
                };

                /*
                 * @Name :- login popup  
                 * @Description :- function that open error popup
                 */
                obj.loadingPopup = function () {
                    swal({title: "Loading! ", text: "<div class=\"progress\"><div class=\"progress-bar progress-bar-striped progress-bar-animated active\" role=\"progressbar\" aria-valuenow=\"75\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 100%\"></div></div>", html: true, showConfirmButton: false});
                };

                /*
                 * @Name :-  popup close  
                 * @Description :- function that open error popup
                 */
                obj.closePopup = function () {
                    swal.close()
                };

                obj.logout = function (callback) {
                    var u_data = $cookieStore.get('access_token');
                    if (u_data != undefined) {
                        $http({
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            method: 'PUT',
                            url: API_URL + 'user/logout',
                            data: {}
                        }).then(function (response) {
                            callback(response);
                        });
                    } else { //if no login token is present or the user is logged out then automatcally send a success object
                        callback({
                            data: {
                                statusCode: 200,
                                status: "success",
                                message: "User logout successfully."
                            }
                        })
                    }
                };
                obj.arrayObjectToSting = function (data) {
                    var out = [];
                    for (var key in data) {
                        out.push(key + '=' + encodeURIComponent(data[key]));
                    }
                    return out.join('&');
                };

                /*
                 * @Name :-  projects
                 * @Description :- function that get all projects list for header
                 */
                obj.projects = function (callback) {
                    var req = {
                        method: 'GET',
                        url: API_URL + 'projects/fetch_projects_only_name',
                    };
                    $http(req).then(function successCallback(response) {
                        callback(response);

                    }, function errorCallback(response) {
                        callback(response);
                    });
                }

                /*
                 * @Name :-  phase based on project id
                 * @Description :- function that get phase of project based on id
                 */
                obj.phases = function (data, callback) {
                    var req = {
                        method: 'GET',
                        url: API_URL + 'projects/fetch_phases_of_project?project_id=' + data.id,
                    };
                    $http(req).then(function successCallback(response) {
                        callback(response);
                    }, function errorCallback(response) {
                        callback(response);
                    });
                }
                
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
                
                return obj;

            }]);

