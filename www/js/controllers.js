angular.module('starter.controllers', [])

    .controller('exchangeCenterCtrl', function ($scope, Chats) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.chats = Chats.all();
        $scope.remove = function (chat) {
            Chats.remove(chat);
        };
    })

    //查看报告controller
    .controller('viewReportCtrl', function ($scope, $cordovaInAppBrowser, $cordovaToast) {

        $scope.showReport = function (url) {
            console.log(url);

            var target = "_self";

            var options = {
                location: 'no',
                clearcache: 'yes',
                toolbar: 'yes',
                enableViewportScale:'yes'
            };

            $cordovaInAppBrowser.open(url, '_system', options)
                .then(function (event) {
                    // success
                    $cordovaToast.show('success', 'short', 'center');
                })
                .catch(function (event) {
                    // error
                    $cordovaToast.show('error', 'short', 'center');
                });

        }

    })


    //医生图像处理controller
    .controller('imageHandleCtrl', function ($scope) {

    })


    //个人中心controller
    .controller('personCenterCtrl', function ($scope,$rootScope) {
        var account = {};
        if($rootScope.isLogin){
            if(window.localStorage.getItem("user_lumanmed")){
                account = JSON.parse(window.localStorage.getItem("user_lumanmed"));
            }

            $scope.user = {
                name:'',
                age:'',
                sex:'',
                phoneNum:'',
                idNum:'',
                userType:'',
                activeDegree:'',
                medicalHospital:''
            }

            $scope.user.name = account.name;
            $scope.user.age = account.age;
            $scope.user.sex = account.sex=='0'?'男':(account.sex=='1'?'女':'其他');
            $scope.user.phoneNum = account.phoneNum;
            $scope.user.idNum = account.idNum;
            $scope.user.userType = account.userType;
            $scope.user.activeDegree = account.activeDegree;
            $scope.user.medicalHospital = account.medicalHospital;
        }
    })

    //设置帮助controller
    .controller('settingHelpCtrl', function ($scope) {

    })

    //修改密码controller
    .controller('modifyPasswordCtrl', function ($scope,ENV,$cordovaToast,modifyPasswordService) {
        $scope.modifyPassword = function(user){
            if(user.oldPassword=="" || user.oldPassword==null){
                $cordovaToast.show("请输入原密码！", 'short', 'center');
                return false;
            }
            if(user.newPassword1=="" || user.newPassword1==null){
                $cordovaToast.show("新密码不能为空！", 'short', 'center');
                return false;
            }
            if(user.newPassword1 != user.newPassword2){
                $cordovaToast.show("两次输入的密码不一致！", 'short', 'center');
                return false;
            }
            modifyPasswordService.modifyPassword(user).then(function(r) {
                if (r.status == 1) {//成功
                    $("#modifyPassword_modify").attr("disabled", "disabled");
                    $cordovaToast.show(r.msg, 'short', 'center');
                } else {//失败
                    $cordovaToast.show(r.msg, 'short', 'center');
                }
            });
        }
    })

    .controller('loginCtrl', function ($scope, $state, $rootScope, loginService, $ionicLoading, $cordovaToast) {
        $scope.user = {
            idNum: '',
            pwd: ''
        }
        $scope.login = function (user) {
            console.log(user);

            //调用插件loading...
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: false,

                maxWidth: 200,
                showDelay: 0
            });

            //调用service登陆方法
            loginService.login($scope.user);

            //接收到service的处理完成消息开始执行下一步
            $scope.$on('loginFinish', function () {
                $ionicLoading.hide();
                var loginInfo = loginService.getLoginInfo();
                if (loginInfo.status == '1') {
                    //登陆成功，设置本地localstorage值，并跳转
                    window.localStorage.lumanmedIsLogin = true;
                    $rootScope.isLogin = true;

                    var obj = {
                        'id': loginInfo.user.id,
                        'name': loginInfo.user.name,
                        'age': loginInfo.user.age,
                        'phoneNum': loginInfo.user.phoneNum,
                        'idNum': loginInfo.user.idNum,
                        'age': loginInfo.user.age,
                        'sex': loginInfo.user.sex,
                        'userType': loginInfo.user.userType,
                        'activeDegree': loginInfo.user.activeDegree
                    };

                    obj = JSON.stringify(obj);
                    window.localStorage.setItem('user_lumanmed', obj);

                    //登陆成功，跳转到查看报告
                    $state.go('tab.viewReport');
                } else {
                    window.localStorage.lumanmedIsLogin = false;
                    $cordovaToast.show(loginInfo.message, 'short', 'center')
                        .then(function (success) {
                            console.log(loginInfo.message);
                        }, function (error) {
                            console.log(error);
                        });
                }
            });

        }
    })

    .controller('registerCtrl', function ($scope, $state, $ionicActionSheet, registerService, $cordovaToast, $ionicLoading, $ionicHistory) {

        $scope.user = {
            name: '',
            age: '',
            sex: '',
            idNum: '',
            phoneNum: '',
            pwd: '',
            userType: '',

            medicalHospital: '',

            duTitle: '',
            jobNumber: '',
            zgNumber: '',
            zyNumber: ''
        }

        $scope.showUserSex = function () {
            $ionicActionSheet.show({
                buttons: [
                    {text: '男'},
                    {text: '女'},
                    {text: '其他'}
                ],
                titleText: '',
                cancelText: '返回',
                buttonClicked: function (index) {
                    if (index == '0') {
                        $scope.user.sex = '0';
                    }
                    if (index == '1') {
                        $scope.user.sex = '1';
                    }
                    if (index == '2') {
                        $scope.user.sex = '2';
                    }
                    return true;
                }
            });
        }


        $scope.showUserType = function () {
            $ionicActionSheet.show({
                buttons: [
                    { text: '病人 ' },
                    { text: '医生' }
                ],
                titleText: '',
                cancelText: '返回',
                buttonClicked: function (index) {
                    if (index == '0') {
                        $scope.user.userType = "0";
                    }
                    if (index == '1') {
                        $scope.user.userType = "1";
                    }
                    return true;
                }
            });
        }

        $scope.userRegister = function (user) {
            console.log($scope.user);

            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: false,

                maxWidth: 200,
                showDelay: 0
            });
            if(validateRegisterInfo(user)!=null){//表示校验不通过
                console.log(validateRegisterInfo(user));
                $cordovaToast.show(validateRegisterInfo(user), 'short', 'center')
                    .then(function (success) {
                        console.log(validateRegisterInfo(user));
                    }, function (error) {
                        console.log(error);
                    });
                return false;
            }
            registerService.register($scope.user).then(function (r) {
                $ionicLoading.hide();
                var registerInfo = registerService.getRegisterInfo();
                if (registerInfo.status == '1') {//注册成功
                    $cordovaToast.show(registerInfo.message, 'short', 'center')
                        .then(function (success) {
                            console.log(registerInfo.message);
                        }, function (error) {
                            console.log(error);
                        });
                    $ionicHistory.goBack();
                }else{
                    $cordovaToast.show(registerInfo.message, 'short', 'center')
                        .then(function (success) {
                            console.log(registerInfo.message);
                        }, function (error) {
                            console.log(error);
                        });
                }

            });

        }

        //app端校验信息是否完整
        function validateRegisterInfo(user){
             if(user.name ==null || user.name==""){
                 return "请填写姓名！";
             }
            if(user.idNum ==null || user.idNum==""){
                return "请填写身份证号！";
            }
            if(user.pwd ==null || user.pwd==""){
                return "请填写密码！";
            }
            if(user.pwd != user.pwdRepeat){
                return "两次密码不一致！";
            }
            if(user.userType ==null || user.userType==""){
                return "请填写用户类型！";
            }
            if(user.userType == "0" && (user.medicalHospital ==null || user.medicalHospital=="")){
                return "请填写就诊医院！";
            }
            return null;
        }
    });
