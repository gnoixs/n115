angular.module('starter.controllers', ['ionic'])
    .controller('pickCtrl', ['$scope', function ( $scope) {                 //选球控制器
        $scope.currentMethodTitle = phoenix.Games.N115.Config.pros.getTitleByName(configData.defaultMethod).join('');      //获取默认标题
        $scope.poptypeshow = false;         //标题箭头方向
        $scope.menuShow = false;            //右侧菜单是否显示
        $scope.historyShow = false;         //显示历史记录
        $scope.awardGroupRetStatus = configData.awardGroupRetStatus;    //奖金返点

                                                                                                
        //返回
       $scope.goBack = function(evt){                                          
            console.log('back');
       }

       //玩法栏显示与隐藏
       $scope.changeMethod = function(evt){                                     
             $scope.poptypeshow = !$scope.poptypeshow;
       }
       //右侧小导航显示与隐藏
        $scope.menuShowHander = function(evt){                                
            $scope.menuShow = !$scope.menuShow;
       }
       
       //显示最近10条开奖记录
       $scope.showRecord10 = function(evt){
           $scope.historyShow = !$scope.historyShow;
       }
       //机选
       $scope.getRandom = function(evt){
          console.log('机选');
       }

    }])
    .controller('drawCtrl', ['$scope', function ($scope) {
        
       
    }])
    .controller('submitCtrl',  ['$scope', function ($scope) {
       

    }])
    .controller('bodyCtrl', ['$scope', function ($scope) {

        
    }]);



