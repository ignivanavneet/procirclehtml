/**
 * @file: usersCtrl.js
 * @author: Sachin Jariyal
 * @description: This Js Controller is used for all the functioning related to users.
 * */

angular.module('procircle').controller("headerCtrl", function ($scope, $cookieStore, $stateParams, $http, $timeout, $state, $rootScope, $window, userService) {
    
   /* Logout function */
    $scope.logout = function(){
        userService.clearCredentials(); 
        $state.transitionTo("login");
    }
    
});