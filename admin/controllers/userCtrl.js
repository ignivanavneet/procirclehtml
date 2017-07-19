angular.module("procircle_admin").controller("userCtrl", function ($scope, $cookieStore, $stateParams, $http, $timeout, $state, $rootScope, $window, jwtHelper, ModalService, commonService, userService) {
    $scope.heading = "User's Listing";

    /*
     * @name:employersListing
     * @description: Function for employers listing
     */
    $scope.sort = "1", $scope.skip = 0, $scope.limit = 5, $scope.currentPage = 1, $scope.maxSize = 5
    $scope.employersListing = function (type) {               
        if (type) {
            $scope.skip = 0, $scope.limit = 5, $scope.currentPage = 1, $scope.maxSize = 5
        } else {
            $scope.skip = ($scope.limit * $scope.currentPage) - $scope.limit;
        }
        $scope.request = {
            "role_id": 2,            
            "sort": $scope.sort,
            "search": $scope.search,
            "skip": $scope.skip || 0,
            "limit": $scope.limit || 10,
            "data_type": 1
        }
        
        userService.usersListing($scope.request, function (response) {    
            if (response.data.status == 200) {
                $scope.listing = response.data.data;
                $scope.total_records = response.data.total_record;
            } else{
                $cookieStore.remove('token');
                $cookieStore.remove('user_data');
                $state.go('/');
            }
        })
    };
    
    /*
     * @name:professionalsListing
     * @description: Function for professionals listing
     */
    //$scope.sort = "1", $scope.skip = 0, $scope.limit = 5, $scope.currentPage = 1, $scope.maxSize = 5
    $scope.professionalsListing = function (type) {          
        if (type) {
            $scope.skip = 0, $scope.limit = 5, $scope.currentPage = 1, $scope.maxSize = 5
        } else {
            $scope.skip = ($scope.limit * $scope.currentPage) - $scope.limit;
        }
        $scope.request = {
            "role_id": 3,            
            "sort": $scope.sort,
            "search": $scope.search,
            "skip": $scope.skip || 0,
            "limit": $scope.limit || 10,
            "data_type": 1
        }
        
        userService.usersListing($scope.request, function (response) {  
            if (response.data.status == 200) {
                $scope.listing = response.data.data;
            $scope.total_records = response.data.total_record;
            } else{
                $cookieStore.remove('token');
                $cookieStore.remove('user_data');
                $state.go('/');
            }            
        })
    };
    
    /*Function for set data in model*/
    $scope.setData = function (data) {        
        $scope.selected_data = data;
    }

    /*
     *Function for deactivate the user 
     */
    $scope.deactivateUser = function (user_id) {
        swal({
            title: "Are you sure?",
            text: " You want to deactivate user.",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes",
            closeOnConfirm: true,
            html: false
        }, function (isConfirm) {
            $scope.request = {
                "user_id": user_id,
                "action_type": 0,
                "data_type": 1
            }
            if (isConfirm) {
                userService.actionUser($scope.request, function (response) {
                    if (response.data.status == 200) {
                        for (var a in $scope.listing) {
                            if (user_id == $scope.listing[a].user_id) {
                                if ($scope.listing[a].user_status == 1) {
                                    $scope.listing[a].user_status = 0
                                } else if ($scope.listing[a].user_status == 0) {
                                    $scope.listing[a].user_status = 1
                                }
                            }
                        }
                    }
                })
            }
        });
    }

    /*
     *Function for activate the user
     */
    $scope.activateUser = function (user_id) {
        swal({
            title: "Are you sure?",
            text: " You want to activate user.",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes",
            closeOnConfirm: true,
            html: false
        }, function (isConfirm) {
            $scope.request = {
                "user_id": user_id,
                "action_type": 1,
                "data_type": 1
            }
            if (isConfirm) {
                userService.actionUser($scope.request, function (response) {
                    if (response.data.status == 200) {
                        for (var a in $scope.listing) {
                            if (user_id == $scope.listing[a].user_id) {
                                if ($scope.listing[a].user_status == 1) {
                                    $scope.listing[a].user_status = 0
                                } else if ($scope.listing[a].user_status == 0) {
                                    $scope.listing[a].user_status = 1
                                }
                            }
                        }
                    }
                })
            }
        });
    }
    
    /*
     *Function for deactivate the user 
     */
    $scope.unverifyUser = function (user_id) {
        swal({
            title: "Are you sure?",
            text: " You want to unverify user's profile.",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes",
            closeOnConfirm: true,
            html: false
        }, function (isConfirm) {
            $scope.request = {
                "user_id": user_id,
                "action_type": 0,
                "data_type": 2
            }
            if (isConfirm) {
                commonService.loadingPopup();
                userService.actionUser($scope.request, function (response) {
                    if (response.data.status == 200) {
                        for (var a in $scope.listing) {
                            if (user_id == $scope.listing[a].user_id) {
                                if ($scope.listing[a].profile_status == 1) {
                                    $scope.listing[a].profile_status = 0
                                } else if ($scope.listing[a].profile_status == 0) {
                                    $scope.listing[a].profile_status = 1
                                }
                            }
                        }
                    }
                })
            }
        });
    }

    /*
     *Function for activate the user
     */
    $scope.verifyUser = function (user_id) {
        swal({
            title: "Are you sure?",
            text: " You want to verfiy user's profile.",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes",
            closeOnConfirm: true,
            html: false
        }, function (isConfirm) {
            $scope.request = {
                "user_id": user_id,
                "action_type": 1,
                "data_type": 2
            }
            if (isConfirm) {
                commonService.loadingPopup();
                userService.actionUser($scope.request, function (response) {
                    if (response.data.status == 200) {
                        for (var a in $scope.listing) {
                            if (user_id == $scope.listing[a].user_id) {
                                if ($scope.listing[a].profile_status == 1) {
                                    $scope.listing[a].profile_status = 0
                                } else if ($scope.listing[a].profile_status == 0) {
                                    $scope.listing[a].profile_status = 1
                                }
                            }
                        }
                    }
                })
            }
        });
    }
    
    
});