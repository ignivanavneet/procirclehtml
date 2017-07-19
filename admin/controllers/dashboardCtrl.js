angular.module("procircle_admin").controller("dashboardCtrl", function ($scope, $cookieStore, $stateParams, $http, $timeout, $state, $rootScope, $window, jwtHelper, ModalService, commonService, userService) {
    $scope.heading = "Dashboard";

    $scope.sort = "1", $scope.skip = 0, $scope.limit = 5, $scope.currentPage = 1, $scope.maxSize = 5
    $scope.organizerListing = function (type) {
        if (type) {
            $scope.skip = 0, $scope.limit = 5, $scope.currentPage = 1, $scope.maxSize = 5
        } else {
            $scope.skip = ($scope.limit * $scope.currentPage) - $scope.limit;
        }
        $scope.request = {
            "user_id": $cookieStore.get('user_id'),
            "auth_token": $cookieStore.get('access_token'),
            "sort": $scope.sort,
            "search": $scope.search,
            "skip": $scope.skip || 0,
            "limit": $scope.limit || 10,
            "data_type": "listing"
        }
        userService.organizerListing($scope.request, function (response) {
            //console.log(response.data);                
            $scope.listing = response.data.data;
            $scope.total_records = response.data.total_record;
            //console.log(response.data.total_record, "=",$scope.total_records);
        })
    };

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
                "user_id": $cookieStore.get('user_id'),
                "auth_token": $cookieStore.get('access_token'),
                "action_user_id": user_id,
                "action_type": 2,
                "data_type": "action"
            }
            if (isConfirm) {
                userService.deactivateUser($scope.request, function (response) {
                    $scope.organizerListing();
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
                "user_id": $cookieStore.get('user_id'),
                "auth_token": $cookieStore.get('access_token'),
                "action_user_id": user_id,
                "action_type": 1,
                "data_type": "action"
            }
            if (isConfirm) {
                userService.activateUser($scope.request, function (response) {
                    $scope.organizerListing();
                })
            }
        });
    }
});