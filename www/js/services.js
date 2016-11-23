angular.module('starter.services', [])

    //登陆service
    .factory('loginService', function ($resource, ENV, $rootScope) {
        var loginInfo = {};
        var loginUrl = ENV.serverUrl + "login/loginIn";


        var resourceLogin = $resource(loginUrl, {idNum: '@idNum', pwd: '@pwd'}, {goLogin: {method: 'post', timeout: 3000}});

        return {
            login: function (user) {
                var idNum = user.idNum;
                var pwd = user.pwd;

                resourceLogin.goLogin({idNum: idNum, pwd: pwd}, function (r) {
                    loginInfo = {
                        'status': r.status,
                        'message': r.msg,
                        'user': r.data
                    };

                    $rootScope.$broadcast('loginFinish');

                }, function (error) {
                    console.log('网络异常，请稍后再试');
                    loginInfo = {
                        'status': '-1',
                        'message': '网络异常，请稍后再试'
                    };

                    $rootScope.$broadcast('loginFinish');
                });
            },
            getLoginInfo: function () {
                return loginInfo;
            }
        }

    })
    //注册service
    .factory('registerService', function ($resource, ENV, $q) {
        var registerInfo = {};
        var registerUrl = ENV.serverUrl + "register/goRegister";

        var resourceRegister = $resource(registerUrl,{registerStr:'@registerStr'},{goRegister:{method:'post',timeout:3000}});

        return {
            register: function (user) {
                var deferred = $q.defer();

                resourceRegister.goRegister({registerStr:encodeURI(JSON.stringify(user))},function(r){
                    registerInfo = {
                        'status': r.status,
                        'message': r.msg
                    }
                    deferred.resolve(r);
                },function(error){
                    registerInfo = {
                        'status': '-1',
                        'message': '网络异常，请稍后再试'
                    }
                    deferred.reject(error);
                });

                return deferred.promise;
            },
            getRegisterInfo:function(){
                return registerInfo;
            }
        }

    })
    .factory('viewReportService',function($resource,ENV,$q){
        var reportInfo = {};
        var getReportUrl = ENV.serverUrl + "/report/getReportByPatientId";

        var resourceGetReport = $resource(getReportUrl,{patientId:'@reportStr'},{goGetReport:{method:'post',timeout:3000}});

        return {
            getReport: function (patientId) {
                var deferred = $q.defer();

                resourceGetReport.goGetReport({reportStr:patientId},function(r){
                    reportInfo = {
                        'status': r.status,
                        'message': r.msg,
                        data: r.data
                    }
                    deferred.resolve(r);
                },function(error){
                    reportInfo = {
                        'status': '-1',
                        'message': '网络异常，请稍后再试'
                    }
                    deferred.reject(error);
                });

                return deferred.promise;
            },
            getReportInfo:function(){
                return reportInfo;
            }
        }
    })

    .factory('modifyPasswordService',function($resource,ENV,$q){
        var modifyPasswordUrl = ENV.serverUrl + "user/changePassword";

        var resourceModifyPassword = $resource(modifyPasswordUrl);

        return{
            modifyPassword:function(u){
                var user = JSON.parse(window.localStorage.getItem("user_lumanmed"));
                var deferred = $q.defer();

                resourceModifyPassword.get({id:user.id, pwd: u.oldPassword, newPwd: u.newPassword1},function(r){
                    deferred.resolve(r);
                },function(err){
                    deferred.reject(err);
                })
                return deferred.promise;
            }
        }
    })

    .factory('Chats', function () {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var chats = [
            {
                id: 0,
                name: 'Ben Sparrow',
                lastText: 'You on your way?',
                face: 'img/ben.png'
            },
            {
                id: 1,
                name: 'Max Lynx',
                lastText: 'Hey, it\'s me',
                face: 'img/max.png'
            },
            {
                id: 2,
                name: 'Adam Bradleyson',
                lastText: 'I should buy a boat',
                face: 'img/adam.jpg'
            },
            {
                id: 3,
                name: 'Perry Governor',
                lastText: 'Look at my mukluks!',
                face: 'img/perry.png'
            },
            {
                id: 4,
                name: 'Mike Harrington',
                lastText: 'This is wicked good ice cream.',
                face: 'img/mike.png'
            }
        ];

        return {
            all: function () {
                return chats;
            },
            remove: function (chat) {
                chats.splice(chats.indexOf(chat), 1);
            },
            get: function (chatId) {
                for (var i = 0; i < chats.length; i++) {
                    if (chats[i].id === parseInt(chatId)) {
                        return chats[i];
                    }
                }
                return null;
            }
        };
    });
