/* Admin routing file
 * @file: routing.js
 * @description:
 * @author: Manish Kumar
 * @date: 09-05-2017
 * */


procircle_admin.config(['$locationProvider', '$httpProvider', function ($locationProvider, $httpProvider) {
        $locationProvider.hashPrefix('');
        $httpProvider.interceptors.push('httpInjector');
        // $locationProvider.html5Mode(true);

    }]);

procircle_admin.config(function ($stateProvider, $urlRouterProvider) {
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.when("/", "/login");
    $urlRouterProvider.when("", "/login");
    $urlRouterProvider.otherwise("404");
    $stateProvider
            .state('/', {
                url: "/login",
                templateUrl: "admin/views/admin/login/login.html",
                controller: "loginCtrl",
                authenticate: false,
                resolve: {// Any property in resolve should return a promise and is executed before the view is loaded
                    store: function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load([{
                                //name: "login",
                                files: [
                                    "admin/controllers/loginCtrl.js",
                                    "admin/services/userService.js"
                                ]
                            }
                        ]);
                    }
                }
            })
            .state('resetpassword', {
                url: "/resetpassword/:user_id/:token/:time",
                templateUrl: "admin/views/admin/login/resetpassword.html",
                controller: "loginCtrl",
                authenticate: false,
                resolve: {// Any property in resolve should return a promise and is executed before the view is loaded
                    store: function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load([{
                                name: "login",
                                files: [
                                    "admin/controllers/loginCtrl.js",
                                    "admin/services/userService.js",
                                    "admin/directives/passwordMatch.js"
                                ]
                            }
                        ]);
                    }
                }
            })
            
            //For Load Main file to enter in dashboard
            .state('main', {
                abstract: true,
                templateUrl: 'admin/views/admin/main.html',
                controller: "commonCtrl",
                resolve: {// Any property in resolve should return a promise and is executed before the view is loaded
                    store: function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load([{
                                files: [                                   
                                    "admin/services/httpInterceptor.js",
                                    "admin/controllers/commonCtrl.js",
                                    "admin/services/userService.js",
                                    ]}
                        ]);
                    }
                }
            })
            
            //child state of main for load dashboard
            .state('dashboard', {
                url:'/dashboard',
                parent:'main',
                views:{
                    'sidebar':{
                        templateUrl: 'admin/views/admin/sidebar.html'
                    },
                    'content':{
                        templateUrl: 'admin/views/admin/dashboard/dashboard.html',
                        controller: 'dashboardCtrl'
                    }
                },
                //authenticate: true,
                resolve:{
                    store: function($ocLazyLoad){
                        return $ocLazyLoad.load([{
                                name:'dashboard',
                                files:[
                                    "admin/controllers/dashboardCtrl.js",
                                    "admin/controllers/loginCtrl.js",
                                    "admin/services/userService.js",
                                    "admin/assets/js/vendor.js",
                                    "admin/assets/js/app.js"
                                ]
                        }])
                    }
                }
            })
            
            //child state of main for load employers listing
            .state('employers', {
                url:'/employers',
                parent:'main',
                views:{
                    'sidebar':{
                        templateUrl: 'admin/views/admin/sidebar.html'
                    },
                    'content':{
                        templateUrl: 'admin/views/admin/employer/employer.html',
                        controller: 'userCtrl'
                    }
                },
                authenticate: true,
                resolve:{
                    store: function($ocLazyLoad){
                        return $ocLazyLoad.load([{
                                name:'event',
                                files:[
                                    "admin/controllers/userCtrl.js",
                                    "admin/controllers/loginCtrl.js",
                                    "admin/services/userService.js",
                                    "admin/assets/js/vendor.js",
                                    "admin/assets/js/app.js"
                                ]
                        }])
                    }
                }
            })
            
            //child state of main for load employers listing
            .state('professionals', {
                url:'/professionals',
                parent:'main',
                views:{
                    'sidebar':{
                        templateUrl: 'admin/views/admin/sidebar.html'
                    },
                    'content':{
                        templateUrl: 'admin/views/admin/professional/professional.html',
                        controller: 'userCtrl'
                    }
                },
                authenticate: true,
                resolve:{
                    store: function($ocLazyLoad){
                        return $ocLazyLoad.load([{
                                name:'event',
                                files:[
                                    "admin/controllers/userCtrl.js",
                                    "admin/controllers/loginCtrl.js",
                                    "admin/services/userService.js",
                                    "admin/assets/js/vendor.js",
                                    "admin/assets/js/app.js"
                                ]
                        }])
                    }
                }
            })
           
            //child state of main for change password
            .state('changepassword', {
                url:'/changepassword',
                parent:'main',
                views:{
                    'sidebar':{
                        templateUrl: 'admin/views/admin/sidebar.html'
                    },
                    'content':{
                        templateUrl: 'admin/views/admin/login/changepassword.html',
                        controller: 'loginCtrl'
                    }
                },
                authenticate: true,
                resolve:{
                    store: function($ocLazyLoad){
                        return $ocLazyLoad.load([{
                                name:'changepassword',
                                files:[
                                    "admin/controllers/loginCtrl.js",
                                    "admin/services/userService.js",
                                    "admin/assets/js/vendor.js",
                                    "admin/assets/js/app.js",
                                    "admin/directives/passwordMatch.js"
                                ]
                        }])
                    }
                }
            })

            .state('404', {
                url: "/404",
                templateUrl: "views/404.html",
                controller: "404Ctrl",
                resolve: {// Any property in resolve should return a promise and is executed before the view is loaded
                    store: function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load({
                            // serie: true,
                            name: "404",
                            files: [
                                "controllers/404Ctrl.js", //controller function of the view
                            ]
                        });
                    }
                }
            })

});





