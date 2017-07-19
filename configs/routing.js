/* Admin routing file
 * @file: routing.js
 * @description:
 * @author: Sachin Jariyal
 * @date: 07 June 2017
 * */
procircle.config(['$locationProvider', '$httpProvider', function ($locationProvider, $httpProvider) {
        $locationProvider.hashPrefix('');
        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('httpInjector');
    }]);

procircle.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when("", "/");
    $urlRouterProvider.otherwise("404");
    $stateProvider
            .state('main', {
                abstract: true,
                templateUrl: 'views/main.html',
                resolve: {
                    store: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                                files: [
                                    "controllers/headerCtrl.js",
                                    "services/userService.js"
                                ]
                            },
                            {
                                name: 'ngFileUpload',
                                files: [
                                    'node_modules/ng-file-upload/dist/ng-file-upload-shim.min.js',
                                    'node_modules/ng-file-upload/dist/ng-file-upload.min.js'
                                ]
                            },
                        ]);
                    }
                }
            })
            .state('main.index', {
                url: '/',
                authenticate: false,
                views: {
                    'header': {
                        templateUrl: 'views/frontend/elements/header.html',
                        controller: 'headerCtrl'

                    },
                    'content': {
                        templateUrl: 'views/frontend/home/index.html'
                    },
                    'footer': {
                        templateUrl: 'views/frontend/elements/footer.html'
                    }
                },
                data: {
                    pageTitle: 'Procircle'
                },
                resolve: {
                    store: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                                files: [
                                    "services/commonService.js"
                                ]
                            }
                        ]);
                    }
                }
            })
            .state('main.create-professional-profile', {
                url: '/professionals/create-profile',
                authenticate: true,
                views: {
                    'header': {
                        templateUrl: 'views/frontend/elements/header.html',
                        controller: 'headerCtrl'

                    },
                    'content': {
                        templateUrl: 'views/frontend/professional/create-profile.html',
                        controller: 'professionalCtrl'
                    },
                    'footer': {
                        templateUrl: 'views/frontend/elements/footer.html'
                    }
                },
                data: {
                    pageTitle: 'Procircle - Create Profile'
                },
                resolve: {
                    store: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                                files: [
                                    "controllers/professionalCtrl.js",
                                    "services/commonService.js"
                                ]
                            }
                        ]);
                    }
                }
            })
            .state('signup', {
                url: "/signup",
                authenticate: false,
		        not_public: true, 
                parent: "main",
                views: {
                    'header': {
                        templateUrl: 'views/frontend/elements/header.html',
                        controller: 'headerCtrl'
                    },
                    'content': {
                        templateUrl: 'views/frontend/users/signup.html'
                    },
                    'footer': {
                        templateUrl: 'views/frontend/elements/footer.html'
                    }
                },
                data: {
                    pageTitle: 'Procircle : Signup'
                }
            })
            .state('contact-us', {
                url: "/contact-us",
                authenticate: false,
                parent: "main",
                views: {
                    'header': {
                        templateUrl: 'views/frontend/elements/header.html',
                        controller: 'headerCtrl'
                    },
                    'content': {
                        templateUrl: 'views/frontend/users/contact-us.html',
                        controller: 'usersCtrl'
                    },
                    'footer': {
                        templateUrl: 'views/frontend/elements/footer.html'
                    }
                },
                data: {
                    pageTitle: 'Procircle : Contact-us'
                },
                resolve: {
                    store: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                                files: [
                                    "services/commonService.js",
                                    "controllers/usersCtrl.js",
                                ]
                            }
                        ]);
                    }
                }
            })
            .state('term-conditions', {
                url: "/term-conditions",
                authenticate: false,
                parent: "main",
                views: {
                    'header': {
                        templateUrl: 'views/frontend/elements/header.html',
                        controller: 'headerCtrl'
                    },
                    'content': {
                        templateUrl: 'views/frontend/home/term-conditions.html',
                    },
                    'footer': {
                        templateUrl: 'views/frontend/elements/footer.html'
                    }
                },
                data: {
                    pageTitle: 'Procircle : T&C'
                }
            })
            .state('about_us', {
                url: "/about_us",
                authenticate: false,
                parent: "main",
                views: {
                    'header': {
                        templateUrl: 'views/frontend/elements/header.html',
                        controller: 'headerCtrl'
                    },
                    'content': {
                        templateUrl: 'views/frontend/users/about_us.html',
                        controller: "professionalCtrl"
                    },
                    'footer': {
                        templateUrl: 'views/frontend/elements/footer.html'
                    }
                }, resolve: {
                    store: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                                files: [
                                    "controllers/professionalCtrl.js",
                                ]
                            }
                        ]);
                    }
                },
                data: {
                    pageTitle: 'Procircle : About Us'
                }
            })
            .state('faq', {
                url: "/faq",
                authenticate: false,
                parent: "main",
                views: {
                    'header': {
                        templateUrl: 'views/frontend/elements/header.html',
                        controller: 'headerCtrl'
                    },
                    'content': {
                        templateUrl: 'views/frontend/users/faq.html'
                    },
                    'footer': {
                        templateUrl: 'views/frontend/elements/footer.html'
                    }
                },
                data: {
                    pageTitle: 'Procircle : FAQ'
                }
            })
            .state('employer_about_us', {
                url: "/employer_about_us",
                authenticate: false,
                parent: "main",
                views: {
                    'header': {
                        templateUrl: 'views/frontend/elements/header.html',
                        controller: 'headerCtrl'
                    },
                    'content': {
                        templateUrl: 'views/frontend/users/employer_about_us.html'
                    },
                    'footer': {
                        templateUrl: 'views/frontend/elements/footer.html'
                    }
                },
                data: {
                    pageTitle: 'Procircle : Signup'
                }
            })
            .state('professional_about_us', {
                url: "/professional_about_us",
                authenticate: false,
                parent: "main",
                views: {
                    'header': {
                        templateUrl: 'views/frontend/elements/header.html',
                        controller: 'headerCtrl'
                    },
                    'content': {
                        templateUrl: 'views/frontend/professional/professional_about_us.html'
                    },
                    'footer': {
                        templateUrl: 'views/frontend/elements/footer.html'
                    }
                },
                data: {
                    pageTitle: 'Procircle : Signup'
                }
            })
            .state('login', {
                url: "/login/:type/:id/:social_id/:popup",
		        not_public: true,
                params: {
                    id: {squash: true, value: null},
                    type: {squash: true, value: null},
                    social_id: {squash: true, value: null},
                    popup: {squash: true, value: null},
                },
                parent: "main",
                views: {
                    'header': {
                        templateUrl: 'views/frontend/elements/header.html',
                        controller: 'headerCtrl'
                    },
                    'content': {
                        templateUrl: 'views/frontend/users/login.html',
                        controller: 'usersCtrl'
                    },
                    'footer': {
                        templateUrl: 'views/frontend/elements/footer.html'
                    }
                },
                data: {
                    pageTitle: 'Procircle : Log In'
                },
                resolve: {
                    store: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                                files: [
                                    "services/commonService.js",
                                    "controllers/usersCtrl.js",
                                ]
                            }
                        ]);
                    }
                }
            })
            .state('second_signup', {
                url: "/:url/:type/",
                authenticate: false,
		        not_public: true,
                parent: "main",
                views: {
                    'header': {
                        templateUrl: 'views/frontend/elements/header.html',
                        controller: 'headerCtrl'
                    },
                    'content': {
                        templateUrl: 'views/frontend/users/second_signup.html',
                        controller: 'usersCtrl'
                    },
                    'footer': {
                        templateUrl: 'views/frontend/elements/footer.html'
                    }
                },
                data: {
                    pageTitle: 'Procircle : Signup'
                },
                resolve: {// Any property in resolve should return a promise and is executed before the view is loaded
                    store: function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load([{
                                files: [
                                    "controllers/usersCtrl.js",
                                    "directives/passwordMatch.js"
                                ]
                            }
                        ]);
                    }
                }
            })
            .state('activate', {
                url: "/activate/:id/:key",
                authenticate: false,
                parent: "main",
                views: {
                    'header': {
                        templateUrl: 'views/frontend/elements/header.html',
                        controller: 'headerCtrl'
                    },
                    'content': {
                        templateUrl: 'views/frontend/users/activate.html',
                        controller: 'usersCtrl'
                    },
                    'footer': {
                        templateUrl: 'views/frontend/elements/footer.html'
                    }
                },
                data: {
                    pageTitle: 'Procircle : Forgot Password'
                },
                resolve: {// Any property in resolve should return a promise and is executed before the view is loaded
                    store: function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load([{
                                files: [
                                    "controllers/usersCtrl.js"
                                ]
                            }
                        ]);
                    }
                }
            })
            .state('forgot_password', {
                url: "/forgot_password/",
                authenticate: false,
                parent: "main",
                views: {
                    'header': {
                        templateUrl: 'views/frontend/elements/header.html',
                        controller: 'headerCtrl'
                    },
                    'content': {
                        templateUrl: 'views/frontend/users/forgot_password.html',
                        controller: 'usersCtrl'
                    },
                    'footer': {
                        templateUrl: 'views/frontend/elements/footer.html'
                    }
                },
                data: {
                    pageTitle: 'Procircle : Forgot Password'
                },
                resolve: {// Any property in resolve should return a promise and is executed before the view is loaded
                    store: function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load([{
                                files: [
                                    "controllers/usersCtrl.js"
                                ]
                            }
                        ]);
                    }
                }
            })
            .state('reset_password', {
                url: "/reset_password/:id/:token/:time",
                authenticate: false,
                parent: "main",
                views: {
                    'header': {
                        templateUrl: 'views/frontend/elements/header.html',
                        controller: 'headerCtrl'
                    },
                    'content': {
                        templateUrl: 'views/frontend/users/reset_password.html',
                        controller: 'usersCtrl'
                    },
                    'footer': {
                        templateUrl: 'views/frontend/elements/footer.html'
                    }
                },
                data: {
                    pageTitle: 'Procircle : Reset Password'
                },
                resolve: {// Any property in resolve should return a promise and is executed before the view is loaded
                    store: function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load([{
                                files: [
                                    "controllers/usersCtrl.js",
                                    "directives/passwordMatch.js"
                                ]
                            }
                        ]);
                    }
                }
            })
            .state('employers', {
                url: "/employers/",
                authenticate: false,
                parent: "main",
                views: {
                    'header': {
                        templateUrl: 'views/frontend/elements/header.html',
                        controller: 'headerCtrl'
                    },
                    'content': {
                        templateUrl: 'views/frontend/home/employers.html'
                    },
                    'footer': {
                        templateUrl: 'views/frontend/elements/footer.html'
                    }
                },
                data: {
                    pageTitle: 'Procircle : Employers'
                }
            })
            .state('professionals', {
                url: "/professionals/",
                authenticate: false,
                parent: "main",
                views: {
                    'header': {
                        templateUrl: 'views/frontend/elements/header.html',
                        controller: 'headerCtrl'
                    },
                    'content': {
                        templateUrl: 'views/frontend/home/professionals.html'
                    },
                    'footer': {
                        templateUrl: 'views/frontend/elements/footer.html'
                    }
                },
                data: {
                    pageTitle: 'Procircle : Professionals'
                }
            })
            .state('employer_profile', {
                url: "/employer/profile",
                authenticate: true,
                parent: "main",
                views: {
                    'header': {
                        templateUrl: 'views/frontend/elements/header.html',
                        controller: 'headerCtrl'
                    },
                    'content': {
                        templateUrl: function () {
                            return 'views/frontend/users/employer_profile_step1.html'
                        },
                        controller: 'usersCtrl',
                    },
                    'footer': {
                        templateUrl: 'views/frontend/elements/footer.html'
                    }
                },
                data: {
                    pageTitle: 'Procircle : Employer Profile'
                },
                resolve: {
                    store: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                                files: [
                                    "controllers/usersCtrl.js"
                                ]
                            }, {
                                name: "ngAutocomplete",
                                files: [
                                    'js/ngAutocomplete.js'
                                ]
                            }
                        ]);
                    }
                }
            })
            .state('employer_profile_step_two', {
                url: "/employer/profile-step-2/:id/:type",
                authenticate: true,
                parent: "main",
                views: {
                    'header': {
                        templateUrl: 'views/frontend/elements/header.html',
                        controller: 'headerCtrl'
                    },
                    'content': {
                        templateUrl: function () {
                            return 'views/frontend/users/employer_profile_step2.html'
                        },
                        controller: 'usersCtrl',
                    },
                    'footer': {
                        templateUrl: 'views/frontend/elements/footer.html'
                    }
                },
                data: {
                    pageTitle: 'Procircle : Employer Profile'
                },
                resolve: {
                    store: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                                files: [
                                    "controllers/usersCtrl.js"
                                ]
                            }
                        ]);
                    }
                }
            })
	      .state('employer_profile_view', {
                url: "/employer/profile-view",
                authenticate: true,
                parent: "main",
                views: {
                    'header': {
                        templateUrl: 'views/frontend/elements/header.html',
                        controller: 'headerCtrl'
                    },
                    'content': {
                        templateUrl: function () {
                            return 'views/frontend/users/empoyer-profile-view.html'
                        },
                        controller: 'usersCtrl',
                    },
                    'footer': {
                        templateUrl: 'views/frontend/elements/footer.html'
                    }
                },
                data: {
                    pageTitle: 'Procircle : Employer Profile'
                },
                resolve: {
                    store: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                                files: [
                                    "controllers/usersCtrl.js"
                                ]
                            }
                        ]);
                    }
                }
            })
	        .state('employer_profile_edit', {
                url: "/employer/profile-edit",
                authenticate: true,
                parent: "main",
                views: {
                    'header': {
                        templateUrl: 'views/frontend/elements/header.html',
                        controller: 'headerCtrl'
                    },
                    'content': {
                        templateUrl: function () {
                            return 'views/frontend/users/empoyer-profile-edit.html'
                        },
                        controller: 'usersCtrl',
                    },
                    'footer': {
                        templateUrl: 'views/frontend/elements/footer.html'
                    }
                },
                data: {
                    pageTitle: 'Procircle : Employer Profile'
                },
                resolve: {
                    store: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                                files: [
                                    "controllers/usersCtrl.js"
                                ]
                            }
                        ]);
                    }
                }
            }) 
            .state('employer_profile_listing', {
                url: "/employer/profile_listing",
                authenticate: true,
                parent: "main",
                views: {
                    'header': {
                        templateUrl: 'views/frontend/elements/header.html',
                        controller: 'headerCtrl'
                    },
                    'content': {
                        templateUrl: function () {
                            return 'views/frontend/users/employer_profiles_listing.html'
                        },
                        controller: 'usersCtrl',
                    },
                    'footer': {
                        templateUrl: 'views/frontend/elements/footer.html'
                    }
                },
                data: {
                    pageTitle: 'Procircle : Employer Profile`s Listing'
                },
                resolve: {
                    store: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                                files: [
                                    "controllers/usersCtrl.js"
                                ]
                            }
                        ]);
                    }
                }
            })
            .state('employer_personality_type', {
                url: "/employer/personality_type",
                authenticate: true,
                parent: "main",
                views: {
                    'header': {
                        templateUrl: 'views/frontend/elements/header.html',
                        controller: 'headerCtrl'
                    },
                    'content': {
                        templateUrl: function () {
                            return 'views/frontend/users/personality_type.html'
                        },
                        controller: 'usersCtrl',
                    },
                    'footer': {
                        templateUrl: 'views/frontend/elements/footer.html'
                    }
                },
                data: {
                    pageTitle: 'Procircle : Employer`s Personality Type'
                },
                resolve: {
                    store: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                                files: [
                                    "controllers/usersCtrl.js"
                                ]
                            }
                        ]);
                    }
                }
            })
            .state('subscription_info', {
                url: "/subscription/info",
                authenticate: true,
                parent: "main",
                views: {
                    'header': {
                        templateUrl: 'views/frontend/elements/header.html',
                        controller: 'headerCtrl'
                    },
                    'content': {
                        templateUrl: 'views/frontend/users/subscription_info.html',
                        controller: 'usersCtrl'
                    },
                    'footer': {
                        templateUrl: 'views/frontend/elements/footer.html'
                    }
                },
                data: {
                    pageTitle: 'Procircle : Subscription Info'
                },
                resolve: {
                    store: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                                files: [
                                    "controllers/usersCtrl.js"
                                ]
                            }
                        ]);
                    }
                }
            })
            .state('subscription_plans', {
                url: "/subscription/plans/:plan_id",
                authenticate: true,
                parent: "main",
                views: {
                    'header': {
                        templateUrl: 'views/frontend/elements/header.html',
                        controller: 'headerCtrl'
                    },
                    'content': {
                        templateUrl: 'views/frontend/users/subscription_plans.html',
                        controller: 'usersCtrl'
                    },
                    'footer': {
                        templateUrl: 'views/frontend/elements/footer.html'
                    }
                },
                data: {
                    pageTitle: 'Procircle : Subscription Plans'
                },
                resolve: {
                    store: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                                files: [
                                    "controllers/usersCtrl.js"
                                ]
                            }
                        ]);
                    }
                }
            })
            .state('pricing_plans', {
                url: "/pricing_plan",
                authenticate: false,
                parent: "main",
                views: {
                    'header': {
                        templateUrl: 'views/frontend/elements/header.html',
                        controller: 'headerCtrl'
                    },
                    'content': {
                        templateUrl: 'views/frontend/users/subscription_plans.html',
                        controller: 'usersCtrl'
                    },
                    'footer': {
                        templateUrl: 'views/frontend/elements/footer.html'
                    }
                },
                data: {
                    pageTitle: 'Procircle : Subscription Plans'
                },
                resolve: {
                    store: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                                files: [
                                    "controllers/usersCtrl.js"
                                ]
                            }
                        ]);
                    }
                }
            })
            .state('subscription_select', {
                url: "/subscription/selection/:suggested_plan",
                authenticate: true,
                parent: "main",
                views: {
                    'header': {
                        templateUrl: 'views/frontend/elements/header.html',
                        controller: 'headerCtrl'
                    },
                    'content': {
                        templateUrl: 'views/frontend/users/subscription_selection.html',
                        controller: 'usersCtrl'
                    },
                    'footer': {
                        templateUrl: 'views/frontend/elements/footer.html'
                    }
                },
                data: {
                    pageTitle: 'Procircle : Select Subscription'
                },
                resolve: {
                    store: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                                files: [
                                    "controllers/usersCtrl.js"
                                ]
                            }
                        ]);
                    }
                }
            })
            .state('start_professional_personality_test', {
                url: "/professionals/start_personality_test",
                authenticate: true,
                parent: "main",
                views: {
                    'header': {
                        templateUrl: 'views/frontend/elements/header.html',
                        controller: 'headerCtrl'
                    },
                    'content': {
                        templateUrl: function () {
                            return 'views/frontend/professional/start_personality_test.html'
                        },
                        controller: 'professionalCtrl',
                    },
                    'footer': {
                        templateUrl: 'views/frontend/elements/footer.html'
                    }
                },
                data: {
                    pageTitle: 'Procircle : Professional Personality Test'
                },
                resolve: {
                    store: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                                files: [
                                    "controllers/professionalCtrl.js"
                                ]
                            }
                        ]);
                    }
                }
            })
            .state('professional_personality_test', {
                url: "/professionals/personality_test",
                authenticate: true,
                parent: "main",
                views: {
                    'header': {
                        templateUrl: 'views/frontend/elements/header.html',
                        controller: 'headerCtrl'
                    },
                    'content': {
                        templateUrl: function () {
                            return 'views/frontend/professional/personality_test.html'
                        },
                        controller: 'professionalCtrl',
                    },
                    'footer': {
                        templateUrl: 'views/frontend/elements/footer.html'
                    }
                },
                data: {
                    pageTitle: 'Procircle : Professional Personality Test'
                },
                resolve: {
                    store: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                                files: [
                                    "controllers/professionalCtrl.js"
                                ]
                            }
                        ]);
                    }
                }
            })
            .state('professional_personality_test_result', {
                url: "/professionals/personality_test_result",
                authenticate: true,
                parent: "main",
                views: {
                    'header': {
                        templateUrl: 'views/frontend/elements/header.html',
                        controller: 'headerCtrl'
                    },
                    'content': {
                        templateUrl: function () {
                            return 'views/frontend/professional/personality_test_result.html'
                        },
                        controller: 'professionalCtrl',
                    },
                    'footer': {
                        templateUrl: 'views/frontend/elements/footer.html'
                    }
                },
                data: {
                    pageTitle: 'Procircle : Professional Personality Test Result'
                },
                resolve: {
                    store: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                                files: [
                                    "controllers/professionalCtrl.js"
                                ]
                            }
                        ]);
                    }
                }
            })
            .state('get_professional_profile', {
                url: "/professionals/profile",
                authenticate: true,
                parent: "main",
                views: {
                    'header': {
                        templateUrl: 'views/frontend/elements/header.html',
                        controller: 'headerCtrl'
                    },
                    'content': {
                        templateUrl: function () {
                            return 'views/frontend/professional/professional_profile_view.html'
                        },
                        controller: 'professionalCtrl',
                    },
                    'footer': {
                        templateUrl: 'views/frontend/elements/footer.html'
                    }
                },
                data: {
                    pageTitle: 'Procircle : Professional Profile'
                },
                resolve: {
                    store: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                                files: [
                                    "controllers/professionalCtrl.js"
                                ]
                            }
                        ]);
                    }
                }
            })
	        .state('professional_profile_edit', {
                url: "/professionals/profile-edit",
                authenticate: true,
                parent: "main",
                views: {
                    'header': {
                        templateUrl: 'views/frontend/elements/header.html',
                        controller: 'headerCtrl'
                    },
                    'content': {
                        templateUrl: function () {
                            return 'views/frontend/professional/professional-profile-edit.html'
                        },
                        controller: 'professionalCtrl',
                    },
                    'footer': {
                        templateUrl: 'views/frontend/elements/footer.html'
                    }
                },
                data: {
                    pageTitle: 'Procircle : Professional Profile'
                },
                resolve: {
                    store: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                                files: [
                                    "controllers/professionalCtrl.js"
                                ]
                            }
                        ]);
                    }
                }
            })
            .state('start_employee_personality_test', {
                url: "/employee/start_personality_test/:employer_id/:employee_email",
                authenticate: false,
                parent: "main",
                views: {
                    'header': {
                        templateUrl: 'views/frontend/elements/header.html',
                        controller: 'headerCtrl'
                    },
                    'content': {
                        templateUrl: function () {
                            return 'views/frontend/employee/start_personality_test.html'
                        },
                        controller: 'employeeCtrl',
                    },
                    'footer': {
                        templateUrl: 'views/frontend/elements/footer.html'
                    }
                },
                data: {
                    pageTitle: 'Procircle : Employee Personality Test'
                },
                resolve: {
                    store: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                                files: [
                                    "controllers/employeeCtrl.js"
                                ]
                            }
                        ]);
                    }
                }
            })
            .state('employee_personality_test', {
                url: "/employee/personality_test/:employer_id/:employee_email",
                authenticate: false,
                parent: "main",
                views: {
                    'header': {
                        templateUrl: 'views/frontend/elements/header.html',
                        controller: 'headerCtrl'
                    },
                    'content': {
                        templateUrl: function () {
                            return 'views/frontend/employee/personality_test.html'
                        },
                        controller: 'employeeCtrl',
                    },
                    'footer': {
                        templateUrl: 'views/frontend/elements/footer.html'
                    }
                },
                data: {
                    pageTitle: 'Procircle : Employee Personality Test'
                },
                resolve: {
                    store: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                                files: [
                                    "controllers/employeeCtrl.js"
                                ]
                            }
                        ]);
                    }
                }
            })
            .state('employee_personality_test_result', {
                url: "/employee/personality_test_result/:employer_id/:employee_email",
                authenticate: false,
                parent: "main",
                views: {
                    'header': {
                        templateUrl: 'views/frontend/elements/header.html',
                        controller: 'headerCtrl'
                    },
                    'content': {
                        templateUrl: function () {
                            return 'views/frontend/employee/personality_test_result.html'
                        },
                        controller: 'employeeCtrl',
                    },
                    'footer': {
                        templateUrl: 'views/frontend/elements/footer.html'
                    }
                },
                data: {
                    pageTitle: 'Procircle : Employee Personality Test Result'
                },
                resolve: {
                    store: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                                files: [
                                    "controllers/employeeCtrl.js"
                                ]
                            }
                        ]);
                    }
                }
            })
            .state('404', {
                url: "/404",
                authenticate: false,
                parent: "main",
                views: {
                    'header': {
                        templateUrl: 'views/frontend/elements/header.html',
                        controller: 'headerCtrl'
                    },
                    'content': {
                        templateUrl: 'views/frontend/elements/404.html'
                    },
                    'footer': {
                        templateUrl: 'views/frontend/elements/footer.html'
                    }
                },
                data: {
                    pageTitle: 'Procircle : 404 Not Found'
                }
            })
            .state('employer_profile_step_three', {
                url: "/employer/profile-step-3/:id",
                authenticate: true,
                parent: "main",
                views: {
                    'header': {
                        templateUrl: 'views/frontend/elements/header.html',
                        controller: 'headerCtrl'
                    },
                    'content': {
                        templateUrl: function () {
                            return 'views/frontend/users/employer_profile_step3.html'
                        },
                        controller: 'usersCtrl',
                    },
                    'footer': {
                        templateUrl: 'views/frontend/elements/footer.html'
                    }
                },
                data: {
                    pageTitle: 'Procircle : Employer Profile'
                },
                resolve: {
                    store: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                                files: [
                                    "controllers/usersCtrl.js"
                                ]
                            }
                        ]);
                    }
                }
            })
            .state('pay_payment', {
                url: "/subscription/payment/:plan_id/:interval",
                authenticate: true,
                parent: "main",
                views: {
                    'header': {
                        templateUrl: 'views/frontend/elements/header.html',
                        controller: 'headerCtrl'
                    },
                    'content': {
                        templateUrl: 'views/frontend/users/pay_payment.html',
                        controller: 'usersCtrl'
                    },
                    'footer': {
                        templateUrl: 'views/frontend/elements/footer.html'
                    }
                },
                data: {
                    pageTitle: 'Procircle : Payment'
                },
                resolve: {
                    store: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([{
                                files: [
                                    "controllers/usersCtrl.js"
                                ]
                            }
                        ]);
                    }
                }
            })
	       .state('professional-search', {
                url: "/professionals/search",
                authenticate: true,
                parent: "main",
                views: {
                    'header': {
                        templateUrl: 'views/frontend/elements/header.html',
                        controller: 'headerCtrl'
                    },
                    'content': {
                        templateUrl: 'views/frontend/professional/search.html'
                    },
                    'footer': {
                        templateUrl: 'views/frontend/elements/footer.html'
                    }
                },
                data: {
                    pageTitle: 'Procircle : Search'
                }
            })

});


procircle.run(function ($rootScope, $stateParams,$window, $location, $state, $cookieStore) {
    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, from, fromParams) {
        $window.scrollTo(0, 0);
        var token = $cookieStore.get('X-Token');
        var loginUserCookie = $cookieStore.get('user_data');
        $rootScope.globalTitle = toState.data.pageTitle;
        var url = $location.path();

        if (loginUserCookie != undefined) {
            $rootScope.isLoggedIn = true;
            $rootScope.role_id = loginUserCookie.role_id;
            $rootScope.profile_image = loginUserCookie.profile_image;
			$rootScope.step_completed = parseInt(loginUserCookie.steps_completed);
        } else {
            $rootScope.isLoggedIn = false;
            $rootScope.role_id = undefined;
        }		
		//Redirect to dashboard if already loggedin
        if (!toState.authenticate && token && toState.not_public) {
			$state.transitionTo("main.index");
            event.preventDefault();
        }
		
        //If Not loggedin then redirect to login
        if (toState.authenticate && !token) {
            $state.transitionTo("login");
            event.preventDefault();
        }
    });
	
	
	 $rootScope.$on("$statechangesuccess", function (event, toState, toParams, fromState, from, fromParams) {
	       var token = $cookieStore.get('X-Token');
	       if(token){
			  console.log($state.current.name);
			  
			 }
	 });
	
	
});



