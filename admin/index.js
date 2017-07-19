/*
 * @file: index.js
 * @description :
 * @author: Manish Kumar
 * @date: 09-05-2017
 * */


// declaring the main app variable
var procircle_admin = angular.module("procircle_admin", ["ui.router", "oc.lazyLoad", 'ui.bootstrap', 'angularModalService', "app.constants", "ngCookies", "angular-jwt", 'ngAnimate', 'ngMessages','toastr','ngFileUpload']);

procircle_admin.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            debug : true,
            events : true,
            cache : false
        });
    }]);


procircle_admin.run(function ($rootScope, $stateParams, $location, $state, $cookieStore) {
    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
        var token = $cookieStore.get('token');
        //Redirect to dashboard if already loggedin
        if(!toState.authenticate  && token) {
            $state.transitionTo("changepassword");
            event.preventDefault();
        }
        //If Not loggedin then redirect to login
        if(toState.authenticate  && !token) {
            $state.transitionTo("/");
            event.preventDefault();
        }
    });
});


