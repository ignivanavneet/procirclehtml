
var procircle = angular.module("procircle", ["ngAnimate", "ngSanitize", "ui.bootstrap","ui.router", "oc.lazyLoad", "angular-jwt", "ngCookies", "app.constants", "ngMessages", "angularModalService", "socialLogin"]);
procircle.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            debug: false,
            events: false,
            cache: false
        });
    }]);

// configuration for social node module
procircle.config(function (socialProvider) {
    // socialProvider.setGoogleKey("YOUR GOOGLE CLIENT ID");
    socialProvider.setLinkedInKey("81tibv94pboruh");
    socialProvider.setFbKey({appId: "119145348680124", apiVersion: "v2.9"});
});

/*
angular.module("procircle").filter('base64encode', function () {
    return function (input, scope) {
        if (input != undefined) {
            if (input != null && input != '')
                return String(btoa(input));
        }
    }
});*/



