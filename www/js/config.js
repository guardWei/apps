/**
 * Created by zhangww 2016年8月3日18:21:00
 */
var config = angular.module("starter.config",[]);
config.constant("ENV",{
  'debug':false,
  'serverUrl':'http://139.196.149.33/lumanmedApp/',
  //'serverUrl':'http://localhost:8080/lumanmedApp/',
  'backUrl':'http://www.lumanmed.cn/',

  'version':'1.01',
  'pageLine':5
});

