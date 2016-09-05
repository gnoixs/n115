angular.module('starter.controllers', ['ionic'])
    .controller('pickCtrl', ['$scope', '$ionicSlideBoxDelegate','getTitle', function ( $scope,$ionicSlideBoxDelegate,getTitle) {                 //选球控制器
        $scope.currentMethod = configData.defaultMethod;              //当前方法 xuanwu.renxuanwuzhongwu.fushi 
        $scope.currentMethodTitle = phoenix.Games.N115.Config.pros.getTitleByName( $scope.currentMethod).join('');      //获取默认标题
        $scope.poptypeshow = false;         //标题箭头方向
        $scope.menuShow = false;            //右侧菜单是否显示
        $scope.historyShow = false;         //显示历史记录
        $scope.awardGroupRetStatus = configData.awardGroupRetStatus;    //奖金返点
        $scope.gameMethodsGroup = configData.gameMethods;    //玩法组
        $scope.choosedType = 4;             //默认类型
     
        $scope.ballTrees = [
          {
             h3:'选区',
             quick:{b:'大',x:'小',q:'全',d:'单',s:'双',c:'清'},
             balls:[1,2,3,4,5,6,7,8,9,10,11]
          }
        ];

        //返回
       $scope.goBack = function(evt){                                          
            console.log('back');
       }

       //玩法栏显示与隐藏
       $scope.changeMethod = function(evt){                                     
             $scope.poptypeshow = !$scope.poptypeshow;
             //$scope.poptypeshow = true
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

       //游戏类型切换
       $scope.slideChange = function(i,gameMethods){ 
          $scope.choosedType = i;
          $ionicSlideBoxDelegate.slide(i);
       }

       //具体游戏切换
        $scope.chooseGame = function(j,_gameType,evt){
          angular.element('.typeSpans').removeClass('active');
          angular.element(evt.target).addClass('active');
          $scope.currentMethod = _gameType.mode+'.'+_gameType.parent+'.'+_gameType.name;
          $scope.currentMethodTitle = phoenix.Games.N115.Config.pros.getTitleByName($scope.currentMethod).join('');
        }

        //滑动
        $scope.slideHasChanged =function($index){
           $scope.choosedType = $index;
        }
        
    }]).factory('getTitle',function(){  
        return{
          say:function(){
            console.log(1);
          }
        }
    })
    .controller('drawCtrl', ['$scope', function ($scope) {
        
       
    }])
    .controller('submitCtrl',  ['$scope', function ($scope) {
       

    }])
    .controller('bodyCtrl', ['$scope', function ($scope) {

        
    }]);



