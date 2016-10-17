// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','starter.config','ngCordova','ngResource'])

    .run(function ($ionicPlatform, $rootScope) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }

            var isLoginR = window.localStorage.getItem("lumanmedIsLogin");
            if(isLoginR){
                $rootScope.isLogin = isLoginR;
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider,$cordovaInAppBrowserProvider) {

        //配置$resource post提交的格式
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded, charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded, charset=utf-8';


        //在 iOS中, tabs 一直处于底部. 在android中 ionic tabs 一直在顶部,如果要改我们可以通过配置$ionicConfigProvider
        $ionicConfigProvider.platform.ios.tabs.style('standard');
        $ionicConfigProvider.platform.ios.tabs.position('bottom');
        $ionicConfigProvider.platform.android.tabs.style('standard');
        $ionicConfigProvider.platform.android.tabs.position('standard');

        $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
        $ionicConfigProvider.platform.android.navBar.alignTitle('center');

        $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
        $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

        $ionicConfigProvider.platform.ios.views.transition('ios');
        $ionicConfigProvider.platform.android.views.transition('android');



        var defaultOptions = {
            location: 'no',
            clearcache: 'no',
            toolbar: 'no'
        };

        document.addEventListener("deviceready", function () {

            $cordovaInAppBrowserProvider.setDefaultOptions(options)

        }, false);

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // setup an abstract state for the tabs directive
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })

            // Each tab has its own nav history stack:
              // 首页查看报告
            .state('tab.viewReport', {
                url: '/viewReport',
                views: {
                    'tab-viewReport': {
                        templateUrl: 'templates/tab-viewReport.html',
                        controller: 'viewReportCtrl'
                    }
                }
            })

            .state('tab.imageHandle', {
                url: '/imageHandle',
                views: {
                    'tab-imageHandle': {
                        templateUrl: 'templates/tab-imageHandle.html',
                        controller: 'imageHandleCtrl'
                    }
                }
            })

            .state('tab.personCenter', {
                url: '/personCenter',
                views: {
                    'tab-personCenter': {
                        templateUrl: 'templates/tab-personCenter.html',
                        controller: 'personCenterCtrl'
                    }
                }
            })

            // 设置帮助
            .state('settingHelp', {
                url: '/settingHelp',
                nativeTransitions: { "type": "slide", "direction": "left" },
                templateUrl: 'templates/setting-help.html',
                controller: 'settingHelpCtrl'
            })

            // 修改密码
            .state('modifyPassword', {
                url: '/modifyPassword',
                nativeTransitions: { "type": "slide", "direction": "left" },
                templateUrl: 'templates/modify-password.html',
                controller: 'modifyPasswordCtrl'
            })


            // 登陆
            .state('login', {
                url: '/login',
                nativeTransitions: { "type": "slide", "direction": "left" },
                templateUrl: 'templates/login.html',
                controller: 'loginCtrl'
            })

            // 注册
            .state('register', {
                url: '/register',
                nativeTransitions: { "type": "slide", "direction": "left" },
                templateUrl: 'templates/register.html',
                controller: 'registerCtrl'
            })

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/login');

    });
